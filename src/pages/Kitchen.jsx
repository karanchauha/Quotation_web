import kitchen from "../static/kitchen";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const Kitchen = ({ setValues }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close dropdown after selection
    setValues(option.price); // Pass the selected price to the parent
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white to-gray-100 p-4 w-full ">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 m-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Trolley/Tandem fitting
        </h1>
        <div>
          <div
            className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
            onClick={toggleDropdown}
          >
            {selectedOption ? (
              <span className="text-gray-900 font-medium">
                {selectedOption.label}
              </span>
            ) : (
              <span className="text-gray-500 flex items-center justify-between">
                <p>Select options...</p>
                <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1 ">
                  <IoMdAdd />
                </div>
              </span>
            )}
          </div>

          {isDropdownOpen && (
            <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {kitchen.Kitchen.map((option) => (
                <div
                  key={option.value}
                  onClick={() => selectOption(option)}
                  className={`cursor-pointer text-black px-4 py-2 hover:bg-blue-100 ${
                    selectedOption?.value === option.value ? "bg-blue-50" : ""
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedOption && (
          <div>
            <div className="mt-2">
              <h3 className="text-gray-700 font-semibold">
                {selectedOption.label}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Price: {`${selectedOption.price} INR`}
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900 mt-6">
              Total Amount: {`${selectedOption.price} INR`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kitchen;
