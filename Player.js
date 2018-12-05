import {Dice} from "../Dice.js";
 
export class Player {
    constructor(name){
        this.name = name;
        this.totalScore = 0;

        this.dice1 = new Dice;
        this.dice1Keep = false;

        this.dice2 = new Dice;
        this.dice2Keep = false;

        this.dice3 = new Dice;
        this.dice3Keep = false;

        this.dice4 = new Dice;
        this.dice4Keep = false;
        
        this.dice5 = new Dice;
        this.dice5Keep = false;

        this.reRolls = 3;
    }
}