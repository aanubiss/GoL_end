let Def = require("./defClass")

module.exports = class Grass extends Def{
    mul() {
        this.multiply++;
        var grassCells = super.chooseCell(1)
		var newCell = Math.floor(Math.random() * grassCells.length)
        if (this.multiply >= 6 && newCell) {
            matrix[newCell[1]][newCell[0]] = 1;
            var newGrass = new Grass(newCell[0], newCell[1], 1);
            allGr.push(newGrass);
            this.multiply = 0;
        }
        //console.log("mul")
    }
    move(){}
    eat(){}
}