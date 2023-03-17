const searchBtn=document.getElementById("search-btn")
const mealList=document.getElementById("meal")
const mealDetailsContent=document.querySelector(".meal-details-content")
const recipeCloseBtn=document.getElementById("recipe-close-btn")
const input=document.getElementById("search-input")
/*const id="6ef6ee80"
const key="5b853600e6419ea60f22a09be63286bc"*/

//event listeners

//enter is send
input.addEventListener("keypress", (event)=>{
    if(event.key ==="Enter"){
        //cancel the default action if needed
        event.preventDefault();
        //trigger the button element with a click
        searchBtn.click()
    }
})

searchBtn.addEventListener("click", getMealList)
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//get meal list that corresponds to the ingredient
function getMealList(){
    let searchInputText=document.getElementById("search-input").value.trim()

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response =>response.json())
    .then(data =>{
        let html=""
        if(data.meals){
            data.meals.forEach(meal =>{
                html+=`
                <div class="meal-item" data-id=${meal.idMeal}>
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food pic">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>`
            })
        }
        else{
            html='Sorry, no meal found ☹. Please try using another ingredient name.' 
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    })
}

//get meal recipe
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
