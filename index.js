var foodChoiceInput = document.getElementById("user-food-choice");
var displayFoodChoice = document.getElementById("display-food-choice");
var errorMessage = document.getElementById("form-error");
var foodChosen = document.getElementById("food-choice");

//Variable to detect how many times a user has generated a random food choice
var foodCount = 0;

//Array containing initial food choices
var foodChoices = ["Yam and egg", "Jollof rice", "Bread and egg", "Cereal", "Indomie", "Beans", "Efo riro", "Ofada rice and stew"]

// Function to display added food choices
function updateFoodChoices(food) {
    var span = document.createElement("span")
    span.innerHTML = food;
    var click = document.createAttribute("onclick");
    click.value = "deleteFoodChoice(this)";
    span.setAttributeNode(click);
    displayFoodChoice.appendChild(span);
}

// Display the choices in initial food choices 
foodChoices.map(food => updateFoodChoices(food))

function addFoodChoice() {
    if (foodChoiceInput.value === "") {
        errorMessage.innerHTML = "Input cannot be empty"
    } else if (foodChoices.includes(foodChoiceInput.value)) {
        errorMessage.innerHTML = "Cannot include duplicate item"
    } else {
        errorMessage.innerHTML = "";
        foodCount = 0;
        updateFoodChoices(foodChoiceInput.value);
        foodChoices.push(foodChoiceInput.value);
        foodChoiceInput.value="";
    }
}

// Allow food choice to be added if Enter key is pressed in the input
foodChoiceInput.onkeypress = function(event){
    if (event.which == 13 || event.keyCode == 13) {
        addFoodChoice()
        return false;
    }
    return true;
};

function deleteFoodChoice(e) {
    var index = foodChoices.indexOf(e.innerText);
    if (index >= 0) {
        foodChoices.splice(index, 1);
        displayFoodChoice.removeChild(displayFoodChoice.children[index]);
    }
}

function generateRandomFood() {
    if (foodChoices.length === 0) {
        errorMessage.innerHTML = "Can't choose if there's nothing to choose from"
    } else if (foodChoices.length === 1) {
        errorMessage.innerHTML = "It's not very random if you only have one option"
    } else {
        foodCount++;
        // Condition to ensure user can only generate random food once
        if (foodCount <= 1) {
            errorMessage.innerHTML = "";
            var randomIndex = Math.floor(Math.random()*foodChoices.length);
            foodChosen.innerHTML = foodChoices[randomIndex];
            renderSuggestedLinks();
        } else {
            errorMessage.innerHTML = "Sorry, no takebacks. It wouldn't be very random if you could just keep clicking. Enjoy your meal!"
        }

    }
}

function renderSuggestedLinks() {
    var recipesLink = document.getElementById('recipes-link');
    var restaurants = document.getElementById('restaurants-link');
    recipesLink.innerHTML = `${foodChosen.innerText} recipes`;
    recipesLink.href = `https://www.google.com/search?q=${foodChosen.innerText.toLowerCase().replace(/[^a-zA-Z]/g,"+")}+recipes`;
    restaurants.innerHTML = `Places that have ${foodChosen.innerText} near you`;
    restaurants.href = `https://www.google.com/search?q=${foodChosen.innerText.toLowerCase().replace(/[^a-zA-Z]/g,"+")}+near+me`;
}
