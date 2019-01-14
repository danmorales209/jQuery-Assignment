// JS for functionality

class character {
    constructor(inputName, inputHP, inputAttack, inputCounter, img) {
        this.name = inputName;
        this.initalHP = inputHP;
        this.currentHP = this.initalHP;
        this.attackPower = inputAttack;
        this.counterPower = inputCounter;
        this.multiplier = 1;
        this.isAlive = true;
        this.state = "choose";
        this.imgPath = `assets\\images\\${img}.png`;

    };

    //Methods

    // pass a character object
    attack(defender) {
        let damage = this.attackPower * this.multiplier;

        defender.currentHP -= (damage);
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
    };

    getAlive() {
        return this.isAlive;
    };

    changeState(newState) {
        this.state = newState;
    };

    flipAlive() {
        this.isAlive = !(this.isAlive);
    };

    checkCharacter() {
        if (this.currentHP <= 0) {
            this.changeState("defeated");
            this.flipAlive();
        }
    };

    reset() {
        this.currentHP = this.initalHP;
        this.multiplier = 1;
        this.state = "choose";
        this.isAlive = true;
        this.currentHP = this.initalHP;
    };


};

function initateAttack(attacker, defender) {

    $("#attack-message").text(attacker.attack(defender));
    defender.checkCharacter();
    updateCharacterDisplay(defender);
    if (!defender.getAlive()) { return; }

    $("#defend-message").text(defender.defend(attacker));
    attacker.checkCharacter();
    updateCharacterDisplay(attacker);
};

function colorUpdate(element, state) {

    if (state === "choose") {
        $(element).css("background-color", "white");
    }
    else if (state === "player") {
        $(element).css("background-color", "green");
    }
    else if (state === "enemy") {
        $(element).css("background-color", "red");
    }
    else if (state.includes("idle")) {
        $(element).css("background-color", "gray");
    }
    else if (state === "defeated") {
        $(element).css({ "background-color": "black", "color": "white" });
    }
}

function updateCharacterDisplay(character) {
    if (character.getState() === "player") {
        $("#character-select-container .character-container .character-hp").text(character.getHP());
    }
    else if (character.getState() === "defender") {
        $("#defender-container .character-container .character-hp").text(character.getHP());
    }
}

function updateGame(character) {
    if (!character.getAlive) {
        if (character.getState() === "player") {

        }
    }
}

$(document).ready(function () {
    // delete after debug
    function debugHP() {
        for (let i = 0; i < charArray.length; i++) {
            console.log(charArray[i].getHP());
        }
    }

    var charArray = [
        new character("Obi-Wan Kenobi", 120, 10, 10, '#'),
        new character("Luke Skywalker", 100, 10, 10, '#'),
        new character("Darth Sideous", 150, 10, 10, '#'),
        new character("Darth Maul", 180, 10, 100, "#")
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
        console.log(charState);

        if (charState === "choose") {
            $(this).appendTo($("#character-select-container"));
            charArray[charIndex].changeState("player");

            colorUpdate($(this), charArray[charIndex].getState());

            $("#character-tray .character-container").each(function ({ }, element) {
                let index = $(element).attr("index");

                $(element).appendTo($("#enemy-select-container"));
                charArray[index].changeState("enemy");
                colorUpdate(element, "enemy");

                console.log(`${charArray[$(element).attr("index")].getName()} new state is ${charArray[index].getState()}`);
            });
        }

        else if (charState === "enemy") {
            $(this).appendTo($("#defender-container"));
            charArray[charIndex].changeState("defender");

            $("#enemy-select-container .character-container").each(function ({ }, element) {
                let index = $(element).attr("index");
                charArray[index].changeState("enemy idle");
                colorUpdate(element, charArray[index].getState());

                console.log(`${charArray[index].getName()} new state is ${charArray[index].getState()}`);
            });
        }
    });

    $("#attack-button").on("click", function () {
        let checkDefender = ($("#defender-container").children().length !== 0);
        let playerIndex = $("#character-select-container .character-container").attr("index");

        if (checkDefender && charArray[playerIndex].getAlive()) {
            let indexDef = $("#defender-container .character-container").attr("index"); // defender index
            let indexAtt = $("#character-select-container .character-container").attr("index"); // attacker index

            let currentAttacker = charArray[indexAtt];
            let currentDefender = charArray[indexDef];

            initateAttack(currentAttacker, currentDefender);

            console.log(currentAttacker.getAlive())

            if (!currentDefender.getAlive()) {
                $("#defender-container .character-container").prependTo($("#defeated-container")).css("display", "none");

                $("#enemy-select-container .character-container").each(function ({ }, element) {
                    let index = $(element).attr("index");
                    charArray[index].changeState("enemy");
                    colorUpdate(element, charArray[index].getState());
                });

                $("#game-result-message").text(`${currentDefender.getName()} has been defeated. Click on another enemy to continue.`)
            }
            else if (!currentAttacker.getAlive()) {

                colorUpdate($("#character-select-container .character-container"), "defeated");
                $("#character-select-container .character-container .character-hp").text(0);
                $("#reset-button").css("display", "inline-block");
                $("#game-result-message").text(`${currentAttacker.getName()} has been defeated. Press reset to start again.`);
            }
        }

    });

    $("#reset-button").on("click", function () {

        for (let i = 0; i < charArray.length; i++) {
            charArray[i].reset();

        }

        $(".character-container").appendTo("#character-tray").css({ "color": "black", "display": "inline-block" });
        $(".character-container").each(function (index, element) {
            colorUpdate($(element), "choose");
            $(element).children(".character-hp").text(charArray[index].getHP());
        });
        $("#reset-button").css("display", "none");
        $("#attack-message, #defend-message, #game-result-message").text("");
    });
});