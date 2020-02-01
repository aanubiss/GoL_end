var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html")
})

server.listen(3000);

matrix = [];
var n = 50;
var m = 60;
allGr = []
allGrEater = []
predatorArr = []
allAllEater = []
daleksArr = []

for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        matrix[y][x] = Math.floor(Math.random() * 4);
    }
}

io.sockets.emit("send matrix", matrix)

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
AllEater = require("./allEater")
Dalek = require("./dalek")

function createObj() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1;
                var gr = new Grass(x, y, 1)
                allGr.push(gr);
            }
        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                matrix[y][x] = 2;
                var grE = new GrassEater(x, y, 2)
                allGrEater.push(grE);
            }
        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 3) {
                matrix[y][x] = 3;
                var grEE = new Predator(x, y, 3)
                predatorArr.push(grEE);
            }
        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 4) {
                matrix[y][x] = 4;
                var aE = new AllEater(x, y, 4)
                allAllEater.push(aE);
            }
        }
    }
    io.sockets.emit("send matrix", matrix)
}

function game() {
    for (var i in allGr) {
        allGr[i].mul()
    }
    for (var i in allGrEater) {
        allGrEater[i].move()
        allGrEater[i].eat()
        allGrEater[i].mul()
        allGrEater[i].die()
    }
    for (var i in predatorArr) {
        predatorArr[i].move()
        predatorArr[i].eat()
        predatorArr[i].mul()
        predatorArr[i].die()
    }
    for (var i in allAllEater) {
        allAllEater[i].move()
        allAllEater[i].grassEat()
        allAllEater[i].grasseaterEat()
        allAllEater[i].mul()
        allAllEater[i].die()
    }
    // for (var i in daleksArr) {
    //     if (daleksArr.length <=50) {
    //         setTimeout(() => {
    //             daleksArr[i].mul()
    //         }, 7500);
    //     }
    //     else {
    //         daleksArr[i].exterminate();
    //     }
    // }

    io.sockets.emit("send matrix", matrix)
}

setInterval(game, 750)

io.on("connection", function () {
    createObj()
})