import CookieConsent from "react-cookie-consent";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeHeader from "../components/WelcomeHeader";
import { useState } from "react";

function BooksPage() {
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

export default BooksPage;
