import { FoodContext } from "../context/foodContext"
import { useContext,useEffect } from "react"
import { useParams } from "react-router-dom"
import strawberry from "../assets/images/strawberries.png"

function RecipeDetail() {
    const { id } = useParams();
    const { food, loading} = useContext(FoodContext);
    const foodItem = food?.find(item => item.id === parseInt(id));

    const toFixed = (value) => {
        return Number(value).toFixed(1);
    }

    function cleanAndLimitHtml(htmlString, sentenceLimit = 6) {

        const sentences = htmlString.match(/[^.!?]+[.!?]/g) || [];
        const limitedSentences = sentences.slice(0, sentenceLimit).join(' ');
        return limitedSentences;
    }

    const proteinPercent = foodItem?.nutrition?.caloricBreakdown?.percentProtein || 0;
    const carbsPercent = foodItem?.nutrition?.caloricBreakdown?.percentCarbs || 0;
    const bg = `conic-gradient(
        #ef4444 0% ${carbsPercent}%,
        #3b82f6 ${carbsPercent}% ${carbsPercent + proteinPercent}%,
        #f59e0b ${carbsPercent + proteinPercent}% 100%
      )`;
    
  return (
    <div>
        {loading && <p>Loading...</p>}
        <div className="recipe-image mt-13 mx-auto w-[70%] shadow-2xl rounded-xl relative">
            <img src={foodItem?.image} alt={foodItem?.title}
                 className="w-full h-[400px] object-cover rounded-xl" />
                {/* <img src={strawberry} alt="strawberry" className="absolute bottom-0 -left-[50px] h-[100px]" /> */}
        </div>
        <div className="recipe-details w-[90%] mx-auto flex justify-between items-start py-10">
            <div className="w-[60%] pr-15">
                <h1 className="text-5xl font-bold mb-7">{foodItem?.title}</h1>
                <div className="text-xl text-justify" dangerouslySetInnerHTML={{__html: cleanAndLimitHtml(foodItem?.summary) }} />
                <div className="food-types pt-5">
                    <ul className="list-none ml-6 flex">
                        {foodItem?.dishTypes.map((type, index) => (
                            <li key={index} className="px-3 py-1 shadow-2xl rounded-2xl border-1 border-[#fff] bg-[#f3fffa]">{type}</li>
                        ))}
                        
                    </ul>
                </div>
                <div className="rating flex items-center mt-4">
                    <span className="text-lg ml-2">{foodItem?.spoonacularScore}</span>
                </div>
                
            </div>
            <div className="recipe-nutritionInfo bg-[#f3fffa] w-[40%] text-xl flex justify-between items-center shadow-xl p-6 border-2 border-[#333d25] rounded-xl">
                <div className="w-[50%] pr-2">
                    <div className="nutrition-detail flex justify-between items-center pb-2">
                        <h3><span className="text-xs">🔴</span> Net Carbs: </h3>
                        <p>
                            {toFixed(foodItem?.nutrition?.nutrients[4]?.amount)} g
                        </p>
                    </div>
                    <div className="nutrition-detail flex justify-between text-[#888] pl-[20px] pb-2">
                        <h3>Fiber: </h3>
                        <p>
                        {toFixed(foodItem?.nutrition?.nutrients?.[21]?.amount)} g
                        </p>
                    </div>
                    <div className="nutrition-detail flex justify-between text-[#888] pl-[20px] pb-2 border-b-1 border-b-[#b4b4b4]">
                        <h3>Total Carbs: </h3>
                        <p>
                        {toFixed(foodItem?.nutrition?.nutrients[4]?.amount + foodItem?.nutrition?.nutrients[21]?.amount)} g
                        </p>
                    </div>
                    <div className="nutrition-detail flex justify-between border-b-1 border-b-[#b4b4b4] py-2">
                        <h3><span className="text-xs">🔵</span> Protein: </h3>
                        <p>
                            {toFixed(foodItem?.nutrition?.nutrients[10]?.amount)} g
                        </p>
                    </div>
                    <div className="nutrition-detail flex justify-between pt-2">
                        <h3><span className="text-xs">🟡</span> Fats: </h3>
                        <p>
                            {toFixed(foodItem?.nutrition?.nutrients[1]?.amount)} g
                        </p>
                    </div>
                </div>
                
                <div className="recipe-chart">
                    <div className="w-40 h-40 rounded-full relative" style={{ background: bg }}>
                        <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-lg font-bold">{toFixed(foodItem?.nutrition?.nutrients[0]?.amount)}</div>
                                <div className="text-gray-500">cals</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="ingredients bg-white rounded-3xl shadow-2xl p-4 w-[90%] mx-auto py-10">
            <h2 className="text-3xl font-bold mb-5">Ingredients</h2>
            <ul className="list-none pl-5 flex items-center gap-3 flex-wrap">
                {foodItem?.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="mb-2 px-3 py-1 text-center">
                        <div className="text-[#333d25] font-bold">{ingredient.name}</div>
                        <div className="h-[105px] flex items-center justify-center">
                        <img src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`} 
                            alt={ingredient.name} className="inline-block" />
                        </div>
                        <div className="text-[#333d25] text-sm">{ingredient.amount} {ingredient.unit}</div>
                    </li>
                ))}
            </ul>
        </div>
        <div className="recipe-steps w-[90%] mx-auto py-10">
            <h2 className="text-3xl font-bold mb-5">Cooking Steps</h2>
            <ul className="list-none pl-5 flex flex-col gap-4">
                {foodItem?.analyzedInstructions[0]?.steps.map((step, index) => (
                    <li key={index} className="mb-2 p-4 rounded-xl bg-[#e3f5ed] shadow-xl">
                        <div className="text-[#333d25] font-bold text-lg pb-2">Step {index + 1}</div>
                        <div className="text-[#333d25] text-center text-lg">{step.step}</div>
                    </li>
                ))}
            </ul>
        </div>
        
        
    </div>
  )
}

export default RecipeDetail