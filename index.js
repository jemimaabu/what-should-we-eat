var foodChoiceInput = document.getElementById("user-food-choice");
var displayFoodChoice = document.getElementById("display-food-choice");
var errorMessage = document.getElementById("form-error");

//Array containing inappropriate input words because isn't vulgarity just hilarious
var inappropriate = ["fuck","ass","booty","dick","pussy","cock","penis","vagina","cunt","butt"]

//Array containing initial food choices
var foodChoices = ["Pancakes", "Fried rice", "Bread and egg", "Cereal", "Indomie", "Beans", "PB&J sandwiches", "Rice and stew"]

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
    } else if (inappropriate.includes(foodChoiceInput.value.toLowerCase())) {
        errorMessage.innerHTML = "Haha, very funny."
    } else {
        errorMessage.innerHTML = "";;
        updateFoodChoices(foodChoiceInput.value);
        foodChoices.push(foodChoiceInput.value);
        foodChoiceInput.value="";
    }
}

function deleteFoodChoice(e) {
    var index = foodChoices.indexOf(e.innerText);
    if (index >= 0) {
        foodChoices.splice(index, 1);
        displayFoodChoice.removeChild(displayFoodChoice.children[index]);
    }
}

function generateRandomFood() {
    var randomIndex = Math.floor(Math.random()*foodChoices.length);
    document.getElementById("food-choice").innerHTML = foodChoices[randomIndex]
}
