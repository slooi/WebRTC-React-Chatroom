// Managers users
// Managers the establishment and removal of users
import Network from './Network.js'

export default class UserHandler{
    constructor(){
        this.users = {} // A mapping from id to Object(username,localKnown), these are ESTABLISHED usernames
        this.network
        this.localUsername = ''
        this.setup()
        this.receivedMessageIds = []    // A list containing the ids that have been replied to
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
        this.users[remoteId] = {username:'',localKnown:false}
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

        Object.keys(this.users).forEach(id=>{
            const user = this.users[id]
            if(user.localKnown === false){
                // If remote peer has not confirmed they know local username send

                // Repeatedly send payload in case it was not received
                interval = setInterval(()=>{
                    const idPos = this.receivedMessageIds.indexOf(id)
                    if (idPos !== -1){
                        // Remote user has seen message. So delete this
                        this.receivedMessageIds.splice(idPos,1)
                        clearInterval(interval)
                        return
                    }

                    // [0 <= handling usernames state, username]
                    const payload = [0,this.localUsername]
                    this.network.send(id,JSON.stringify(payload))
                },1000)
                
                // Remove this connection if establishment takes too long
                let interval
                setTimeout(()=>{
                    if(interval){
                        clearInterval(interval)
                        interval = undefined
                        console.log('Username establishment timed out')
                        // Delete connection
                        this.deleteConnection(id)
                    }
                },20*1000)
            }
        })
    }
    deleteConnection(remoteId){
        delete this.users[remoteId]
        this.network.deleteConnection(remoteId)
    }
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
    determineEstablishUsernameAll(type,remoteId){
        // Determines whether or not to run establishUsernameAll

        // Prerequisites to establish username:
        // 1) Have user object of remote peer
        // 2) Have a username
        console.log('determineEstablishUsernameAll HAS BEEN CALLED!')

        if(type === 0){
            if(Object.keys(this.users).length!==0){
                // User has already been added
                this.establishUsernameAll()
            }
        }else{
            // Checks to see if establishUsernameAll has been executed
            if(this.localUsername.length !== 0){
                // Username has already been set. Thus execute establishUsernameAll
                this.establishUsernameAll()
            }
        }
    }
    onMessage(remoteId,message){
        // First checks whether usernames have been established with this peer
        if(this.users[remoteId])

        console.log('Got message! remoteId message',remoteId,message)
    }
    onClose(){
        console.log('closed')
    }
}