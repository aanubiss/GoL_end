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
    eat(){
        let eatCells = super.chooseCell(1);
        let eatCellGrE = super.chooseCell(2);
        let eatCells = eatCells.concat(eatCellGrE)
        let newCell = eatCells[Math.floor(Math.random() * eatCells.length)]
        let who = newCell;
        super.eat(who)
        if(super.newCell){
            if(who[0][1] == 1){
                for (var i in allGr) {
                    if (this.x == allGr[i].x && this.y == allGr[i].y) {
                        allGr.splice(i, 1);
                        break
                    }
                }
            }
            if(who[0][1] == 2){
                for (var i in allGrEater) {
                    if (this.x == allGrEater[i].x && this.y == allGrEater[i].y) {
                        allGr.splice(i, 1);
                        break
                    }
                }
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