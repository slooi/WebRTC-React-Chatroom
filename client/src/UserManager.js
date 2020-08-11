// Managers users
// Managers the establishment and removal of users
import Network from './Network.js'

export default class UserHandler{
    constructor(){
        this.users = {} // A mapping from id to Object(username,localKnown), these are ESTABLISHED usernames
        this.network
        this.localUsername = ''
        this.setup()
    }
    setup(){
        this.network = new Network()
        this.network.setupCallbacks(this.onOpen.bind(this),this.onMessage.bind(this),this.onClose.bind(this)) // <=

        // add idList
    }
    setUsername(localUsername){
        this.localUsername = localUsername
        this.determineEstablishUsernameAll(0)
    }
    createUserObject(remoteId){
        this.users[remoteId] = {username:'',localKnown:false,state:0,hasInterval:false}
    }
    sendUsername(){
        // Sends username to remote clients
        // Reliable

        // PROTOCOL
        // send: [0,'thisIsMyUsername']
        // when remote receives it: [1] <= this signals that remote has message
        // Send username to all connections that don't have my localUsername
        // Object.keys(this.users).forEach(user=>{
        //     if(this.users[id].username.length===0 || localKnown===false){

        //     }
        // })
        // this.network.broadcast(JSON.stringify([0,this.localUsername]))
    }
    establishUsernameAll(){
        // Tries to establish usernames with ALL remotes clients
        // Attempts to establish usernames for next 20 SECONDS. If takes longer stop, and delete connection (as remote could be troller)
        /* Assumptions:
            1) Runs AFTER datachannel to remote is OPEN   AND   has a username 
        */ 
        console.log('establishUsernameAll HAS BEEN CALLED')
        // ONLY RUNS ONCE

        Object.keys(this.users).forEach(id=>{
            this.establishUsername(id)
        })
    }
    establishUsername(id){
        console.log('establishUsername called! !@#!#!@# !@$!@% @!@#$## $! !$ @#!$%@%!$#%')
        const user = this.users[id]
        if(user.hasInterval === false){
            if(user.localKnown === false){
                // If remote peer has not confirmed they know local username send

                user.hasInterval = true

                // Repeatedly send payload in case it was not received
                const interval = setInterval(()=>{
                    if (user.localKnown && user.username.length !== 0 || this.network.connections[id] === undefined){
                        // Remote user has seen message OR connection broken. So delete this
                        clearInterval(interval)
                        user.hasInterval = false
                    }

                    // [0 <= handling usernames state, username]
                    let payload = [[user.localKnown,user.username.length!==0],this.localUsername]
                    this.network.send(id,JSON.stringify(payload))
                },1000)
                
                // Remove this connection if establishment takes too long
                // let interval
                // setTimeout(()=>{
                //     if(interval){
                //         clearInterval(interval)
                //         interval = undefined
                //         console.log('Username establishment timed out')
                //         // Delete connection
                //         this.deleteConnection(id)
                //     }
                // },20*1000)
            }
        }
            
    }
    // deleteConnection(remoteId){
    //     delete this.users[remoteId]
    //     this.network.deleteConnection(remoteId)
    // }
    onOpen(remoteId){
        // Should start trying to send usename to remote user.
        // BUT, need to make sure we've actaully got a username......
        console.log('I think we should establish communications! remoteId',remoteId)

        // Add id to idList
        this.createUserObject(remoteId)

        // Send local username if username.length > 0

        this.determineEstablishUsernameAll(1)
        // AIM: call establishUsernameAll ONCE after we have username and datachannel open
    }
    determineEstablishUsernameAll(type){
        // Determines whether or not to run establishUsernameAll
        // Is ONLY run ONCE

        // Prerequisites to establish username:
        // 1) Have user object of remote peer
        // 2) Have a username
        console.log('determineEstablishUsernameAll HAS BEEN CALLED!')

        if(type === 0){
            console.log('1 this.establishUsernameAll()')
            this.establishUsernameAll()
        }else{
            // Checks to see if establishUsernameAll has been executed
            if(this.localUsername.length !== 0){
                // Username has already been set. Thus execute establishUsernameAll
                console.log('2 this.establishUsernameAll()')
                this.establishUsernameAll()
            }
        }
    }
    onMessage(remoteId,message){
        console.log('ON MESSAGE CALLED!!!!')


        const state = message[0]
        const user = this.users[remoteId]
        if(typeof state === "object"){
            const [remoteLocalKnown,myUsernameKnown] = state

            // Get data
            const data = message[1]
            // Update user
            user.username = data
            user.localKnown = myUsernameKnown

            if(!remoteLocalKnown || !myUsernameKnown){
                // If remote doesn't knows I know its username
                // OR remote doesn't knows my username
                // Send

                if(this.localUsername.length !== 0){
                    

                    // Send
                    console.log('onmessage establishUsername')
                    this.establishUsername(remoteId)
                }
            }
        }

        console.log('Got message! remoteId message',remoteId,message)
    }
    onClose(remoteId){
        delete this.users[remoteId]
        console.log('closed')
    }
}