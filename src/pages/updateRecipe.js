import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SavedRecipes } from './saved-recipes';


import { useGetUserID } from '../hooks/useGetUserID'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./styles/create-recipe.css";
import { useCookies } from 'react-cookie';
import {API} from "../config.js"


export function EditRecipe(){
    const {recipeID} = useParams();
    console.log(recipeID)
    
    const [savedRecipes, setSavedRecipes] = useState(null);

    


    useEffect(() => {
        const fetchRecipes = async () => {
     
            const response = await axios.get(
              `https://recipe-book-backend-umber.vercel.app/recipes/${recipeID}`, {
               
              }
            );

            console.log("response",response.data)

            setSavedRecipes(response.data);
           
      
        };
    
        fetchRecipes();
      }, []); 
  
      console.log(savedRecipes)
      return(
        <div>
            {savedRecipes ? <UpdateRecipe savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes}/> : "Loading..."}
        </div>
      )

}



export default function UpdateRecipe({savedRecipes,setSavedRecipes}) {
    console.log(savedRecipes)
    console.log(savedRecipes.name)
    const userID = useGetUserID();
    const navigate = useNavigate();

    const [cookies, _] = useCookies(["access_token"]);


    const [recipe, setRecipe] = useState({
        name: savedRecipes.name,
        ingredients: savedRecipes.ingredients,
        description: savedRecipes.description,
        instructions: savedRecipes.instructions,
        imageUrl: savedRecipes.imageUrl,
        cookingTime: savedRecipes.cookingTime,
        userOwner: userID
    });

   

    const handleChange = (event) => {

        const {name, value} = event.target;
        setRecipe({ ...recipe, [name]: value });

        
         console.log(recipe)
    }

  
    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    }

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({ ...recipe, ingredients });
    }

    const onSubmit = async (event) => {

        console.log("event",event)
        event.preventDefault();

    
          let res = await axios.put(`https://recipe-book-backend-umber.vercel.app/recipes/${savedRecipes._id}`, recipe, {
                headers: { authorization: cookies.access_token }
            })
            alert("Recipe Updated");

            console.log(res)
            navigate("/home")

    }

  return (
    <div className="container">
    <h2 className="page-heading">Edit Recipe</h2>

    <form className='create-recipe-form' onSubmit={onSubmit}>
        <div className="input-details">
            <div className="input-box">
                <span className="details">Recipe Name</span>
                <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    value={recipe.name}
                    placeholder="Enter recipe name" 
                    onChange={handleChange}
                />
            </div>

            <div className="input-box">
                <span className="details">Ingredients</span>

                {recipe.ingredients.map((ingredient, index) => (
                    <div className='details' key={index}>
                    <input 
                        type='text' 
                        name='ingredient' 
                        value={ingredient}
                        placeholder= {"Ingredient " + (index + 1)}
                        onChange={(event) => handleIngredientChange(event, index)}
                    />
                    </div>
                ))}

                <div className="button">
                <button type='button' onClick={addIngredient}>Add Ingredient</button>
                </div>
            </div>

            <div className="input-box">
                <span className="details">Mini Description</span>
                <input 
                    id="description" 
                    name="description" 
                    type="text" 
                    value={recipe.description}
                    placeholder="Enter a mini description" 
                    onChange={handleChange}
                />
            </div>

            <div className="input-box">
                <span className="details">Instructions</span>
                <textarea 
                    name="instructions" 
                    id="instructions" 
                    cols="30" 
                    rows="10" 
                    value={recipe.instructions}
                    placeholder="Enter the steps" 
                    onChange={handleChange}>
                </textarea>
            </div>

            <div className="input-box">
                <span className="details">Image URL</span>
                <input 
                    id="imageUrl" 
                    name="imageUrl" 
                    type="text" 
                    value={recipe.imageUrl}
                    placeholder="Copy paste the image url" 
                    onChange={handleChange}
                />
            </div>

            <div className="input-box">
                <span className="details">Cooking Time (minutes)</span>
                <input 
                    id="cookingTime" 
                    name="cookingTime" 
                    type="text" placeholder="Enter cooking time in minutes"
                    value={recipe.cookingTime}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="button">
            <button type='submit'>Update Recipe</button>
        </div>
    </form>
    <div className='spacer'>Space to the footer </div>
</div>

  )
}