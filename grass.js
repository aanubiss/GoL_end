let Def = require("./defClass")

module.exports = class Grass extends Def{
    mul() {
        this.multiply++;
        var newCell = Math.floor(Math.random () * super.chooseCell(0).length)       
        if (this.multiply >= 6 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], 1);
            allGr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
    move(){}
    eat(){}
}