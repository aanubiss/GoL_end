var socket = io();
var side = 15;
var n = 50;
var m = 60;

function setup() {
    createCanvas(m * side, n * side);
    background("#acacac");
}

function paint(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("brown");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 6) {
                fill("#42e");
            }
            else if (matrix[y][x] == 7) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
        }
    }
}
socket.on("send matrix", paint)