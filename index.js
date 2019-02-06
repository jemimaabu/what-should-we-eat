var foodChoiceInput = document.getElementById("user-food-choice");
var displayFoodChoice = document.getElementById("display-food-choice");
var errorMessage = document.getElementById("form-error");
var foodChosen = document.getElementById("food-choice");
var lTable = document.getElementById("loginTable");

//Variable to detect how many times a user has generated a random food choice
var foodCount = 0;

//Array containing initial food choices
var foodChoices =  ["Yam and egg", "Jollof rice", "Bread and egg", "Cereal", "Indomie", "Beans", "Efo riro", "Ofada rice and stew"];

/*
   saving data in case user refreshes or leaves
    page
*/

let obj = localStorage.getItem('localFoodChoices') ? JSON.parse(localStorage.getItem('localFoodChoices')) : [];

//This shows the default values first
localStorage.setItem('localFoodChoices', JSON.stringify(foodChoices));

localStorage.setItem('localFoodChoices', JSON.stringify(obj));

// Display the choices in initial food choices     
obj.map(food => updateFoodChoices(food));

lTable.style.visibility = "hidden"

// Function to display added food choices
function updateFoodChoices(food) 
{
    let listItem = document.createElement("li");
    let btn = document.createElement("button");
    let icon = document.createElement("i");

    icon.classList.add("fas");
    icon.classList.add("fa-minus");
    btn.appendChild(icon);   
   
    listItem.textContent = food;
    listItem.appendChild(btn);

    btn.addEventListener("click", deleteFoodChoice);
    displayFoodChoice.appendChild(listItem);   
}   

function addFoodChoice() 
{

    if (foodChoiceInput.value === "") {
        errorMessage.innerHTML = "Input cannot be empty"
    } else if (foodChoices.includes(foodChoiceInput.value)) {
        errorMessage.innerHTML = "Cannot include duplicate item"
    } else {
        errorMessage.innerHTML = "";
        foodCount = 0;
        let food  = foodChoiceInput.value;        
        updateFoodChoices(food);
        foodChoiceInput.value="";
        foodChoices.push(food);
        obj.push(food);
        localStorage.setItem('localFoodChoices', JSON.stringify(obj));
    }
}
        
// Allow food choice to be added if Enter key is pressed in the input
foodChoiceInput.onkeydown = function(event){
    if (event.which == 13 || event.keyCode == 13) {
        addFoodChoice()
        return false;
    }
    return true;
};

// function deleteFoodChoice(e) {
//     var index = foodChoices.indexOf(e.innerText);
//     if (index >= 0) {
//         foodChoices.splice(index, 1);
//         displayFoodChoice.removeChild(displayFoodChoice.children[index]);
//     }
// }


function deleteFoodChoice(e)
{
    console.log("clicked");
    //Chrome was misbehaving when i use only d first one 
    let food = e.target.parentElement.textContent || e.target.parentElement.parentElement.textContent  ;
    console.log(e.target.parentElement.parentElement);
    
    console.log(food);
    let index = obj.indexOf(food);
    if( index > -1)
    {        
        //No need for this anymore
        // foodChoices.splice(index, 1);
        obj.splice(index, 1);
        console.log("removed"); 
        displayFoodChoice.removeChild(displayFoodChoice.children[index]);
        localStorage.setItem('localFoodChoices', JSON.stringify(obj));
    }

}

function generateRandomFood() {
    if (obj.length === 0) {
        errorMessage.innerHTML = "Can't choose if there's nothing to choose from"
    } else if (obj.length === 1) {
        errorMessage.innerHTML = "It's not very random if you only have one option"
    } else {
        foodCount++;
        // Condition to ensure user can only generate random food once
        if (foodCount <= 1) {
            lTable.style.visibility = "visible";
            errorMessage.innerHTML = "";
            var randomIndex = Math.floor(Math.random()*obj.length);
            foodChosen.innerHTML = obj[randomIndex];
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
