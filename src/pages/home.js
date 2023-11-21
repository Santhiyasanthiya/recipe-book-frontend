import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import "./styles/card.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = useGetUserID();

  useEffect(() => {
    // Fetches all the recipies
    const fetchReipes = async () => {
      try {
        const response = await axios.get("https://recipe-book-backend-umber.vercel.app/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetches the user saved recipe ID's
    const fetchSavedRecipies = async () => {
      try {
        const response = await axios.get(
          `https://recipe-book-backend-umber.vercel.app/recipes/savedRecipes/ids/${userID}`,
          {headers: {authorization: cookies.access_token}}
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };


    fetchReipes();
    fetchSavedRecipies();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://recipe-book-backend-umber.vercel.app/recipes", {
        userID,
        recipeID,
      }, {
        headers: {authorization : cookies.access_token}
      });
      setSavedRecipes(response.data.savedRecipes)
    } catch (error) {
      console.error(error);
    }
  };

  const viewRecipeButtonClick = (recipeID) => {
    navigate(`/viewRecipe/${recipeID}`);
  }

  const deleteRecipe = async (recipeID) => {

    console.log(recipeID)
    try {
      const response = await axios.delete(`https://recipe-book-backend-umber.vercel.app/recipes/${recipeID}`, {
        headers: {authorization : cookies.access_token}
      }).then((data)=>data.json())
      .then((mv)=>setRecipes(mv))
       
    } catch (error) {
      console.error(error);
    }

     
  };

 
  return (
    <div className="container">
      <h2 className="page-heading">Home</h2>
      <div className="card-container">
        {recipes.map((recipe) => (
          <div key={recipe._id}>
            <div className="card">
              <div className="card-body">
                <img
                  className="card-image"
                  src={recipe.imageUrl}
                  alt={recipe.alt}
                />
                <h2 className="card-title">{recipe.name}</h2>
           
                
                {cookies.access_token && savedRecipes.includes(recipe._id) ? (
                  <h6 className="saved-heading">
                    Saved <i className="fa-solid fa-check fa-fade"></i>
                  </h6>
                ) : cookies.access_token? (
                  <button
                    className="card-button-save"
                    onClick={() => saveRecipe(recipe._id)}
                  >
                    Save
                  </button>
                ) : null}

                <div className="card-description">{recipe.description}</div>
                <div className="cooking-time">
                  Cooking time : {recipe.cookingTime} Minutes
                </div>
              </div>
              {/* <button className="card-button" onClick={ () => viewRecipeButtonClick(recipe._id)}>View Recipe</button> */}
              <div className="btns">
              <button type="button" class="btn btn-primary" onClick={()=>navigate(`/update-recipes/${recipe._id}`)}>Edit</button>
                <button type="button" class="btn btn-danger" onClick={()=>deleteRecipe(`${recipe._id}`)}>Delete</button>
              </div>
              
              <button type="button" class="btn btn-dark" className="card-button" onClick={ () => viewRecipeButtonClick(recipe._id)}>View Recipe</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};