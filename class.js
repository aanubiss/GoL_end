class Def{
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
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
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell());
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }
    eat(who) {
        var newCell = random(this.chooseCell(who));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy += 3;
        }
    }
}
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

///////////////////// GRASSEATER ////////////////////

class GrassEater extends Def{
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
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                var nGrE = new GrassEater(newX, newY, this.index);
                allGrEater.push(nGrE)
                matrix[this.y][this.x] = 0;
                this.energy = 10;
            }
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 1;
            var nG = new Grass(this.x, this.y, this.index);
            allGr.push(nG);
            for (var i in allGrEater) {
                if (this.x == allGrEater[i].x && this.y == allGrEater[i].y) {
                    allGrEater.splice(i, 1);
                }
            }
        }
    }
}

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

////////////////////////// AllEater ///////////////////////

class AllEater extends Def{
    constructor(x, y, index){
        super(x, y, index);
        this.energ = 7;
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
            var num = random(1);
            if (num > qwe) {
                matrix[this.y][this.x] = 1;
                var nG = new Grass(this.x, this.y, this.index);
                allGr.push(nG);
            }
            else {
                matrix[this.y][this.x] = 2;
                var nGE = new GrassEater(this.x, this.y, this.index);
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
        var who = this.gr;
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
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                var allEater = new AllEater(newX, newY, this.index);
                allAllEater.push(allEater)
                matrix[this.y][this.x] = 0;
            }
        }
    }    
}
class Dalek {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.terr = 1;
        this.index = index;
        this.mulq = 0;
        this.qq = 0;
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
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    exterminate() {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 6 ;
                for (var i in allGr) {
                    if (this.x == allGr[i].x && this.y == allGr[i].y) {
                        allGr.splice(i, 1);
                        break
                    }
                }
                for (var i in allGrEater) {
                    if (this.x == allGrEater[i].x && this.y == allGrEater[i].y) {
                        allGrEater.splice(i, 1);
                        break
                    }
                }
                for (var i in predatorArr) {
                    if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break
                    }
                }
                for (var i in allAllEater) {
                    if (this.x == allAllEater[i].x && this.y == allAllEater[i].y) {
                        allAllEater.splice(i, 1);
                        break
                    }
                }
                // eyes //
                matrix[10][20] = 7;
                matrix[11][20] = 7;
                matrix[10][19] = 7;
                matrix[11][19] = 7;
                //
                matrix[10][39] = 7;
                matrix[10][38] = 7;
                matrix[11][39] = 7;
                matrix[11][38] = 7;

                // mouth //
                matrix[29][15] = 7;
                matrix[29][14] = 7;
                matrix[30][15] = 7;
                matrix[30][14] = 7;
                //
                matrix[30][17] = 7;
                matrix[30][16] = 7;
                matrix[31][17] = 7;
                matrix[31][16] = 7;
                //
                matrix[31][19] = 7;
                matrix[31][18] = 7;
                matrix[32][19] = 7;
                matrix[32][18] = 7;
                //
                matrix[32][21] = 7;
                matrix[32][20] = 7;
                matrix[33][21] = 7;
                matrix[33][20] = 7;
                ////
                matrix[32][23] = 7;
                matrix[32][22] = 7;
                matrix[33][23] = 7;
                matrix[33][22] = 7;
                //
                matrix[32][25] = 7;
                matrix[32][24] = 7;
                matrix[33][25] = 7;
                matrix[33][24] = 7;
                //
                matrix[32][27] = 7;
                matrix[32][26] = 7;
                matrix[33][27] = 7;
                matrix[33][26] = 7;
                //
                matrix[32][29] = 7;
                matrix[32][28] = 7;
                matrix[33][29] = 7;
                matrix[33][28] = 7;
                //
                matrix[32][31] = 7;
                matrix[32][30] = 7;
                matrix[33][31] = 7;
                matrix[33][30] = 7;
                //
                matrix[32][33] = 7;
                matrix[32][32] = 7;
                matrix[33][33] = 7;
                matrix[33][32] = 7;
                //
                matrix[32][35] = 7;
                matrix[32][34] = 7;
                matrix[33][35] = 7;
                matrix[33][34] = 7;
                //
                matrix[32][37] = 7;
                matrix[32][36] = 7;
                matrix[33][37] = 7;
                matrix[33][36] = 7;
                //
                matrix[31][39] = 7;
                matrix[31][38] = 7;
                matrix[32][39] = 7;
                matrix[32][38] = 7;
                //
                matrix[30][41] = 7;
                matrix[30][40] = 7;
                matrix[31][41] = 7;
                matrix[31][40] = 7;
                //
                matrix[29][43] = 7;
                matrix[29][42] = 7;
                matrix[30][43] = 7;
                matrix[30][42] = 7;
            }
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newDalek = new Dalek(newCell[0], newCell[1], 5);
                daleksArr.push(newDalek);
                matrix[newCell[1]][newCell[0]] = 5;
        }
    }
}