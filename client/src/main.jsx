import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FoodContextProvider from "./context/foodContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import CommentContextProvider from "./context/commentContext.jsx";
import LanguageProvider from "./context/LanguageContext.jsx";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthContextProvider>
          <CommentContextProvider>
            <FoodContextProvider>
              <App />
            </FoodContextProvider>
          </CommentContextProvider>
        </AuthContextProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
