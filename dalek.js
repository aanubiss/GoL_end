//չեմ հասկանում ինչի ինքը ժառանգված չի???? Խորթ երեխեն ա ???
//ինչևիցե , ձեռք չեմ տա
let Def = require("./defClass")

module.exports = class Dalek extends Def { // լսի բայց անունը Դալլաս չէր??? ինչի  Դալլեեկ?
    constructor(x, y, index) {
        super(x, y, index)
        this.terr = 1; // what?
        this.mulq = 0;
        this.qq = 0; // խոսքերն ավելորդ են
    }

    exterminate() {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 6; //Նարեկ,նայի, ստեղ չգիտեմ 6-ը ով ա, արդյոք ճիշտ ես տվել? փոխեցի 5
            }
        }
        setInterval(() => {
                allGr = []
                allGrEater = []
                predatorArr = []
                allAllEater = []
                daleksArr = []
                meteorsArr = []
        }, 200)
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