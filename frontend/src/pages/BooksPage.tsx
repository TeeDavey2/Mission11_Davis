import CookieConsent from "react-cookie-consent";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeHeader from "../components/WelcomeHeader";
import { useState } from "react";
import CartSummary from "../components/CartSummary";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <CartSummary />
      <WelcomeHeader />
      {/* BOOTSTRAP GRID */}
      <div className="row">
        {/* CATEGORY FILTER */}
        <div className="col-md-3 col-lg-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* DISPLAYING THE BOOK LIST */}
        <div className="col-md-9 col-lg-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>

      {/* COOKIES FROM WELLS' CLASS */}
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      {/* <Fingerprint /> */}
    </>
  );
}

export default BooksPage;
