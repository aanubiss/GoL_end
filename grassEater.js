let Def = require("./defClass")

module.exports = class GrassEater extends Def{
    constructor(x, y, index){
        super(x, y, index)
        this.energy = 10
        this.who = 1
    }
    eat(){
        var who = this.who;
        super.eat(who)
        for (var i in allGr) {
            if (this.x == allGr[i].x && this.y == allGr[i].y) {
                allGr.splice(i, 1);
                break
            }
        }
    }
    mul() {
        if (this.energy >= 11) {
            
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 2
                var nGrE = new GrassEater(newX, newY, 2);
                allGrEater.push(nGrE)
                matrix[this.y][this.x] = 0;
                this.energy = 10;
            }
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 1;
            var nG = new Grass(this.x, this.y, 1);
            allGr.push(nG);
            for (var i in allGrEater) {
                if (this.x == allGrEater[i].x && this.y == allGrEater[i].y) {
                    allGrEater.splice(i, 1);
                }
            }
        }
    }
}