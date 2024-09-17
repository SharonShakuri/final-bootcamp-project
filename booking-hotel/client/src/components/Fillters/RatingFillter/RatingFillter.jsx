import { useSelector } from "react-redux";

export const RatingFillter = () => {
  const { isDarkMode } = useSelector((state) => state.user);

  function targetRating(text) {
    console.log(text);
    parseInt(text);
    console.log(typeof text);
  }

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="flex justify-center items-center div">
        <div className="h-[350px] w-[300px] flex flex-col justify-between border-[2px] p-4 rounded-lg">
          <div className="flex">
            <div className="w-[50%] flex flex-col space-y-2">
              <button
                onClick={() => targetRating(8.5)}
                className="rounded-full border-[2px] px-[10px] py-[5px] text-center"
              >
                <strong>8.5+</strong>
              </button>
              <button
                onClick={() => targetRating(8.0)}
                className="rounded-full border-[2px] px-[10px] py-[5px] text-center"
              >
                <strong>8.0+</strong>
              </button>
              <button
                onClick={() => targetRating(7.5)}
                className="rounded-full border-[2px] px-[10px] py-[5px] text-center"
              >
                <strong>7.5+</strong>
              </button>
              <button
                onClick={() => targetRating(7.0)}
                className="rounded-full border-[2px] px-[10px] py-[5px] text-center"
              >
                <strong>7.0+</strong>
              </button>
            </div>
            <div className="w-[50%] flex flex-col space-y-5 justify-center ml-2">
              <p className="text-center">Excellent</p>
              <p className="text-center">Very Good</p>
              <p className="text-center">Good</p>
              <p className="text-center">Fair</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-green-600 py-2 px-4 rounded-md">Reset</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
