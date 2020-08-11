module.exports = function createApp(server){
    const ws = require('ws')
    const PairHandler = require('./PairHandler.js')


    // Application Variables/Constants
    let idWebsocketPair = new PairHandler()
    let idCounter = 0


    // Websocket
    const wss = new ws.Server({server})

    wss.on('connection',ws=>{
        console.log('NEW CONNECTION',idCounter+1)

        // Increment id counter and set id    
        idCounter++
        const id = idCounter
        
        // Give user list of all player ids
        ws.send(JSON.stringify([id,idWebsocketPair.getIdList()]))    // BEFORE YOU GIVE USER AN ID
        console.log('sent to user: [id,idWebsocketPair.getIdList()]',[id,idWebsocketPair.getIdList()])
        // Update pair
        idWebsocketPair.add(id,ws)
        
        // Event Listeners
        ws.on('message',unparsedPayload=>{
            // When receive payload, change id to sender's id,  then send to destination
            const payload = JSON.parse(unparsedPayload)
            const destId = payload[0]
            const data = payload[1]

            const destWs = idWebsocketPair.getWs(destId)
            if(destWs !== -1){
                const senderId = idWebsocketPair.getId(ws)
        
                // Modify payload
                const newPayload = JSON.stringify([senderId,data])
        
                // Send
                destWs.send(newPayload)
            }
        })
        ws.on('close',()=>{
            idWebsocketPair.deleteByWs(ws)
        })
    })


}