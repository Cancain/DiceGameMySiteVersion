export class ScoreHandler{
    constructor() {
        this.diceArray = new Array(5);
        this.score = 0;
        this.message = "";
    }

    //
    //puts all dice with thesame value in an array
    //then calculates the score based on pairs,straights and so on
    //
    calculateScore(){
        let ones = [];
        let twos = [];
        let threes = []; 
        let fours = [];
        let fives = [];
        let sixes = [];

        this.sortDices(ones, twos, threes, fours, fives, sixes);    
        
        //
        //if there is no straights detected
        //looks for pairs, threes or fours
        //
        if (!this.checkStraights(ones, twos, threes, fours, fives, sixes)){
            this.checkOnes(ones);
            this.checkTwos(twos);
            this.checkThrees(threes);
            this.checkFours(fours);
            this.checkFives(fives);
            this.checkSixes(sixes);
        }
    }
    //
    //Sorts the dices with thesame value into seperate arrays
    //    
    sortDices(ones, twos, threes, fours, fives, sixes) {
        for (let i = 0; i < this.diceArray.length; i++) {
            switch (this.diceArray[i]) {
                case 1:
                    ones.push(this.diceArray[i]);
                    break;
                case 2:
                    twos.push(this.diceArray[i]);
                    break;
                case 3:
                    threes.push(this.diceArray[i]);
                    break;
                case 4:
                    fours.push(this.diceArray[i]);
                    break;
                case 5:
                    fives.push(this.diceArray[i]);
                    break;
                case 6:
                    sixes.push(this.diceArray[i]);
                    break;
            }
        }
    }

    //
    //the six fuctions below checks for pairs, threes and fours
    //then adds the corresponding score
    //
    checkSixes(sixes) {
        switch (sixes.length) {
            case 2:
                this.score += 12;
                this.updateMessage("a pair of 6s");
                break;
            case 3:
                this.score += 18;
                this.updateMessage("three 6s");
                break;
            case 4:
                this.score += 24;
                this.updateMessage("FOUR 6s");
                break;
            case 5:
                this.score += 50;
                this.updateMessage("YATZY!!");
                break;
        }
    }

    checkFives(fives) {
        switch (fives.length) {
            case 2:
                this.score += 10;
                this.updateMessage("a pair of 5s");
                break;
            case 3:
                this.score += 15;
                this.updateMessage("three 5s");
                break;
            case 4:
                this.score += 20;
                this.updateMessage("FOUR 5s");
                break;
            case 5:
                this.score += 50;
                this.updateMessage("YATZY!!");
                break;
        }
    }

    checkFours(fours) {
        switch (fours.length) {
            case 2:
                this.score += 8;
                this.updateMessage("a pair of 4s");
                break;
            case 3:
                this.score += 12;
                this.updateMessage("three 4s");
                break;
            case 4:
                this.score += 16;
                this.updateMessage("FOUR 4s");
                break;
            case 5:
                this.score += 50;
                this.updateMessage("YATZY!!");
                break;
        }
    }

    checkThrees(threes) {
        switch (threes.length) {
            case 2:
                this.score += 6;
                this.updateMessage("a pair of 3s");
                break;
            case 3:
                this.score += 9;
                this.updateMessage("three 3s");
                break;
            case 4:
                this.score += 12;
                this.updateMessage("FOUR 3s");
                break;
            case 5:
                this.score += 50;
                this.updateMessage("YATZY!!");
                break;
        }
    }

    checkTwos(twos) {
        switch (twos.length) {
            case 2:
                this.score += 4;
                this.updateMessage("a pair of 2s");
                break;
            case 3:
                this.score += 6;
                this.updateMessage("three 2s");
                break;
            case 4:
                this.score += 8;
                this.updateMessage("fOUR 2s");
                break;
            case 5:
                this.score += 50;
                this.updateMessage("YATZY!!");
                break;
        }
    }

    checkOnes(ones) {
        switch (ones.length) {
            case 2:
                this.score += 2;
                this.updateMessage("a pair of 1s");
                break;
            case 3:
                this.score += 3;
                this.updateMessage("three 1s");
                break;
            case 4:
                this.score += 4;
                this.updateMessage("FOUR 1s");
                break;
            case 5:
                this.score += 50;
                this.updateMessage("YATZY!!");
                break;
        }
    }

    //
    //looks for either a small or large straigt
    //then adds the corresponding score
    //
    checkStraights(ones, twos, threes, fours, fives, sixes){
        if (
            ones.length === 1 &&
            twos.length === 1 &&
            threes.length === 1 &&
            fours.length === 1 &&
            fives.length === 1
        ) {
            this.score += 15;
            this.updateMessage("a small straight!");
            return true;
        } else if(
            twos.length === 1 &&
            threes.length === 1 &&
            fours.length === 1 &&
            fives.length === 1 &&
            sixes.length === 1
        ) {
            this.score += 20;
            this.updateMessage("a large straight!");
            return true;
        } else {
            return false;
        }
    }

    //
    //updates the message-label with a proper message for your score
    //if you scored a pair and an other pair this function
    //detects that and just adds the second message to the first
    //
    updateMessage(msg){
        if (this.isNullorEmpty(this.message)){
            this.message = msg;
        } else {
            this.message += ` and ${msg}`;
        }
    }
    isNullorEmpty(text){
        if (text == "" || text == null){
            return true;
        } else return false;
    }
}