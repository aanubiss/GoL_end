/////////////////// PREDATOR /////////////////

class Predator extends Def {
    constructor(x, y, index){
        super(x, y, index)
        this.energy = 6;
        this.who = 2;
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            //////// -+2 ////////
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y + 1]
        ];
    }
    eat(){
        var who = this.who;
        super.eat(who);
        for (var i in allGrEater) {
            if (this.x == allGrEater[i].x && this.y == allGrEater[i].y) {
                allGrEater.splice(i, 1);
                break
            }
        }
    }
    mul() {
        if (this.energy >= 10) {
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                var nGrEE = new Predator(newX, newY, this.index);
                predatorArr.push(nGrEE)
                matrix[this.y][this.x] = 0;
            }
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            var newGrass = new Grass(this.x, this.y, 1);
            allGr.push(newGrass);
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break
                }
            }
        }
    }
}