
//Takes the length for the password from the user.
var getPasswordLength = function () {
    var passwordLength = prompt("Choose a password length between 8 and 128 characters.");
    if (isNaN(passwordLength)) {
        alert("That is not a number.");
        getPasswordLength();
    } else if (passwordLength < 8 || passwordLength > 128) {
        alert("Incorrect password length.");
        getPasswordLength();
    } else {
        return passwordLength;
    }
};

//Takes the types of characters the user wants in their password.
//Repeated numbers for higher chances of appearing when chosen.
var chooseSets = function () {
    var characters = [
        { name: "lowercase", set: "abcdefghijklmnopqrstuvwxyz" },
        { name: "uppercase", set: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
        { name: "numbers", set: "012345678901234567890123456789" },
        { name: "special characters", set: "!\"#$%&'()*+,-./:;<=>?@[]\\^_`{|}~" },
    ];

    var isLower = confirm("Do you need lowercase letters?");
    var isUpper = confirm("Do you need uppercase letters?");
    var isNumeric = confirm("Do you need numbers?");
    var isSpecialChar = confirm("Do you need special characters?");

    var chosenSets = "";
    var chosenSetsNames = [];

    if (isLower) {
        chosenSets += characters[0].set;
        chosenSetsNames.push(characters[0].name);
    }
    if (isUpper) {
        chosenSets += characters[1].set;
        chosenSetsNames.push(characters[1].name);
    }
    if (isNumeric) {
        chosenSets += characters[2].set;
        chosenSetsNames.push(characters[2].name);
    }
    if (isSpecialChar) {
        chosenSets += characters[3].set;
        chosenSetsNames.push(characters[3].name);
    }
    //Makes sure there is at least one type of character for the password.
    if (chosenSets) {
        //Creates the confirmation message.
        var middleString = "";
        if (chosenSetsNames.length > 1) {
            for (i = 0; i < chosenSetsNames.length; i++) {
                if (i === chosenSetsNames.length - 1) {
                    middleString += "and " + chosenSetsNames[i];
                } else {
                    middleString += chosenSetsNames[i] + ", ";
                }
            }
        } else {
            middleString = chosenSetsNames[0];
        }

        var confirmChoices = confirm("You chose " + middleString + ". Would you like to proceed?");

        if (confirmChoices) {
            return chosenSets;
        } else {
            chooseSets();
        }
    } else {
        alert("Choose at least one set of characters.");
        chooseSets();
    }
};

//Generates the password with the length and sets given before.
var generatePassword = function () {
    var password = "";
    var passwordLength = getPasswordLength();
    var chosenSets = chooseSets();

    for (i = 0; i < passwordLength; i++) {
        password += chosenSets.charAt(Math.floor(Math.random() * chosenSets.length));
    }

    return password;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
