// import React, { useState } from "react";
// import { PriceFilter } from "../PriceFillter/PriceFillter";
// import { Fillters } from "../Fillters/Fillters";
// import { RatingFillter } from "../RatingFillter/RatingFillter";
// import { useSelector } from "react-redux";

// export const AllFilter = () => {
//   const [showPriceFilter, setShowPriceFilter] = useState(false);
//   const [showFillters, setShowFillters] = useState(false);
//   const [showRatingFilter, setShowRatingFilter] = useState(false);
//   const { isDarkMode } = useSelector((state) => state.user);

//   const togglePriceFilter = () => {
//     setShowPriceFilter((prev) => !prev);
//     setShowFillters(false);
//     setShowRatingFilter(false);
//   };

//   const toggleFillters = () => {
//     setShowFillters((prev) => !prev);
//     setShowPriceFilter(false);
//     setShowRatingFilter(false);
//   };

//   const toggleRatingFilter = () => {
//     setShowRatingFilter((prev) => !prev);
//     setShowPriceFilter(false);
//     setShowFillters(false);
//   };

//   return (
//     <div className={`${isDarkMode ? "dark" : ""} p-4 relative z-40`}>
//       <div className="flex w-full justify-evenly py-4 rounded-lg div">
//         {/* Price Filter */}
//         <div className="flex flex-col items-center w-[30%] relative">
//           <strong className="text-lg">Price</strong>
//           <button
//             onClick={togglePriceFilter}
//             className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
//           >
//             Price
//           </button>
//           {showPriceFilter && (
//             <div className="absolute top-full mt-2 w-full z-50">
//               <PriceFilter />
//             </div>
//           )}
//         </div>

//         {/* General Filter */}
//         <div className="flex flex-col items-center w-[30%] relative">
//           <strong className="text-lg">Filter</strong>
//           <button
//             onClick={toggleFillters}
//             className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
//           >
//             Filter
//           </button>
//           {showFillters && (
//             <div className="absolute top-full mt-2 w-[75%] z-50">
//               <Fillters />
//             </div>
//           )}
//         </div>

//         {/* Rating Filter */}
//         <div className="flex flex-col items-center w-[30%] relative">
//           <strong className="text-lg">Rating</strong>
//           <button
//             onClick={toggleRatingFilter}
//             className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
//           >
//             Select
//           </button>
//           {showRatingFilter && (
//             <div className="absolute top-full mt-2 w-full z-50">
//               <RatingFillter />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useState } from "react";
// import { PriceFilter } from "../PriceFillter/PriceFillter";
// import { Fillters } from "../Fillters/Fillters";
// import { RatingFillter } from "../RatingFillter/RatingFillter";
// import { useSelector } from "react-redux";
// import axios from "axios";

// export const AllFilter = () => {
//   const [showPriceFilter, setShowPriceFilter] = useState(false);
//   const [showFillters, setShowFillters] = useState(false);
//   const [showRatingFilter, setShowRatingFilter] = useState(false);
//   const [minPrice, setMinPrice] = useState(0);
//   const [highPrice, setHighPrice] = useState(Infinity);
//   const { isDarkMode } = useSelector((state) => state.user);

//   const togglePriceFilter = () => {
//     setShowPriceFilter((prev) => !prev);
//     setShowFillters(false);
//     setShowRatingFilter(false);
//   };

//   const toggleFillters = () => {
//     setShowFillters((prev) => !prev);
//     setShowPriceFilter(false);
//     setShowRatingFilter(false);
//   };

//   const toggleRatingFilter = () => {
//     setShowRatingFilter((prev) => !prev);
//     setShowPriceFilter(false);
//     setShowFillters(false);
//   };

//   function handleSubmit() {
//     hotels.minPrice > minPrice && hotels.minPrice < highPrice ? :hotels
//   }

//   return (
//     <div className={`${isDarkMode ? "dark" : ""} p-4 relative z-40`}>
//       <div className="flex w-full justify-evenly py-4 rounded-lg div">
//         {/* Price Filter */}
//         <div className="flex flex-col items-center w-[30%] relative">
//           <strong className="text-lg">Price</strong>
//           <button
//             onClick={togglePriceFilter}
//             className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
//           >
//             Price
//           </button>
//           {showPriceFilter && (
//             <div className="absolute top-full mt-2 w-full z-50">
//               <PriceFilter
//                 minPrice={minPrice}
//                 setMinPrice={setMinPrice}
//                 highPrice={highPrice}
//                 setHighPrice={setHighPrice}
//                 handleSubmit={handleSubmit}
//               />
//             </div>
//           )}
//         </div>

//         {/* General Filter */}
//         <div className="flex flex-col items-center w-[30%] relative">
//           <strong className="text-lg">Filter</strong>
//           <button
//             onClick={toggleFillters}
//             className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
//           >
//             Filter
//           </button>
//           {showFillters && (
//             <div className="absolute top-full mt-2 w-[75%] z-50">
//               <Fillters />
//             </div>
//           )}
//         </div>

//         {/* Rating Filter */}
//         <div className="flex flex-col items-center w-[30%] relative">
//           <strong className="text-lg">Rating</strong>
//           <button
//             onClick={toggleRatingFilter}
//             className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
//           >
//             Select
//           </button>
//           {showRatingFilter && (
//             <div className="absolute top-full mt-2 w-full z-50">
//               <RatingFillter />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { PriceFilter } from "../PriceFillter/PriceFillter";
import { Fillters } from "../Fillters/Fillters";
import { RatingFillter } from "../RatingFillter/RatingFillter";
import { useSelector } from "react-redux";

export const AllFilter = ({ onPriceFilter }) => {
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showFillters, setShowFillters] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(10000);
  const { isDarkMode } = useSelector((state) => state.user);

  const togglePriceFilter = () => {
    setShowPriceFilter((prev) => !prev);
    setShowFillters(false);
    setShowRatingFilter(false);
  };

  const toggleFillters = () => {
    setShowFillters((prev) => !prev);
    setShowPriceFilter(false);
    setShowRatingFilter(false);
  };

  const toggleRatingFilter = () => {
    setShowRatingFilter((prev) => !prev);
    setShowPriceFilter(false);
    setShowFillters(false);
  };

  const handleSubmit = () => {
    onPriceFilter(minPrice, highPrice);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} p-4 relative z-40`}>
      <div className="flex w-full justify-evenly py-4 rounded-lg div">
        {/* Price Filter */}
        <div className="flex flex-col items-center w-[30%] relative">
          <strong className="text-lg">Price</strong>
          <button
            onClick={togglePriceFilter}
            className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Price
          </button>
          {showPriceFilter && (
            <div className="absolute top-full mt-2 w-full z-50 ">
              <PriceFilter
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                highPrice={highPrice}
                setHighPrice={setHighPrice}
                handleSubmit={handleSubmit}
              />
            </div>
          )}
        </div>

        {/* <div className="flex flex-col items-center w-[30%] relative">
          <strong className="text-lg">Filter</strong>
          <button
            onClick={toggleFillters}
            className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Filter
          </button>
          {showFillters && (
            <div className="absolute top-full mt-2 w-[75%] z-50">
              <Fillters />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center w-[30%] relative">
          <strong className="text-lg">Rating</strong>
          <button
            onClick={toggleRatingFilter}
            className="mt-4 w-[60%] border-2 border-gray-300 text-center py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Select
          </button>
          {showRatingFilter && (
            <div className="absolute top-full mt-2 w-full z-50">
              <RatingFillter />
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};
