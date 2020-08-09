console.log('loaded PairHandler.js')




class PairHandler{
    // This handles pairs of objects
    // Used for the quick accessing of either knowing one

    // Assumes:
        // unique id, no duplicates
    constructor(){
        this.idToWebsocket = {}
        this.websocketIdArray = []
    }
}

PairHandler.prototype.add = function(id,ws){
    this.idToWebsocket[id] = ws
    this.websocketIdArray.push(ws,id)
}

PairHandler.prototype.getId = function(ws){
    const wsIndex = this.websocketIdArray.indexOf(ws)
    if(wsIndex === -1){
        throw new Error('ERROR: should not be -1')
    }
    return this.websocketIdArray[wsIndex+1]
}

PairHandler.prototype.getWs = function(id){
    if(!this.idToWebsocket[id]){
        console.warn('ERROR: no websocket exists at index',id)
        console.warn('User given the idList had old copy')
        return -1
    }
    return this.idToWebsocket[id]
}

PairHandler.prototype.deleteByWs = function(ws){
    const wsIndex = this.websocketIdArray.indexOf(ws)
    const id = this.getId(ws)

    // delete id and websocket in array
    this.websocketIdArray.splice(wsIndex,2)
    // delete websocket in object
    delete this.idToWebsocket[id]
}

PairHandler.prototype.getIdList = function(){
    // Return an array of Numbers (not string numbers)
    const idArray = []
    for(let i=1;i<this.websocketIdArray.length;i+=2){
        idArray.push(this.websocketIdArray[i])
    }
    return idArray//Object.keys(this.idToWebsocket).map(val=>Number(val))
}

module.exports = PairHandler