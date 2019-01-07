var foodChoices = ["Pancakes", "Fried rice", "Bread and egg", "Cereal", "Indomie", "Beans", "PB&J sandwiches", "Rice and stew"]
var foodChoiceInput = document.getElementById("user-food-choice");
var displayFoodChoice = document.getElementById("display-food-choice");
var errorMessage = document.getElementById("form-error");

function updateFoodChoices() {
    displayFoodChoice.innerHTML = foodChoices.map((food,i) => `<span id="foodchoice-${i}">${food}</span>`)
}
updateFoodChoices();

function generateRandomFood() {
    var randomIndex = Math.floor(Math.random()*foodChoices.length);
    document.getElementById("food-choice").innerHTML = foodChoices[randomIndex]
}

function addFoodChoice() {
    if (foodChoiceInput.value === "") {
        errorMessage.innerHTML = "Input cannot be empty"
    } else if (foodChoices.includes(foodChoiceInput.value)) {
        errorMessage.innerHTML = "Cannot include duplicate item"
    } else {
        errorMessage.innerHTML = "";
        foodChoices.push(foodChoiceInput.value);
        foodChoiceInput.value="";
        updateFoodChoices();
    }
}
