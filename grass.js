//////////////////// GRASS /////////////////

class Grass extends Def{
    mul() {
        this.multiply++;
        var newCell = random(super.chooseCell(0));
        if (this.multiply >= 6 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            allGr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
    move(){}
    eat(){}
}