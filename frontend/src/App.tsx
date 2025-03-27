import "./App.css";
import BookList from "./BookList";
import CookieConsent from "react-cookie-consent";
import CategoryFilter from "./CategoryFilter";
import WelcomeHeader from "./WelcomeHeader";
import { useState } from "react";
// import Fingerprint from "./Fingerprint";

function App() {
  //Making global functions
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container">
        <div className="row">
          <WelcomeHeader />
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      {/* <Fingerprint /> */}
    </>
  );
}

export default App;
