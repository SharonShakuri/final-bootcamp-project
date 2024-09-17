import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { PriceFilter } from "./components/Fillters/PriceFillter/PriceFillter";
import { Fillters } from "./components/Fillters/Fillters/Fillters";
import { RatingFillter } from "./components/Fillters/RatingFillter/RatingFillter";
import { SignUp } from "./components/SignUp/SignUp";
import { SignIn } from "./components/SignIn/SignIn";
import { SearchFilter } from "./components/Fillters/SearchFillter/SearchFillter";
import { Footer } from "./components/Footer/Footer";
import Navbar from "./components/Navbar/NavBar";
import { HotelPage } from "./user/pages/HotelPage/HotelPage";
import { HotelCard } from "./components/HotelCard/HotelCard";
import { Blog } from "./pages/Blog/Blog";
import { PersonalDetailsPage } from "./user/pages/PersonalDetails/PersonalDetailsPage";
import { OrderConfirmationCard } from "./components/OrderConfirmationCard/OrderConfirmationCard";
import { Rooms } from "./components/Rooms/Rooms";
import { ExamplePage } from "./pages/ExamplePage";
import Map from "./components/Map/Map";
import { Hotelexample } from "./user/pages/HotelPage/Hotelexample";
import { AllFilter } from "./components/Fillters/AllFilter/AllFilter";
import { TransactionPage } from "./user/pages/TransactionPage/TransactionPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm" element={<OrderConfirmationCard />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/cards" element={<HotelCard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pricefilter" element={<PriceFilter />} />
        <Route path="/filters" element={<Fillters />} />
        <Route path="/ratingfilter" element={<RatingFillter />} />
        <Route path="/hotelpage" element={<HotelPage />} />
        <Route path="/hotelpage/:hotelId" element={<HotelPage />} />
        <Route
          path="/personaldetails/:hotelId"
          element={<PersonalDetailsPage />}
        />
        <Route path="/transactionpage" element={<TransactionPage />} />
        <Route path="/examplepage" element={<ExamplePage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/example2" element={<Hotelexample />} />
        <Route path="/filt" element={<AllFilter />} />

        {/* <Route path="/footer" element={<Footer />} /> */}
      </Routes>
    </div>
  );
}

export default App;
