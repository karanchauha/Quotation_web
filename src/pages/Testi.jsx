// import { useState, useCallback } from "react";
// import { categories } from "../components/categories";
// // import Electric from "./Electric";
// // import Pop from "./Pop";
// // import Paint from "./Paint";
// import { IoMdAdd } from "react-icons/io";

// const Testi = () => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [isDropdownOpen, setIsDropdownOpen] = useState({});

//   const toggleOption = useCallback((categoryName, option) => {
//     setSelectedOptions((prev) => {
//       const categoryOptions = prev[categoryName] || [];
//       return {
//         ...prev,
//         [categoryName]: categoryOptions.some(
//           (opt) => opt.value === option.value
//         )
//           ? categoryOptions.filter((opt) => opt.value !== option.value)
//           : [...categoryOptions, { ...option, width: 0, height: 0, amount: 0 }],
//       };
//     });
//   }, []);

//   const updateDimension = useCallback(
//     (categoryName, value, field, dimension) => {
//       const validDimension = isNaN(dimension) || dimension <= 0 ? 0 : dimension;

//       setSelectedOptions((prev) => {
//         const updatedOptions = prev[categoryName]?.map((opt) => {
//           if (opt.value === value) {
//             const updatedWidth =
//               field === "width" ? validDimension : opt.width || 0;
//             const updatedHeight =
//               field === "height" ? validDimension : opt.height || 0;

//             const area = (updatedWidth * updatedHeight) / 144; // Convert in² to ft²
//             const amount = area * (opt.price || 0);

//             return {
//               ...opt,
//               [field]: validDimension,
//               amount: amount > 0 ? amount.toFixed(2) : 0,
//             };
//           }
//           return opt;
//         });

//         return {
//           ...prev,
//           [categoryName]: updatedOptions || [],
//         };
//       });
//     },
//     []
//   );

//   const toggleDropdown = (categoryName) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [categoryName]: !prev[categoryName],
//     }));
//   };

//   const closeDropdown = (categoryName) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [categoryName]: false,
//     }));
//   };

//   const calculateTotalAmount = (categoryName) => {
//     return (
//       selectedOptions[categoryName]?.reduce(
//         (total, opt) => total + parseFloat(opt.amount || 0),
//         0
//       ) || 0
//     ).toFixed(2);
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center  bg-white ">
//         {Object.keys(categories).map((categoryName) => (
//           <div
//             key={categoryName}
//             className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 relative flex flex-col gap-4 m-2"
//           >
//             <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>

//             <div>
//               <div
//                 className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-2 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//                 onClick={() => toggleDropdown(categoryName)}
//               >
//                 {selectedOptions[categoryName]?.length > 0 ? (
//                   <div className="flex flex-wrap items-center">
//                     {selectedOptions[categoryName].map((option) => (
//                       <span
//                         key={option.value}
//                         className="inline-flex items-center justify-between px-1 py-1 m-1 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
//                       >
//                         {option.label}
//                         <button
//                           className="ml-2 bg-white rounded-3xl text-black"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleOption(categoryName, option);
//                           }}
//                         >
//                           &times;
//                         </button>
//                       </span>
//                     ))}
//                     {/* "+" symbol for selecting more */}
//                     <span className="text-white ml-1 bg-gray-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-600 hover:scale-105 transition-all shadow-sm cursor-pointer">
//                       +
//                     </span>
//                   </div>
//                 ) : (
//                   <span className="text-gray-500 flex items-center justify-between">
//                     <p>Select options...</p>
//                     <div className="hover:scale-150 transition-all text-gray-600">
//                       <IoMdAdd />
//                     </div>
//                   </span>
//                 )}
//               </div>

//               {isDropdownOpen[categoryName] && (
//                 <div className=" z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                   {categories[categoryName].map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={() => {
//                         toggleOption(categoryName, option);
//                         closeDropdown(categoryName);
//                       }}
//                       className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${
//                         selectedOptions[categoryName]?.some(
//                           (opt) => opt.value === option.value
//                         )
//                           ? "bg-blue-200"
//                           : ""
//                       }`}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {selectedOptions[categoryName]?.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   Set Dimensions (Inches)
//                 </h2>
//                 {selectedOptions[categoryName].map((option) => (
//                   <div key={option.value} className="mt-4">
//                     <h3 className="text-gray-700 font-semibold">
//                       {option.label}
//                     </h3>
//                     <div className="flex gap-4 mt-2">
//                       <input
//                         type="number"
//                         placeholder="Width"
//                         className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                         value={option.width || ""}
//                         onChange={(e) =>
//                           updateDimension(
//                             categoryName,
//                             option.value,
//                             "width",
//                             parseFloat(e.target.value) || 0
//                           )
//                         }
//                       />
//                       <input
//                         type="number"
//                         placeholder="Height"
//                         className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                         value={option.height || ""}
//                         onChange={(e) =>
//                           updateDimension(
//                             categoryName,
//                             option.value,
//                             "height",
//                             parseFloat(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </div>
//                     <p className="text-gray-600 text-sm mt-2">
//                       Area:{" "}
//                       {option.width && option.height
//                         ? `${((option.width * option.height) / 144).toFixed(
//                             2
//                           )} ft²`
//                         : `0 ft²`}
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       Price: {`${option.price} INR`}
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       Amount:{" "}
//                       {option.amount > 0 ? `${option.amount} INR` : "0 INR"}
//                     </p>
//                   </div>
//                 ))}
//                 <p className="text-lg font-bold text-gray-900 mt-6">
//                   Total Amount: {calculateTotalAmount(categoryName)} INR
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//         {/* <Electric />
//         <Pop />
//         <Paint /> */}
//       </div>
//     </div>
//   );
// };

// export default Testi;

// import { useState, useCallback } from "react";
// import { categories } from "../components/categories";

// const Testi = () => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [isDropdownOpen, setIsDropdownOpen] = useState({});

//   const toggleOption = useCallback((categoryGroup, categoryName, option) => {
//     setSelectedOptions((prev) => {
//       const categoryOptions = prev[categoryGroup]?.[categoryName] || [];
//       return {
//         ...prev,
//         [categoryGroup]: {
//           ...prev[categoryGroup],
//           [categoryName]: categoryOptions.some(
//             (opt) => opt.value === option.value
//           )
//             ? categoryOptions.filter((opt) => opt.value !== option.value)
//             : [
//                 ...categoryOptions,
//                 { ...option, width: 0, height: 0, amount: 0 },
//               ],
//         },
//       };
//     });
//   }, []);

//   const updateDimension = useCallback(
//     (categoryGroup, categoryName, value, field, dimension) => {
//       const validDimension = isNaN(dimension) || dimension <= 0 ? 0 : dimension;

//       setSelectedOptions((prev) => {
//         const updatedOptions = prev[categoryGroup]?.[categoryName]?.map(
//           (opt) => {
//             if (opt.value === value) {
//               const updatedWidth =
//                 field === "width" ? validDimension : opt.width || 0;
//               const updatedHeight =
//                 field === "height" ? validDimension : opt.height || 0;

//               const area = (updatedWidth * updatedHeight) / 144; // Convert in² to ft²
//               const amount = area * (opt.price || 0);

//               return {
//                 ...opt,
//                 [field]: validDimension,
//                 amount: amount > 0 ? amount.toFixed(2) : 0,
//               };
//             }
//             return opt;
//           }
//         );

//         return {
//           ...prev,
//           [categoryGroup]: {
//             ...prev[categoryGroup],
//             [categoryName]: updatedOptions || [],
//           },
//         };
//       });
//     },
//     []
//   );

//   const toggleDropdown = (categoryGroup, categoryName) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [categoryGroup]: {
//         ...prev[categoryGroup],
//         [categoryName]: !prev[categoryGroup]?.[categoryName],
//       },
//     }));
//   };

//   const closeDropdown = (categoryGroup, categoryName) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [categoryGroup]: {
//         ...prev[categoryGroup],
//         [categoryName]: false,
//       },
//     }));
//   };

//   const calculateTotalAmount = (categoryGroup, categoryName) => {
//     return (
//       selectedOptions[categoryGroup]?.[categoryName]?.reduce(
//         (total, opt) => total + parseFloat(opt.amount || 0),
//         0
//       ) || 0
//     ).toFixed(2);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-100 to-gray-50">
//       {Object.keys(categories).map((categoryGroup) => (
//         <div key={categoryGroup} className="w-full max-w-5xl">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8">
//             {categoryGroup}
//           </h1>
//           {Object.keys(categories[categoryGroup]).map((categoryName) => (
//             <div
//               key={categoryName}
//               className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 relative flex flex-col gap-4 m-2"
//             >
//               <h2 className="text-3xl font-bold text-gray-900">
//                 {categoryName}
//               </h2>
//               <div>
//                 <div
//                   className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//                   onClick={() => toggleDropdown(categoryGroup, categoryName)}
//                 >
//                   {selectedOptions[categoryGroup]?.[categoryName]?.length >
//                   0 ? (
//                     selectedOptions[categoryGroup][categoryName].map(
//                       (option) => (
//                         <span
//                           key={option.value}
//                           className="inline-flex items-center px-3 py-1 mr-2 text-sm bg-blue-100 text-blue-800 font-medium rounded-full"
//                         >
//                           {option.label}
//                           <button
//                             className="ml-2 text-blue-600 hover:text-blue-800"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               toggleOption(categoryGroup, categoryName, option);
//                             }}
//                           >
//                             &times;
//                           </button>
//                         </span>
//                       )
//                     )
//                   ) : (
//                     <span className="text-gray-500">Select options...</span>
//                   )}
//                 </div>

//                 {isDropdownOpen[categoryGroup]?.[categoryName] && (
//                   <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                     {categories[categoryGroup][categoryName].map((option) => (
//                       <div
//                         key={option.value}
//                         onClick={() => {
//                           toggleOption(categoryGroup, categoryName, option);
//                           closeDropdown(categoryGroup, categoryName);
//                         }}
//                         className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${
//                           selectedOptions[categoryGroup]?.[categoryName]?.some(
//                             (opt) => opt.value === option.value
//                           )
//                             ? "bg-blue-50"
//                             : ""
//                         }`}
//                       >
//                         {option.label}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {selectedOptions[categoryGroup]?.[categoryName]?.length > 0 && (
//                 <div className="mt-6">
//                   <h3 className="text-xl font-bold text-gray-800">
//                     Set Dimensions (Inches)
//                   </h3>
//                   {selectedOptions[categoryGroup][categoryName].map(
//                     (option) => (
//                       <div key={option.value} className="mt-4">
//                         <h4 className="text-gray-700 font-semibold">
//                           {option.label}
//                         </h4>
//                         <div className="flex gap-4 mt-2">
//                           <input
//                             type="number"
//                             placeholder="Width"
//                             className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                             value={option.width || ""}
//                             onChange={(e) =>
//                               updateDimension(
//                                 categoryGroup,
//                                 categoryName,
//                                 option.value,
//                                 "width",
//                                 parseFloat(e.target.value) || 0
//                               )
//                             }
//                           />
//                           <input
//                             type="number"
//                             placeholder="Height"
//                             className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                             value={option.height || ""}
//                             onChange={(e) =>
//                               updateDimension(
//                                 categoryGroup,
//                                 categoryName,
//                                 option.value,
//                                 "height",
//                                 parseFloat(e.target.value) || 0
//                               )
//                             }
//                           />
//                         </div>
//                         <p className="text-gray-600 text-sm mt-2">
//                           Area:{" "}
//                           {option.width && option.height
//                             ? `${((option.width * option.height) / 144).toFixed(
//                                 2
//                               )} ft²`
//                             : `0 ft²`}
//                         </p>
//                         <p className="text-gray-600 text-sm">
//                           Price: {`${option.price} INR`}
//                         </p>
//                         <p className="text-gray-600 text-sm">
//                           Amount:{" "}
//                           {option.amount > 0 ? `${option.amount} INR` : "0 INR"}
//                         </p>
//                       </div>
//                     )
//                   )}
//                   <p className="text-lg font-bold text-gray-900 mt-6">
//                     Total Amount:{" "}
//                     {calculateTotalAmount(categoryGroup, categoryName)} INR
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Testi;

// **********************&&&&&&&&&&&&&&&&&&&&&&&&&&&&********************************

// *************************************

import { useState, useCallback, useRef, useEffect } from "react";
import categories from "../static/categories";
import { IoMdAdd } from "react-icons/io";
import ButtonTwo from "../components/ButtonTwo";

const Testi = ({ setValues }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const dropdownRefs = useRef({}); // Create refs for each dropdown
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
            const amount = area * (opt.price || 0);

            return {
              ...opt,
              [field]: validDimension,
              amount: amount > 0 ? amount.toFixed(2) : 0,
            };
          }
          return opt;
        });

        return {
          ...prev,
          [categoryName]: updatedOptions || [],
        };
      });
    },
    []
  );

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

  // Update useEffect to send category-wise total directly
  useEffect(() => {
    Object.keys(selectedOptions).forEach((categoryName) => {
      const categoryTotal = calculateTotalAmount(categoryName);
      setValues(categoryTotal); // Send category total directly to the parent
    });
  }, [selectedOptions, setValues]);

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

  console.log("isFullModular", isFullModular);

  return (
    <div>
      <div className="flex flex-col items-center justify-start bg-white w-full p-5 ">
        <ButtonTwo onModularChange={handleModularChange} />
        {Object.keys(categories).map((categoryName) => (
          <div
            key={categoryName}
            className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 relative flex flex-col gap-4 m-5"
            ref={(el) => (dropdownRefs.current[categoryName] = el)} // Assign ref
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
                  <div className="flex flex-wrap items-center">
                    {selectedOptions[categoryName].map((option) => (
                      <span
                        key={option.value}
                        className="inline-flex items-center justify-between px-1 py-1 m-1 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
                      >
                        {option.label}
                        <button
                          className="ml-2 bg-white rounded-3xl text-black "
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
                <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {categories[categoryName].map((option) => (
                    <div
                      key={option.value}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent dropdown toggle
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
                        <p className="flex items-center justify-end bg-gray-500 h-7 w-14 rounded-2xl">
                          <p className="bg-white mr-1 ml-1 p-2 h-5 w-5 rounded-2xl"></p>
                        </p>
                      ) : (
                        <p className="flex items-center justify-start bg-gray-300 h-7 w-14 rounded-2xl">
                          <p className="bg-white mr-1 ml-1 p-2 h-5 w-5 rounded-2xl"></p>
                        </p>
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
                    <p className="text-gray-600 text-sm">
                      {/* Price: {`${option.price} INR`} */}
                      {isFullModular ? (
                        <p> Price: {`${option.pricefm} INR`} </p>
                      ) : (
                        <p> Price: {`${option.price} INR`} </p>
                      )}
                    </p>
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

// import { useState, useCallback, useRef, useEffect } from "react";
// import categories from "../static/categories";
// import { IoMdAdd } from "react-icons/io";
// import ButtonTwo from "../components/ButtonTwo";
// import Kitchen from "./Kitchen";

// const Testi = ({ setValues }) => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [isDropdownOpen, setIsDropdownOpen] = useState({});
//   const dropdownRefs = useRef({}); // Create refs for each dropdown
//   const [isFullModular, setIsFullModular] = useState(false);

//   const toggleOption = useCallback((categoryName, option) => {
//     setSelectedOptions((prev) => {
//       const categoryOptions = prev[categoryName] || [];
//       return {
//         ...prev,
//         [categoryName]: categoryOptions.some(
//           (opt) => opt.value === option.value
//         )
//           ? categoryOptions.filter((opt) => opt.value !== option.value)
//           : [...categoryOptions, { ...option, width: 0, height: 0, amount: 0 }], // Add initial dimensions and amount
//       };
//     });
//   }, []);

//   const updateDimension = useCallback(
//     (categoryName, value, field, dimension) => {
//       const validDimension = isNaN(dimension) || dimension <= 0 ? 0 : dimension;

//       setSelectedOptions((prev) => {
//         const updatedOptions = prev[categoryName]?.map((opt) => {
//           if (opt.value === value) {
//             const updatedWidth =
//               field === "width" ? validDimension : opt.width || 0;
//             const updatedHeight =
//               field === "height" ? validDimension : opt.height || 0;

//             const area = (updatedWidth * updatedHeight) / 144; // Convert in² to ft²
//             const amount = area * (opt.price || 0);

//             return {
//               ...opt,
//               [field]: validDimension,
//               amount: amount > 0 ? amount.toFixed(2) : 0,
//             };
//           }
//           return opt;
//         });

//         return {
//           ...prev,
//           [categoryName]: updatedOptions || [],
//         };
//       });

//       // Calculate the grand total and send it to setValues
//       const grandTotal = Object.keys(selectedOptions)
//         .reduce((total, categoryName) => {
//           const categoryTotal =
//             selectedOptions[categoryName]?.reduce(
//               (categorySum, option) =>
//                 categorySum + parseFloat(option.amount || 0),
//               0
//             ) || 0;
//           return total + categoryTotal;
//         }, 0)
//         .toFixed(2);

//       // Send the grand total to parent via setValues
//       setValues(grandTotal);
//     },
//     [selectedOptions, setValues, toggleOption]
//   );

//   const toggleDropdown = (categoryName) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [categoryName]: !prev[categoryName],
//     }));
//   };

//   const closeDropdown = (categoryName) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [categoryName]: false,
//     }));
//   };

//   const calculateTotalAmount = (categoryName) => {
//     return (
//       selectedOptions[categoryName]?.reduce(
//         (total, opt) => total + parseFloat(opt.amount || 0),
//         0
//       ) || 0
//     ).toFixed(2);
//   };

//   const handleModularChange = (value) => {
//     setIsFullModular(value);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       Object.keys(dropdownRefs.current).forEach((categoryName) => {
//         if (
//           isDropdownOpen[categoryName] &&
//           dropdownRefs.current[categoryName] &&
//           !dropdownRefs.current[categoryName].contains(event.target)
//         ) {
//           closeDropdown(categoryName);
//         }
//       });
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen, updateDimension]);

//   console.log(isFullModular);

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-start bg-white w-full p-5 ">
//         <ButtonTwo onModularChange={handleModularChange} />

//         {Object.keys(categories).map((categoryName) => (
//           <div
//             key={categoryName}
//             className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 relative flex flex-col gap-4 m-5"
//             ref={(el) => (dropdownRefs.current[categoryName] = el)} // Assign ref
//           >
//             <h1 className="text-3xl font-bold text-gray-900 sticky top-0 z-10 bg-white py-2">
//               {categoryName}
//             </h1>

//             <div>
//               <div
//                 className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-2 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//                 onClick={() => toggleDropdown(categoryName)}
//               >
//                 {selectedOptions[categoryName]?.length > 0 ? (
//                   <div className="flex flex-wrap items-center">
//                     {selectedOptions[categoryName].map((option) => (
//                       <span
//                         key={option.value}
//                         className="inline-flex items-center justify-between px-1 py-1 m-1 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
//                       >
//                         {option.label}
//                         <button
//                           className="ml-2 bg-white rounded-3xl text-black "
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleOption(categoryName, option);
//                           }}
//                         >
//                           &times;
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                 ) : (
//                   <span className="text-gray-500 flex items-center justify-between">
//                     <p>Select options...</p>
//                     <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1 ">
//                       <IoMdAdd />
//                     </div>
//                   </span>
//                 )}
//               </div>

//               {isDropdownOpen[categoryName] && (
//                 <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                   {categories[categoryName].map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent dropdown toggle
//                         toggleOption(categoryName, option);
//                         // Dropdown will not close on selection
//                       }}
//                       className={`cursor-pointer flex items-center justify-between gap-2 px-4 py-2 hover:bg-blue-100 text-black ${
//                         selectedOptions[categoryName]?.some(
//                           (opt) => opt.value === option.value
//                         )
//                           ? "bg-blue-100"
//                           : ""
//                       }`}
//                     >
//                       {option.label}
//                       {selectedOptions[categoryName]?.some(
//                         (opt) => opt.value === option.value
//                       ) ? (
//                         <p className="flex items-center justify-end bg-gray-500 h-7 w-14 rounded-2xl">
//                           <p className="bg-white mr-1 ml-1 p-2 h-5 w-5 rounded-2xl"></p>
//                         </p>
//                       ) : (
//                         <p className="flex items-center justify-start bg-gray-300 h-7 w-14 rounded-2xl">
//                           <p className="bg-white mr-1 ml-1 p-2 h-5 w-5 rounded-2xl"></p>
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {selectedOptions[categoryName]?.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   Set Dimensions (Inches)
//                 </h2>
//                 {selectedOptions[categoryName].map((option) => (
//                   <div key={option.value} className="mt-4">
//                     <h3 className="text-gray-700 font-semibold">
//                       {option.label}
//                     </h3>
//                     <div className="flex gap-4 mt-2 flex-wrap text-black">
//                       <input
//                         type="number"
//                         placeholder="Width"
//                         className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                         value={option.width || ""}
//                         onChange={(e) =>
//                           updateDimension(
//                             categoryName,
//                             option.value,
//                             "width",
//                             parseFloat(e.target.value) || 0
//                           )
//                         }
//                       />
//                       <input
//                         type="number"
//                         placeholder="Height"
//                         className="flex-1 bg-gray-50 border border-gray-300 text-black rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                         value={option.height || ""}
//                         onChange={(e) =>
//                           updateDimension(
//                             categoryName,
//                             option.value,
//                             "height",
//                             parseFloat(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </div>
//                     <p className="text-gray-600 text-sm mt-2">
//                       Area:{" "}
//                       {option.width && option.height
//                         ? `${((option.width * option.height) / 144).toFixed(
//                             2
//                           )} ft²`
//                         : `0 ft²`}
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       {/* Price: {`${option.price} INR`} */}
//                       {isFullModular ? (
//                         <p> Price: {`${option.pricefm} INR`} </p>
//                       ) : (
//                         <p> Price: {`${option.price} INR`} </p>
//                       )}
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       Amount:{" "}
//                       {option.amount > 0 ? `${option.amount} INR` : "0 INR"}
//                     </p>
//                   </div>
//                 ))}
//                 <p className="text-lg font-bold text-gray-900 mt-6">
//                   Total Amount: {calculateTotalAmount(categoryName)} INR
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <Kitchen />
//     </div>
//   );
// };

// export default Testi;
