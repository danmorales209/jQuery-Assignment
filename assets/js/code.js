// JS for functionality

class character {
    constructor(inputName, inputHP, inputAttack, inputCounter, img) {
        this.name = inputName;
        this.initalHP = inputHP;
        this.currentHP = this.initalHP;
        this.attackPower = inputAttack;
        this.counterPower = inputCounter;
        this.multiplier = 1;
        this.role = "";
        this.state = "choose";
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
        if (this.currentHP <= 0) {
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

function colorUpdate(element, state) {

    if (state === "choose") {
        $(element).css("background-color", "white");
    }
    else if (state == "player") {
        $(element).css("background-color", "green");
    }
    else if (state === "enemy") {
        $(element).css("background-color", "red");
    }
    else if (state.includes("idle")) {
        $(element).css("background-color", "gray");
    }
}

$(document).ready(function () {
    var charArray = [
        new character("Obi-Wan Kenobi", 120, 10, 10, '#'),
        new character("Luke Skywalker", 100, 10, 10, '#'),
        new character("Darth Sideous", 150, 10, 10, '#'),
        new character("Darth Maul", 180, 10, 10, "#")
    ];

    var charContainerArray = $(".character-container");

    charContainerArray.each(function (index, element) {
        $(element).children(".character-name").text(charArray[index].getName());
        $(element).children(".character-photo").attr("src", "https://via.placeholder.com/100");
        $(element).children(".character-hp").text(charArray[index].getHP());
    });

    $(".character-container").on("click", function () {
        console.clear();
        let charIndex = $(this).attr("index");
        let charState = charArray[charIndex].getState();

        if (charState === "choose") {
            $(this).appendTo($("#character-select-container"));
            charArray[charIndex].changeState("player");

            colorUpdate($(this), charArray[charIndex].getState());
            //debug
            console.log(`${charArray[charIndex].getName()} New State: ${charArray[charIndex].getState()}`);

            $("#character-tray .character-container").each(function ({ }, element) {
                index = $(element).attr("index");

                $(element).appendTo($("#enemy-select-container"));
                charArray[index].changeState("enemy");
                colorUpdate(element, charArray[index].getState());

                console.log(`${charArray[$(element).attr("index")].getName()} new state is ${charArray[index].getState()}`);
            });
        }

        else if (charState === "enemy") {
            $(this).appendTo($("#defender-container"));
            charArray[charIndex].changeState("defender");

            $("#enemy-select-container .character-container").each(function ({ }, element) {
                index = $(element).attr("index");
                charArray[index].changeState("enemy idle");
                colorUpdate(element, charArray[index].getState());

                console.log(`${charArray[index].getName()} new state is ${charArray[index].getState()}`);
            });
        }
    });

    $("#attack-button").on("click", function () {
        let checkDefender = ($("#defender-container").childern().length !== 0);

        if(checkDefender) {
            let indexDef = $("#defender-container .character-container").attr("index"); // defender index
            let indexAtt = $("character-select-container .character-container").attr("index"); // attacker index

            let currentAttacker = charArray[indexAtt];
            let currentDefender = charArray[indexDef];
            initateAttack(currentAttacker, currentDefender);
        }

    })
});