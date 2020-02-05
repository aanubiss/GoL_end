let Def = require("./defClass")

module.exports = class AllEater extends Def{
    constructor(x, y, index){
        super(x, y, index);
        this.energ = 7; //բայց ինչի ա ստեղ ասենք կիսատ բառը 
        this.gr = 1;
        this.grE = 2;
        this.grF = 0;
    }
    getNewCoordinates() {
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
    die(qwe) {
        if (this.energy <= 0) {
            var num = Math.floor(Math.random() * 2);
            if (num > qwe) {
                matrix[this.y][this.x] = 1;
                var nG = new Grass(this.x, this.y, 1);
                allGr.push(nG);
            }
            else {
                matrix[this.y][this.x] = 2;
                var nGE = new GrassEater(this.x, this.y, 2);
                allGrEater.push(nGE);
            }
            for (var i in allAllEater) {
                if (this.x == allAllEater[i].x && this.y == allAllEater[i].y) {
                    allAllEater.splice(i, 1);
                    break
                }
            }
        }
    }
    grassEat(){
        var grF = this.grF;
        var who = this.gr; // վայ ամաաան
        if(grF < 4){
            super.eat(who);
            for (var i in allGr) {
                if (this.x == allGr[i].x && this.y == allGr[i].y) {
                    allGr.splice(i, 1);
                    break
                }
                this.grF++
            }
        }
        else{
            this.die(0.999);
        }
    }
    grasseaterEat(){
        var who = this.grE;
        super.eat(who);
        for (var i in allGrEater) {
            if (this.x == allGrEater[i].x && this.y == allGrEater[i].y) {
                allGrEater.splice(i, 1);
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
                matrix[newY][newX] = 4
                var allEater = new AllEater(newX, newY, 4);
                allAllEater.push(allEater)
                matrix[this.y][this.x] = 0;
            }
        }
    }    
}
fff