let Def = require("./defClass")

module.exports = class Grass extends Def {
    mul() {
        this.multiply++;
        let grassCells = super.chooseCell(0)
        let newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (this.multiply >= 6 && newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            var newGrass = new Grass(x, y, 1);
            allGr.push(newGrass);
            this.multiply = 0;
        }
    }
    move(){}
    eat(){}
}