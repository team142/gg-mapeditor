
var web = {}

//Called by web
function buttonJoinServer() {
    document.getElementById("btnJoinServer").disabled = true
    var url = document.getElementById("selectServer").value
    var name = document.getElementById("inputName").value
    if (name) {
        document.getElementById("btnJoinServer").enabled = false
        sio.joinServer(url, name)
    }
}

web.showListOfGames = function (games) {
    var body = {
        conversation: "P_REQUEST_JOIN_GAME",
        id: games[0].id
    }
    var json = JSON.stringify(body)
    sio.send(json)

}


web.changeView = function (view) {
    web.toggleElement("VIEW_SERVERS", view == "VIEW_SERVERS")
    web.toggleElement("VIEW_GAMES", view == "VIEW_GAMES")
    web.toggleElement("VIEW_CANVAS", view == "VIEW_CANVAS")
    if (view == "VIEW_CANVAS") {
        BabylonUtils.setup3D()
        // var t = setInterval(tick, 1000)
    }
}

web.toggleElement = function (id, toggle) {
    if (toggle) {
        document.getElementById(id).style.display = "block"
        document.getElementById(id).style.visibility = "visible"
    } else {
        document.getElementById(id).style.visibility = "hidden"
        document.getElementById(id).style.display = "none"
    }
}

