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
var n = 60;
var m = 60;
allGr = []
allGrEater = []
predatorArr = []
allAllEater = []
daleksArr = []
meteorsArr = []
for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        matrix[y][x] = Math.floor(Math.random() * 4); // եթե ուզում ես մինչև 4-ը ներառյալ լցվի, մինչև 5-ը գրի
    } // հիմա ձեռք չեմ տա
}

io.sockets.emit("send matrix", matrix)

Meteor = require("./meteor")
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
        else if (matrix[y][x] == 2) {
                matrix[y][x] = 2;
                var grE = new GrassEater(x, y, 2)
                allGrEater.push(grE);
            }
        else if (matrix[y][x] == 3) {
                matrix[y][x] = 3;
                var grEE = new Predator(x, y, 3)
                predatorArr.push(grEE);
            }        
        else if (matrix[y][x] == 4) {
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
    for (var i in daleksArr) {
        if (daleksArr.length <=50) {
            setTimeout(() => {
                daleksArr[i].mul()
            }, 7500);
        }
        else {
            daleksArr[i].exterminate();
        }
    }

    io.sockets.emit("send matrix", matrix)
}

setInterval(game, 1000) 


//////////////////////////ջանիկ, նայիր, կարծում եմ աշխատեց:
//Հիմա փորձիր սրանք գրես,,,իհարկե քո ֆունկցիաներով:

/////////////////



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function meteor() {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length);
    var directions = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1]
    ]; 
    
    matrix[y][x] = 9
    var met = new Meteor(x, y, 9)
    meteorsArr.push(met)
   
    setInterval(function f() {
        for (let i = 0; i < directions.length; i++) {
            var newX = directions[i][0]
            var newY = directions[i][1]
            matrix[newY][newX] = 9
            var met = new Meteor(newX, newY, 9)
            meteorsArr.push(met)
        }
    }, 100)
    
    }  
    
    io.sockets.emit("send matrix", matrix);
function addGrass() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            allGr.push(new Grass(x, y, 1))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function sote(){
    matrix[m/2][n/2] = 5;
    daleksArr.push(new Dalek(m/2, n/2, 5))
    io.sockets.emit("send mattrix", matrix)
}

io.on('connection', function (socket) {
    createObj();
    socket.on("meteor", meteor);
    socket.on("add grass", addGrass);
    socket.on("start the end", sote);
});
