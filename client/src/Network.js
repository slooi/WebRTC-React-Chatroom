console.log('loaded Network.js')


export default class Network{
    constructor(){
        this.connections = {}
        this.ws
        this.localId
        this.peerList  // A list of peer ids to connect to given by server and updated
        this.setup()
        this.handleOpen
        this.handleMessage
        this.handleClose
    }
    setupCallbacks(onOpen,onMessage,onClose){
        this.handleOpen = onOpen
        this.handleMessage = onMessage
        this.handleClose = onClose
    }
    setup(){
        // Setup websocket
        // this.ws = new WebSocket(location.origin.replace(/^http/,'ws'))
        this.ws = new WebSocket(location.origin.replace(/^http/,'ws').replace(/\:\d\d\d\d/,':8443'))
        // ws
        this.ws.sendPayload = (destId,data)=>{
            this.ws.send(JSON.stringify([destId,data]))
        }

        this.ws.addEventListener('message',this.handleSignallingServer)
    }
    establishConnectionList(){
        // Tries to ESTABLISH a connection with all peers in peerList
        this.peerList.forEach(id=>{
            if(!this.peerList[id]){
                // If I've not already communicated with you, i'll create a connection
                this.createConnection(id)
                this.sendOffer(id)
            }
        })
    }
    createConnection(remoteId){  // $$$$$$$$$$
        const connection = new Connection(this.localId,remoteId,this.ws,this)
        this.connections[remoteId] = connection

        return connection
    }
    sendOffer(remoteId){  // $$$$$
        this.connections[remoteId].sendOffer()
    }

    handleSignallingServer = e => 
    {
        // console.log('handleSignallingServer e.data:',e.data)
        if(this.peerList){
            // Two cases:
            // 1) A new peron is trying to establish a connection and has sent an offer
            // 2) You, the new person has sent an offer and you've got a reply
            // How do we tell them appart? => Only the "new person" has the remote peer in his peerList
            const payload = JSON.parse(e.data)
            console.log('payload',payload)

            const senderId = payload[0]
            const data = payload[1]
            if(this.peerList.indexOf(senderId) === -1){
                // you don't have senderId in your peerList => case 1)

                // Create a new connection with that senderId
                const connection = this.createConnection(senderId)
                connection.handleSignallingServer(data,false)

                this.peerList.push(senderId)        // REMEMBER TO ATTACH TO peerList as otherwise you'll keep creating new connections!
                // add senderId ? (might be good leaving it out for now for debugging purposes) !@#!@#!@#
            }else{
                // You are the new person, case 2)
                const connection = this.connections[senderId]
                connection.handleSignallingServer(data,true)
            }
        }else{
            // THIS ONLY RUNS ONCE WHEN USER CONNECTS
            const data =  JSON.parse(e.data)

            // Extract data (localId, peerList)
            this.localId = data[0]
            this.peerList = data[1]

            console.log('Your are: ',this.localId)
            


            /* !@#!@#!@!#@!#!##!@!#@!#@!#@#!@!#@!#@!#@!#@!#@#!@ */
            this.establishConnectionList()
        }
    }
    send(destId,data){
        // Sends data to ONE connection
        const connection = this.connections[destId]
        if(connection.dataChannelReadyState === 1){
            this.connections[destId].send(data)
        }
    }
    broadcast(data){
        // Send data to ALL connections
        this.peerList.forEach(id=>{
            this.send(id,data)
        })
    }
    deleteConnection(remoteId){
        // Remove from peerList
        const indexOfId = this.peerList.indexOf(remoteId)
        this.peerList.splice(indexOfId,1)

        // Remove from connections
        delete this.connections[remoteId]

        // !@#!@#!@# NOTE there's a chance that connection peerList contains more ids than it should as a peer could have left before 
        // a datachannel was established
    }
    getIdList(){
        return Object.keys(this.connections).map(strVal=>Number(strVal))
    }
}

class Connection{
    constructor(localId,remoteId,ws,parent){
        this.pc
        this.localId = localId
        this.remoteId = remoteId
        this.ws = ws
        this.dataChannel
        this.dataChannelReadyState = 0
        this.parent = parent
        this.candidateBacklog = []  // list of ice canidadates that have yet to been added

        this.setup()
        this.setDeleteTimer()
        return this
    }
    setup(){
        // Setup peerconnection 
        this.pc = new RTCPeerConnection(config)

        // ice
        this.pc.onicecandidate = this.gotIceCandidate

        // datachannel
        // this.pc.ondatachannel = 
        this.pc.ondatachannel = this.dataChannelHandler
    }
    sendOffer(){
        // create dataChannel
        // !@#!@#!@# need to complete
        this.dataChannel = this.pc.createDataChannel('憂')
        this.setupDataChannel()

        // offer
        this.createSession(1)
    }
    gotIceCandidate = (e) =>{
        // Send ice candidate to remote peer
        console.log('gotIceCandidate',e)
        const candidate = e.candidate
        if(candidate){
            this.ws.sendPayload(this.remoteId,{ice:candidate})
        }
    }
    createSession = async (isOffer) =>{
        try{
            let session
            if(isOffer){
                session = await this.pc.createOffer()
            }else{
                session = await this.pc.createAnswer()
            }
            await this.pc.setLocalDescription(session)
            console.log('Connection to: ',this.remoteId,', has localDescription of:',this.pc.localDescription)
            this.ws.sendPayload(this.remoteId,this.pc.localDescription)
        }catch(err){
            console.warn('ERROR:',err)
        }
    }
    handleSignallingServer = async (data,isOfferer) =>{
        //!@#!@#!@# handle for ice

        if(data.sdp){
            // Set remoteDescription
            this.pc.setRemoteDescription(data)
                .then(_=>{
                    console.log('Connection to: ',this.remoteId,', has remoteDescription of:',this.pc.remoteDescription)
                    if(!isOfferer){
                        // Create answer
                        this.createSession(false)
                    }
                    if(this.candidateBacklog.length>0){
                        this.addBacklog()
                    }
                })
                .catch(err=>console.warn(err))
        }else if(data.ice){
            if(this.pc.remoteDescription){
                // When can add ice candidate without it causing an error
                this.pc.addIceCandidate(data.ice)
                .then()
                .catch(err=>console.warn(err))
            }else{
                // network.connections[1].pc.remoteDescription === null
                // add to backlog to be added later
                this.candidateBacklog.push(data.ice)
            }
            console.log('data.ice',data.ice)
        }else{
            console.warn('ERROR: this should not be happening! Make sure not to send anything from remote client if candidate == undefined')
        }
    }
    dataChannelHandler = e =>{
        console.log('added the dataChannel')
        this.dataChannel = e.channel
        this.setupDataChannel()
    }
    addBacklog(){
        this.candidateBacklog.forEach(candidate=>{
            this.pc.addIceCandidate(candidate)
            .then()
            .catch(err=>console.warn(err))
        })
    }
    setupDataChannel(){
        console.log('Datachannel established')

        this.dataChannel.addEventListener('open',e=>{
            this.parent.handleOpen(this.remoteId)
            this.dataChannelReadyState = 1
        },{once:true})
        
        this.dataChannel.addEventListener('message',e=>{
            try{
                this.parent.handleMessage(this.remoteId,JSON.parse(e.data))
            }catch (err){
                console.warn('ERROR: Received message could not be parsed',err)
            }
            console.log('dataChannel message: ',e)
        })
        this.dataChannel.addEventListener('close',e=>{
            this.parent.handleClose(this.remoteId)
            console.log('dataChannel CLOSED: ',e)
            this.deleteConnection()
        })
    }
    send(data){
        this.dataChannel.send(data)
    }
    deleteConnection(){
        this.parent.handleClose(this.remoteId)
        this.parent.deleteConnection(this.remoteId)
    }

    setDeleteTimer(){
        setTimeout(()=>{
            if(this.dataChannelReadyState === 0){
                console.log('DELETED SELF (this.remoteId)',this.remoteId)
                console.log('Connection Timed out')
                this.deleteConnection()
            }
        },30000)
    }




    getCandidateIds(stats) {
        let ids = {}
        stats.forEach(report => {
            if (report.type == "candidate-pair" && report.nominated && report.state == "succeeded") {
                //console.log("Found IDs")
                ids = {
                    localId: report.localCandidateId,
                    remoteId: report.remoteCandidateId
                }
            }
        });
        return ids
    }

    getCandidateInfo(stats, candidateId) {
        let info = null
        stats.forEach(report => {
            if (report.id == candidateId) {
                console.log("Found Candidate")
                info = report
            }
        })
        return info
    }

    conncectionStats = async () => {
        const stats = await this.pc.getStats(null)
        const candidates = await this.getCandidateIds(stats)
        console.log("candidates: ", candidates)
        if (candidates !== {}) {
            const localCadidate = await this.getCandidateInfo(stats, candidates.localId)
            const remoteCadidate = await this.getCandidateInfo(stats, candidates.remoteId)
            if (localCadidate !== null && remoteCadidate !== null) {
                return [localCadidate, remoteCadidate]
            }
        }
        // we did not find the candidates for whatever reeason
        return [null, null]
    }
}

const config = {
    iceServers:[
        {urls: 'stun:stun.stunprotocol.org:3478'},
        {urls: 'stun:stun.l.google.com:19302'},
        {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            url: 'turn:relay.backups.cz',
            credential: 'webrtc',
            username: 'webrtc'
        },
        {
            url: 'turn:relay.backups.cz?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
        },
    ],
    iceTransportPolicy: 'relay' //relay
}

function check(that){
    const a = network.connections[Object.keys(network.connections)[0]]
    addToUniqueList(that)
    if(Object.keys(network.connections).length>0){
        console.log('#####',that===a)
        if((that===a)===false){
            console.log('that',that)
            console.log('network.connections',a)
            console.log('findDifferentKeys',findDifferentKeys(that,a))
        }
        // debugger
    }
}

function findDifferentKeys(a,b){
    const nonMatching = []
    nonMatching.push(...findDifferentKeys2(a,b))
    nonMatching.push(...findDifferentKeys2(b,a))
    return nonMatching
}

function findDifferentKeys2(a,b){
    const nonMatching = []
    aList = Object.keys(a)
    bList = Object.keys(b)
    for(let i=0;i<aList.length;i++){
        let foundMatch = false
        for(let j=0;j<bList.length;j++){
            if(aList[i] === bList[j]){
                foundMatch = true
                break
            }
        }

        if(foundMatch === false){
            nonMatching.push(aList[i])
        }
    }
    return nonMatching
}

var uniqueList = []

function addToUniqueList(item){
    if(uniqueList.indexOf(item)===-1){
        uniqueList.push(item)
    }
}