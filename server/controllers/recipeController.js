import asyncHandler from "../utils/asyncHandler.js";
import { CustomError } from "../utils/errorHandler.js";
import Recipe from "../schemas/recipeSchema.js";

export const getRecipes = asyncHandler(async(req,res) => {
    const recipes = await Recipe.find();

    if (!recipes)
        throw new CustomError("recipes not found", 404);

    res.status(200).json(recipes);
})

export const getRecipeById = asyncHandler(async(req,res) => {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId).populate("userId", "username email");

    if (!recipe)
        throw new CustomError("recipe not found", 404);

    res.status(200).json(recipe);
})

export const createRecipe = asyncHandler(async(req,res) => {
    const {title, description,image, ingredients,steps,calories,prep_time,cook_time,carbs, fat, protein, food_type, diets,cuisine_type} = req.body;
    // const userId = req.user.id;

    const existingRecipe = await Recipe.findOne({title: title});
    
    if (existingRecipe)
        throw new CustomError("recipe already exists", 400);
    
    const newRecipe = new Recipe({
        title,
        description,
        image,
        ingredients,
        steps,
        calories,
        prep_time,
        cook_time,
        // userId,
        carbs,
        fat,
        protein,
        food_type,
        diets,
        cuisine_type,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
})

export const updateRecipe = asyncHandler(async(req,res) => {
    const recipeId = req.params.id;
    const update = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, update,
        {new: true}).populate("userId", "username email");

    if (!updatedRecipe)
        throw new CustomError("recipe not found", 404);

    res.status(200).json(updatedRecipe);
})

export const deleteRecipe = asyncHandler(async(req,res) => {
    const recipeId = req.params.id;

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe)
        throw new CustomError("recipe not found", 404);

    res.status(200).json({message: "recipe deleted successfully"});
})