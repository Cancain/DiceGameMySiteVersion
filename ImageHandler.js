export class PlayerImages{
    constructor(){
        this.dice1Src = "img/Dice1.png";
        this.dice2Src = "img/Dice2.png"; 
        this.dice3Src = "img/Dice3.png"; 
        this.dice4Src = "img/Dice4.png"; 
        this.dice5Src = "img/Dice5.png"; 
        this.dice6Src = "img/Dice6.png";

        //
        //creates an array of the dices different results
        //with pictures
        //
        this.playerImages = [
            document.getElementById("playerImgDice1"),
            document.getElementById("playerImgDice2"),
            document.getElementById("playerImgDice3"),
            document.getElementById("playerImgDice4"),
            document.getElementById("playerImgDice5")
        ];

        this.ComputerImages = [
            document.getElementById("compImgDice1"),
            document.getElementById("compImgDice2"),
            document.getElementById("compImgDice3"),
            document.getElementById("compImgDice4"),
            document.getElementById("compImgDice5")
        ]
    }

    //
    //shows the relevant pictures of a dices depending on 
    //the dice roll
    //
    update(dices, keptDices, images){
        for (let i = 0; i < dices.length; i++) {
            if (!keptDices[i]){
                switch (dices[i]) {
                    case 1:
                        images[i].src = this.dice1Src;
                        break;
                    case 2:
                        images[i].src = this.dice2Src;
                        break;
                    case 3:
                        images[i].src = this.dice3Src;
                        break;
                    case 4:
                        images[i].src = this.dice4Src;
                        break;
                    case 5:
                        images[i].src = this.dice5Src;
                        break;
                    case 6: 
                        images[i].src = this.dice6Src;
                        break;
                        
                }
            } 
        }
    }

    //
    //Removes all dice-pictures form the screen
    //
    clear(){
        for (let i = 0; i < this.playerImages.length; i++) {
            this.playerImages[i].src = "";            
        }
        for (let i = 0; i < this.ComputerImages.length; i++) {
            this.ComputerImages[i].src = "";            
        }
    }
    clearComputerImages(){
        for (let i = 0; i < this.ComputerImages.length; i++) {
            this.ComputerImages[i].src = "";            
        }
    }

}