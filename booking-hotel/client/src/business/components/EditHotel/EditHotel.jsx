import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const EditHotel = () => {
  const { isDarkMode } = useSelector((state) => state.user);

  const initialImages = [
    "../../../../img/image1.png",
    "../../../../img/image2.png",
    "../../../../img/image3.png",
    "../../../../img/image4.png",
    "../../../../img/image5.png",
    "../../../../img/image6.png",
    "../../../../img/image7.png",
    "../../../../img/image8.png",
    "../../../../img/image9.png",
  ];

  const initialAmenities = [
    "2 swimming pools",
    "Free parking",
    "Free WiFi",
    "Family rooms",
    "24-hour front desk",
    "Lift",
    "Fabulous breakfast",
  ];

  const initialDescription = `What does your family love to do on vacation? At the Astral Nirvana Club 
  hotel, part of the Astral Hotels family, we've got it all: some of the biggest suite rooms in town, 
  outdoor and indoor heated pools, water fun for kids and adults, delicious breakfasts, daily afternoon 
  coffee and cake, and plenty of surprises to level up your stay. There's always something going on here—fun activities,
   exciting shows, tasty snacks, or thrilling attractions. With so much to do, you might not want to leave! But if you do,
    it's an easy walk to the promenade, Mall Hayam shopping center, beach, cinema, and lots of restaurants and cafes. 
    In between all the fun, our comfy and luxurious suites are waiting for you, packed with everything you and your family 
    could want for the perfect stay. Our staff is ready to fulfill any special requests, so you can truly relax and enjoy
     your time here.`;

  const [isEditMode, setIsEditMode] = useState(false);
  const [images, setImages] = useState(
    JSON.parse(localStorage.getItem("hotelImages")) || initialImages
  );
  const [amenities, setAmenities] = useState(
    JSON.parse(localStorage.getItem("hotelAmenities")) || initialAmenities
  );
  const [description, setDescription] = useState(
    localStorage.getItem("hotelDescription") || initialDescription
  );
  const [editedAmenities, setEditedAmenities] = useState([...amenities]);

  useEffect(() => {
    localStorage.setItem("hotelImages", JSON.stringify(images));
    localStorage.setItem("hotelAmenities", JSON.stringify(amenities));
    localStorage.setItem("hotelDescription", description);
  }, [images, amenities, description]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleApplyClick = () => {
    setIsEditMode(false);
    setAmenities(editedAmenities);
  };

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(event.target.files[0]);
    setImages(newImages);
  };

  const handleTextChange = (event) => {
    setDescription(event.target.value);
  };

  // Handle amenities change
  const handleAmenityChange = (index, value) => {
    const newAmenities = [...editedAmenities];
    newAmenities[index] = value;
    setEditedAmenities(newAmenities);
  };

  // Add new amenity input field
  const addAmenity = () => {
    setEditedAmenities([...editedAmenities, ""]);
  };

  // Remove amenity
  const removeAmenity = (index) => {
    const newAmenities = editedAmenities.filter((_, i) => i !== index);
    setEditedAmenities(newAmenities);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="flex justify-end mr-[20%] mt-4">
        {isEditMode ? (
          <button className="text-2xl" onClick={handleApplyClick}>
            Apply
          </button>
        ) : (
          <button className="text-2xl" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
      <div className="bg p-4">
        <div className="mx-auto max-w-screen-lg rounded-md">
          <h1 className="text-2xl font-bold mb-4">Hotel Astral Nirvana Club</h1>

          <div className="flex flex-wrap -mx-1">
            <div className="w-full md:w-[55%] p-1">
              <img
                src={images[0]}
                alt="hotel image 1"
                className="rounded-md w-full h-auto object-cover"
                style={{ maxHeight: "300px" }}
              />
              {isEditMode && (
                <input
                  type="file"
                  onChange={(e) => handleImageChange(0, e)}
                  className="mt-2"
                />
              )}
            </div>
            <div className="w-full md:w-[45%] flex flex-col p-1">
              <div className="relative mb-2">
                <img
                  src={images[1]}
                  alt="hotel image 2"
                  className="rounded-md w-full h-auto object-cover"
                  style={{ maxHeight: "145px" }}
                />
                {isEditMode && (
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(1, e)}
                    className="mt-2"
                  />
                )}
              </div>
              <div className="relative">
                <img
                  src={images[2]}
                  alt="hotel image 3"
                  className="rounded-md w-full h-auto object-cover"
                  style={{ maxHeight: "145px" }}
                />
                {isEditMode && (
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(2, e)}
                    className="mt-2"
                  />
                )}
              </div>
            </div>
            {images.slice(3, 8).map((image, index) => (
              <div className="w-1/5 p-1 relative" key={index}>
                <div className="relative">
                  <img
                    src={image}
                    alt={`hotel image ${index + 4}`}
                    className="rounded-md w-full h-auto object-cover"
                    style={{ maxHeight: "100px" }}
                  />
                  {isEditMode && (
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(index + 3, e)}
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 mb-4">
            <div
              className="border-t border-gray-300 mx-auto"
              style={{ width: "calc(100% - 2rem)", maxWidth: "100%" }}
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-center">
              {isEditMode ? (
                <div className="flex flex-col items-center">
                  {editedAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={amenity}
                        onChange={(e) =>
                          handleAmenityChange(index, e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 mr-2"
                      />
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => removeAmenity(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md"
                    onClick={addAmenity}
                  >
                    Add Amenity
                  </button>
                </div>
              ) : (
                <p className="text-center text-[#F97316] font-semibold">
                  {amenities.map((amenity, index) => (
                    <span key={index}>
                      {amenity}
                      {index < amenities.length - 1 && " | "}
                    </span>
                  ))}
                </p>
              )}
            </div>
            <div className="mt-8">
              {isEditMode ? (
                <textarea
                  value={description}
                  onChange={handleTextChange}
                  className="w-full p-4 border border-gray-300 rounded-md"
                  rows={8}
                />
              ) : (
                <p className="h1">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
