import { useState, useCallback, useRef, useEffect } from "react";
import categories from "../static/categories"; // Assuming categories is imported from a static file
import { IoMdAdd } from "react-icons/io";
import ButtonTwo from "../components/ButtonTwo";

const Testi = ({ setValues }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const dropdownRefs = useRef({});
  const [isFullModular, setIsFullModular] = useState(false);

  const toggleOption = useCallback((categoryName, option) => {
    setSelectedOptions((prev) => {
      const categoryOptions = prev[categoryName] || [];
      return {
        ...prev,
        [categoryName]: categoryOptions.some(
          (opt) => opt.value === option.value
        )
          ? categoryOptions.filter((opt) => opt.value !== option.value)
          : [...categoryOptions, { ...option, width: 0, height: 0, amount: 0 }],
      };
    });
  }, []);

  const updateDimension = useCallback(
    (categoryName, value, field, dimension) => {
      const validDimension = isNaN(dimension) || dimension <= 0 ? 0 : dimension;

      setSelectedOptions((prev) => {
        const updatedOptions = prev[categoryName]?.map((opt) => {
          if (opt.value === value) {
            const updatedWidth =
              field === "width" ? validDimension : opt.width || 0;
            const updatedHeight =
              field === "height" ? validDimension : opt.height || 0;

            const area = (updatedWidth * updatedHeight) / 144; // Convert in² to ft²

            const amount = isFullModular
              ? area * (opt.pricefm || 0)
              : area * (opt.price || 0);

            return {
              ...opt,
              [field]: validDimension,
              amount: amount > 0 ? amount.toFixed(2) : 0, // Ensure formatted amount
            };
          }
          return opt; // Return the unmodified option if no match
        });

        return {
          ...prev,
          [categoryName]: updatedOptions || [], // Update only the specified category
        };
      });
    },
    [isFullModular] // Include isFullModular in dependency
  );

  // Recalculate amounts when modular type changes
  useEffect(() => {
    setSelectedOptions((prev) => {
      const recalculatedOptions = {};

      Object.keys(prev).forEach((categoryName) => {
        recalculatedOptions[categoryName] = prev[categoryName]?.map((opt) => {
          const area = (opt.width * opt.height) / 144; // Convert in² to ft²
          const amount = isFullModular
            ? area * (opt.pricefm || 0)
            : area * (opt.price || 0);

          return {
            ...opt,
            amount: amount > 0 ? amount.toFixed(2) : 0, // Update amount
          };
        });
      });

      return recalculatedOptions; // Return recalculated options
    });
  }, [isFullModular]); // Run whenever modular type changes

  const toggleDropdown = (categoryName) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const closeDropdown = (categoryName) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [categoryName]: false,
    }));
  };

  const calculateTotalAmount = (categoryName) => {
    return (
      selectedOptions[categoryName]?.reduce(
        (total, opt) => total + parseFloat(opt.amount || 0),
        0
      ) || 0
    ).toFixed(2);
  };

  useEffect(() => {
    // Calculate grand total across all categories
    const grandTotal = Object.keys(selectedOptions).reduce(
      (total, categoryName) => {
        return (
          total +
          selectedOptions[categoryName]?.reduce(
            (sum, opt) => sum + parseFloat(opt.amount || 0),
            0
          )
        );
      },
      0
    );

    setValues(grandTotal.toFixed(2)); // Send grand total to the parent
  }, [updateDimension, selectedOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((categoryName) => {
        if (
          isDropdownOpen[categoryName] &&
          dropdownRefs.current[categoryName] &&
          !dropdownRefs.current[categoryName].contains(event.target)
        ) {
          closeDropdown(categoryName);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleModularChange = (value) => {
    setIsFullModular(value);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-start bg-white w-full p-5 ">
        <ButtonTwo onModularChange={handleModularChange} />

        {/* <h1 className="text-xl font-bold text-gray-700  bg-white py-2 z-50 mt-14">
          Alternate gurjan plywood Full core full ply + ultra Marine adhesive +{" "}
          <br />
          Onyx/ ebco Fitting + Laminate range upto 1500
        </h1> */}
        {!isFullModular ? (
          <h1 className="text-xl  text-gray-700  bg-white py-2 z-50 mt-14">
            Alternate gurjan plywood Full core full ply + ultra Marine adhesive
            + <br />
            Onyx/ebco Fitting + Laminate range upto 1500
          </h1>
        ) : (
          <h1 className="text-xl  text-gray-700  bg-white py-2 z-50 mt-14">
            Alternate gurjan plywood Full core full ply + ultra Marine adhesive
            + <br />
            Hettich/Hafele Fitting + Laminate range upto 2200 + 2mm edge binding
          </h1>
        )}

        {Object.keys(categories).map((categoryName) => (
          <div
            key={categoryName}
            className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 relative flex flex-col gap-4 m-5"
            ref={(el) => (dropdownRefs.current[categoryName] = el)}
          >
            <h1 className="text-3xl font-bold text-gray-900 sticky top-0 z-10 bg-white py-2">
              {categoryName}
            </h1>

            <div>
              <div
                className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-2 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
                onClick={() => toggleDropdown(categoryName)}
              >
                {selectedOptions[categoryName]?.length > 0 ? (
                  <div className="flex flex-wrap items-center ">
                    {selectedOptions[categoryName].map((option) => (
                      <span
                        key={option.value}
                        className="inline-flex items-center justify-between  m-1 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
                      >
                        {option.label}
                        <button
                          className="m-2 bg-white rounded-full text-black pl-2 pr-2 pt-1 pb-1 "
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleOption(categoryName, option);
                          }}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 flex items-center justify-between">
                    <p>Select options...</p>
                    <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1 ">
                      <IoMdAdd />
                    </div>
                  </span>
                )}
              </div>

              {isDropdownOpen[categoryName] && (
                <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg ">
                  {categories[categoryName].map((option) => (
                    <div
                      key={option.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOption(categoryName, option);
                      }}
                      className={`cursor-pointer flex items-center justify-between gap-2 px-4 py-2 hover:bg-blue-100 text-black ${
                        selectedOptions[categoryName]?.some(
                          (opt) => opt.value === option.value
                        )
                          ? "bg-blue-100"
                          : ""
                      }`}
                    >
                      {option.label}
                      {selectedOptions[categoryName]?.some(
                        (opt) => opt.value === option.value
                      ) ? (
                        <div className="flex items-center justify-end bg-gray-500 h-7 w-14 rounded-2xl">
                          <p className="bg-white mr-1 ml-1 p-2 h-5 w-5 rounded-2xl"></p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-start bg-gray-300 h-7 w-14 rounded-2xl">
                          <p className="bg-white mr-1 ml-1 p-2 h-5 w-5 rounded-2xl"></p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedOptions[categoryName]?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Set Dimensions (Inches)
                </h2>
                {selectedOptions[categoryName].map((option) => (
                  <div key={option.value} className="mt-4">
                    <h3 className="text-gray-700 font-semibold">
                      {option.label}
                    </h3>
                    <div className="flex gap-4 mt-2 flex-wrap text-black">
                      <input
                        type="number"
                        placeholder="Width"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                        value={option.width || ""}
                        onChange={(e) =>
                          updateDimension(
                            categoryName,
                            option.value,
                            "width",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                      <input
                        type="number"
                        placeholder="Height"
                        className="flex-1 bg-gray-50 border border-gray-300 text-black rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                        value={option.height || ""}
                        onChange={(e) =>
                          updateDimension(
                            categoryName,
                            option.value,
                            "height",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Area:{" "}
                      {option.width && option.height
                        ? `${((option.width * option.height) / 144).toFixed(
                            2
                          )} ft²`
                        : `0 ft²`}
                    </p>
                    <div className="text-gray-600 text-sm">
                      {isFullModular ? (
                        <p> Price: {`${option.pricefm} INR`} </p>
                      ) : (
                        <p> Price: {`${option.price} INR`} </p>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm">
                      Amount:{" "}
                      {option.amount > 0 ? `${option.amount} INR` : "0 INR"}
                    </p>
                  </div>
                ))}
                <p className="text-lg font-bold text-gray-900 mt-6">
                  Total Amount: {calculateTotalAmount(categoryName)} INR
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testi;
