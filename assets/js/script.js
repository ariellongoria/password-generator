// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
//
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password

// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters

// WHEN prompted for character types to include in the password
// THEN I choose lowercase, uppercase, numeric, and/or special characters

// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected

// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria

// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

// Assignment code here

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

var chooseSets = function () {
    var characters = [
        { name: "lowercase", set: "abcdefghijklmnopqrstuvwxyz" },
        { name: "uppercase", set: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
        { name: "numbers", set: "0123456789" },
        { name: "special characters", set: "!\"#$%&'()*+,-./:;<=>?@[]\\^_`{|}~" },
    ];

    var isLower = confirm("Do you need lowercase letters?");
    var isUpper = confirm("Do you need uppercase letters?");
    var isNumeric = confirm("Do you need numbers?");
    var isSpecialChar = confirm("Do you need special characters?");

    var chosenSets = '';
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

    var middleString = '';
    for (i = 0; i < chosenSetsNames.length; i++) {
        if (i === chosenSetsNames.length - 1) {
            middleString += "and " + chosenSetsNames[i];
        } else {
            middleString += chosenSetsNames[i] + ", ";
        }
    }

    var confirmChoices = confirm("You chose " + middleString + ". Would you like to proceed?");

    if (confirmChoices) {
        return chosenSets;
    } else {
        chooseSets();
    }
};

var generatePassword = function () {
    var password = '';
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
