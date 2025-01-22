import pop from "../static/pop";
import { useState, useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";

const Pop = ({ setValues }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectOption = (option) => {
    if (selectedOption?.value === option.value) {
      // Deselect the option if it is already selected
      setSelectedOption(null);
      setValues(0); // Reset the price to 0 in the parent
    } else {
      // Select the new option
      setSelectedOption(option);
      setValues(option.price); // Pass the selected price to the parent
    }
  };

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener for clicks outside the dropdown
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when the component is unmounted or dropdown is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex flex-col items-center justify-center bg-white to-gray-100 p-4 w-full">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 m-2">
        <h2 className="text-black text-xl  text-center m-2">
          Saint gobain gypsum pop
        </h2>
        <h1 className="text-3xl font-bold text-gray-900">POP</h1>
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
                <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1">
                  <IoMdAdd />
                </div>
              </span>
            )}
          </div>

          {isDropdownOpen && (
            <div
              ref={dropdownRef} // Attach the ref to the dropdown container
              className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
            >
              {pop.Pop.map((option) => (
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

export default Pop;
