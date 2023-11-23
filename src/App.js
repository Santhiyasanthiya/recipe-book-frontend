import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

import { Home } from "./pages/home";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Auth } from "./pages/auth";
import { Signup } from "./pages/signup";
import { ViewRecipe } from "./pages/viewRecipe";

import "./pages/styles/common.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateRecipe, { EditRecipe } from "./pages/updateRecipe";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-recipe"
            element={
              <ProtectedRoute>
                <CreateRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-recipes"
            element={
              <ProtectedRoute>
                <SavedRecipes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewRecipe/:recipeID?"
            element={
              <ProtectedRoute>
                <ViewRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-recipes/:recipeID"
            element={
              <ProtectedRoute>
                <EditRecipe />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
