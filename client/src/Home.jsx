import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <Link to="/about">Go to About Page</Link>
      <Link to="/contact">Go to Contact</Link>
    </div>
  );
}

export default Home;
