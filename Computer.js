import {Player} from "./Player.js";

export class Computer extends Player {

    constructor(){
        super()
    }

    //
    // A big method for the computers desicionmaking for what dices to keep
    //
    decideKeptDices(){
        let dices = this.makeDiceArray();

        for (let i = 0; i < dices.length; i++) {
            console.log("dice" + (i + 1)  + ": " + dices[i]);            
        }

        console.log("dice1 value: " + dices[0].value)

        console.log("dices are: " + dices);
        console.log("dices is length: " + dices.length);

        ///Creating an array for each possible dice-value
        let ones = [];
        let twos = [];
        let threes = [];
        let fours = [];
        let fives = [];
        let sixes = [];

        ///sort all the computers in different arrays depending on value
        this.sortDices(dices, ones, twos, threes, fours, fives, sixes);

        ///
        ///Priorites what dices to keep for the next roll
        ///
        if (this.gotYatzy(ones, twos, threes, fours, fives, sixes)) {
                this.keepAllDices();

        } else if (this.gotStraight(ones, twos, threes, fours, fives, sixes)){
            this.keepAllDices();  

        } else if (sixes.length === 4){
            this.keepAll(6, dices);

        } else if (fives.length === 4){
            this.keepAll(5, dices);

        } else if (fours.length === 4){
            this.keepAll(4, dices);

        } else if (threes.length === 4){
            this.keepAll(3, dices);

        } else if (twos.length === 4){
            this.keepAll(2, dices);

        } else if (ones.length === 4){
            this.keepAll(1, dices);

        } else if (sixes.length === 3){
            this.keepAll(6, dices);
            this.keepPairs(dices, fives, sixes);
    
        } else if (fives.length === 3){
            this.keepAll(5, dices);
            this.keepPairs(dices, fives, sixes);
    
        } else if (fours.length === 3){
            this.keepAll(4, dices);
            this.keepPairs(dices, fives, sixes);
    
        } else if (threes.length === 3){
            this.keepAll(3, dices);
            this.keepPairs(dices, fives, sixes);
    
        } else if (twos.length === 3){
            this.keepAll(2, dices);
            this.keepPairs(dices, fives, sixes);
    
        } else if (ones.length === 3){
            this.keepAll(1, dices);
            this.keepPairs(dices, fives, sixes);

        } else if (this.got1to4(ones, twos, threes, fours)){
                    console.log("in 1to4")
                        this.keepFirst(1, dices);
                        this.keepFirst(2, dices);
                        this.keepFirst(3, dices);
                        this.keepFirst(4, dices);

        } else if (this.got2to5(twos, threes, fours, fives)){
                    console.log("in 2to5");
                        this.keepFirst(2, dices);
                        this.keepFirst(3, dices);
                        this.keepFirst(4, dices);
                        this.keepFirst(5, dices);

        } else if (this.got3to6(threes,fours,fives,sixes)){
                    console.log("in 3to6")
                        this.keepFirst(3, dices);
                        this.keepFirst(4, dices);
                        this.keepFirst(5, dices);
                        this.keepFirst(6, dices);
        } else this.keepPairs(dices, fives, sixes);
    }

    ///keeps all pairs of fives or sixes
    ///checks the length of the fives and sixes arrays
    ///if the length is two, it keeps all of that dice
    keepPairs(dices, fives, sixes) {

         if (fives.length === 2) {
            this.keepAll(5, dices);
        }
        else if (sixes.length === 2) {
            this.keepAll(6, dices);
        }
    }

    ///checks whether the computer has a straight
    ///by checking if arrays 1-5 or 2-6 are all of length one
    gotStraight(ones, twos, threes, fours, fives, sixes) {
        return ones.length === 1 &&
            twos.length === 1 &&
            threes.length === 1 &&
            fours.length === 1 &&
            fives.length === 1 ||
            twos.length === 1 &&
            threes.length === 1 &&
            fours.length === 1 &&
            fives.length === 1 &&
            sixes.length === 1;
    }

    ///checks wheter the computer has five of any dice
    ///looks for a length of five in any dice-array
    gotYatzy(ones, twos, threes, fours, fives, sixes) {
        return ones.length === 5 ||
            twos.length === 5 ||
            threes.length === 5 ||
            fours.length === 5 ||
            fives.length === 5 ||
            sixes.length === 5;
    }
    ///Checks for a close-straight of 1-4
    ///by looking at the length of dice-array 1-4
    got1to4(ones, twos, threes, fours){
        return ones.length >= 1 &&
            twos.length >= 1 &&
            threes.length >= 1 &&
            fours.length >= 1;
    }
    ///Checks for a close-straight of 2-5
    ///by looking at the length of dice-array 2-5
    got2to5(twos, threes, fours, fives){
        return twos.length >= 1 &&
            threes.length >= 1 &&
            fours.length >= 1 &&
            fives.length >= 1;
    }
    ///Checks for a close-straight of 3-6
    ///by looking at the length of dice-array 3-6
    got3to6(threes, fours, fives, sixes){
        return threes.length >= 1 &&
            fours.length >= 1 &&
            fives.length >= 1 &&
            sixes.length >= 1;
    }

    ///sets all Dices to be kept
    keepAllDices(){
        this.dice1Keep = true;
        this.dice2Keep = true;
        this.dice3Keep = true;
        this.dice4Keep = true;
        this.dice5Keep = true;
    }

    makeDiceArray() {
        return [
            this.dice1.value,
            this.dice2.value,
            this.dice3.value,
            this.dice4.value,
            this.dice5.value
        ];
    }

    ///Puts all dices in a corresponding array
    sortDices(dices, ones, twos, threes, fours, fives, sixes) {
        for (let i = 0; i < dices.length; i++) {
            switch (dices[i]) {
                case 1:
                    ones.push(dices[i].value);
                    break;
                case 2:
                    twos.push(dices[i].value);
                    break;
                case 3:
                    threes.push(dices[i].value);
                    break;
                case 4:
                    fours.push(dices[i].value);
                    break;
                case 5:
                    fives.push(dices[i].value);
                    break;
                case 6:
                    sixes.push(dices[i].value);
                    break;
            }
        }
    }

    ///Keeps all dices of a certain value
    keepAll(num, dices){
        for (let i = 0; i < dices.length; i++) {
            if (dices[i] === num){
                switch (i) {
                    case 0:
                        this.dice1Keep = true;
                        break;
                    case 1:
                        this.dice2Keep = true;
                        break;
                    case 2:
                        this.dice3Keep = true;
                        break;
                    case 3:
                        this.dice4Keep = true;
                        break;
                    case 4:
                        this.dice5Keep = true;
                        break;

                }
            }
            
        }
    }
    
    ///keeps the first dice of a certain value
    keepFirst(num, dices){
      let position = dices.indexOf(num, 0);
        switch (position){
            case 0:
                this.dice1Keep = true;
                break;
            case 1:
                this.dice2Keep = true;
                break;
            case 2:
                this.dice3Keep = true;
                break;
            case 3:
                this.dice4Keep = true;
                break;
            case 4:
                this.dice5Keep = true;
                break;
        }
    }
}
    

