var foodChoices = ["Pancakes", "Fried rice", "Bread and egg", "Cereal", "Indomie", "Beans", "PB&J sandwiches", "Rice and stew"]

function generateRandomFood() {
    var randomIndex = Math.floor(Math.random()*foodChoices.length);
    document.getElementById("food-choice").innerHTML = foodChoices[randomIndex]
}