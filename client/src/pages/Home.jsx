import { NavLink } from "react-router-dom"

function Home() {
  
  return (
    <>
      <main>
      <div className="absolute right-0 top-0 food-image-home w-[50%] max-w-[700px] h-[600px]">
      </div>
      <div className="w-[50%] text-right px-9">
        <h1 className="text-6xl lato-black mb-2 mt-5">Fewer Calories <br/> And More<br/> Benefit</h1>
        <h2 className="text-2xl lato-bold mb-2">
          Your smart companion on the journey <br/> to healthy living and delicious nutrition.
        </h2>
        <p className="mb-2 lato-regular text-lg pl-8">
          At YummyFit, we believe that eating well shouldn’t be a challenge!
          <br/>it should be a pleasure. <br/>That’s why we’ve created a platform that brings together smart technology, expert-backed nutrition advice, and thousands of healthy, mouth-watering recipes, all in one place.
        </p>
        <div className="flex justify-end mt-4">
          <NavLink to={'/login'} className="yummy-btn cursor-pointer hover:bg-[#45a049] px-6 py-2 mt-4 lato-bold text-lg">
            Get Started
          </NavLink>
          <NavLink to={'/about'} className="yummy-btn cursor-pointer hover:bg-[#e53935] px-6 py-2 mt-4 lato-bold text-lg ml-20">
            Learn More
          </NavLink>
        </div>
      </div>
    </main>
    <footer>

    </footer>
  </>
    
  )
}

export default Home