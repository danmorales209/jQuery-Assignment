// JS for functionality

class character {
    constructor(inputName, inputHP, inputAttack, inputCounter, img) {
        this.name = inputName;
        this.initalHP = inputHP;
        this.currentHP = this.initalHP;
        this.attackPower = inputAttack;
        this.counterPower = inputCounter;
        this.multiplier = 1;
        this.role ="";
        this.state ="choose";
        this.imgPath = `assets\\images\\${img}.png`;

    };

    //Methods

    // pass a character object
    attack(defender) {
        defender.currentHP -= (this.attack * this.multiplier);
        return `${this.name} attacked ${defender.getName()} for ${this.attackPower * this.multiplier++} damage!`;
    };

    // pass a character object
    defend(attacker) {
        attacker.currentHP -= this.counterPower;
        return `${this.name} counter attacked ${attacker.getName()} for ${this.counterPower} damage!`;
    };

    getHP() {
        return this.currentHP;
    };

    getState() {
        return this.state;
    };

    getName() {
        return this.name;
    };

    getRole() {
        return this.role;
    }

    changeRole(newRole) {
        this.role = newRole;
    }

    changeState(newState) {
        this.state = newState;
    };

    checkCharacter() {
        if(this.currentHP <= 0) {
            this.state = "defeated";
        }
    }

    reset() {
        this.currentHP = this.initalHP;
        this.multiplier = 1;
        this.state = "choose";
        this.role = "";
    };

};

function initateAttack(attacker, defender) {
    $("#attack-message").text(attacker.attack(defender));
    attacker.checkCharacter();
    $("#defend-message").text(defender.defend(attacker));
    defender.checkCharacter();
};

function characterAction() {
    var temp = "";
    alert($(this).attr("index"));
    

};
/*function selectAttacker (this) {

}*/




$(document).ready(function() {
    var charArray = [
        new character("Obi-Wan Kenobi",120,10,10,'#'),
        new character("Luke Skywalker",100,10,10,'#'),
        new character("Darth Sideous",150,10,10,'#'),
        new character("Darth Maul", 180,10,10,"#")
    ];

    var testText = "This is a test";

    var charContainerArray = $(".character-container");

    charContainerArray.each( function (index, element) {
        $(element).children(".character-name").text(charArray[index].getName());
        $(element).children(".character-photo").attr("src", "https://via.placeholder.com/150");
        $(element).children(".character-hp").text(charArray[index].getHP());
    })

    charContainerArray.on("click", characterAction);

});