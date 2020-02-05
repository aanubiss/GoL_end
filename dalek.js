//չեմ հասկանում ինչի ինքը ժառանգված չի???? Խորթ երեխեն ա ???
//ինչևիցե , ձեռք չեմ տա
module.exports = class Dalek { // լսի բայց անունը Դալլաս չէր??? ինչի  Դալլեեկ?
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.terr = 1; // what?
        this.index = index;
        this.mulq = 0;
        this.qq = 0; // խոսքերն ավելորդ են
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
                // eyes // սրանց վրա ավելի շատ ժամանակ ես ծախսել քան բուն նպատակիդ
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
        
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

            if (newCell) {
			var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5
                var newDalek = new Dalek(newX, newY, 5);
                daleksArr.push(newDalek);
        }
    }
}