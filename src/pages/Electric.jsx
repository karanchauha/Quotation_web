// import { electric } from "../static/electric";
// import { useState, useCallback } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Electric = () => {
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
//           : [...categoryOptions, { ...option, pieces: 0, amount: 0 }],
//       };
//     });
//   }, []);

//   const updatePieces = useCallback((categoryName, value, pieces) => {
//     const validPieces = isNaN(pieces) || pieces < 0 ? 0 : pieces;

//     setSelectedOptions((prev) => {
//       const updatedOptions = prev[categoryName]?.map((opt) => {
//         if (opt.value === value) {
//           const amount = validPieces * (opt.price || 0);
//           return {
//             ...opt,
//             pieces: validPieces,
//             amount: amount > 0 ? amount.toFixed(2) : 0,
//           };
//         }
//         return opt;
//       });

//       return {
//         ...prev,
//         [categoryName]: updatedOptions || [],
//       };
//     });
//   }, []);

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
//     <div className="flex flex-col items-center justify-center w-full bg-white to-gray-100 p-4">
//       {Object.keys(electric).length === 0 ? (
//         <div className="text-gray-600 text-xl">No options available.</div>
//       ) : (
//         Object.keys(electric).map((categoryName) => (
//           <div
//             key={categoryName}
//             className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 relative flex flex-col gap-4 m-2"
//           >
//             <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
//             <div>
//               <div
//                 className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-2 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//                 onClick={() => toggleDropdown(categoryName)}
//               >
//                 {selectedOptions[categoryName]?.length > 0 ? (
//                   selectedOptions[categoryName].map((option) => (
//                     <span
//                       key={option.value}
//                       className="inline-flex items-center justify-between px-1 py-1 mr-2 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
//                     >
//                       {option.label}
//                       <button
//                         className="ml-2 hover:text-blue-800 bg-white rounded-3xl text-black "
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleOption(categoryName, option);
//                         }}
//                       >
//                         &times;
//                       </button>
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-gray-500 flex items-center justify-between ">
//                     <p>Select options...</p>
//                     {/* <h5>hello</h5> */}
//                     <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1 ">
//                       <IoMdAdd />
//                     </div>
//                     {/* <IoMdAdd /> */}
//                   </span>
//                 )}
//               </div>

//               {/* {isDropdownOpen[categoryName] && (
//                 <div className=" z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                   {electric[categoryName].map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={() => {
//                         toggleOption(categoryName, option);
//                         closeDropdown(categoryName);
//                       }}
//                       className={`cursor-pointer text-black px-4 py-2 hover:bg-blue-100 ${
//                         selectedOptions[categoryName]?.some(
//                           (opt) => opt.value === option.value
//                         )
//                           ? "bg-blue-50"
//                           : ""
//                       }`}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//                 </div>
//               )} */}

//               {isDropdownOpen[categoryName] && (
//                 <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                   {electric[categoryName].map((option) => (
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
//                 <h2 className="text-xl font-bold text-gray-800">Set Pieces</h2>
//                 {selectedOptions[categoryName].map((option) => (
//                   <div key={option.value} className="mt-4">
//                     <h3 className="text-gray-700 font-semibold">
//                       {option.label}
//                     </h3>
//                     <div className="flex gap-4 mt-2">
//                       <input
//                         type="number"
//                         placeholder="Pieces"
//                         min="0"
//                         className="flex-1 bg-gray-50 border text-black border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                         value={option.pieces || ""}
//                         onChange={(e) =>
//                           updatePieces(
//                             categoryName,
//                             option.value,
//                             parseInt(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </div>
//                     <p className="text-gray-600 text-sm mt-2">
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
//         ))
//       )}
//     </div>
//   );
// };

// export default Electric;
// *888888989999999999999999999999999899999999999999999999999999999999999999
// import { electric } from "../static/electric";
// import { useState, useCallback, useEffect } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Electric = ({ setValue }) => {
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
//           : [...categoryOptions, { ...option, pieces: 0, amount: 0 }],
//       };
//     });
//   }, []);

//   const updatePieces = useCallback((categoryName, value, pieces) => {
//     const validPieces = isNaN(pieces) || pieces < 0 ? 0 : pieces;

//     setSelectedOptions((prev) => {
//       const updatedOptions = prev[categoryName]?.map((opt) => {
//         if (opt.value === value) {
//           const amount = validPieces * (opt.price || 0);
//           return {
//             ...opt,
//             pieces: validPieces,
//             amount: amount > 0 ? amount.toFixed(2) : 0,
//           };
//         }
//         return opt;
//       });

//       return {
//         ...prev,
//         [categoryName]: updatedOptions || [],
//       };
//     });
//   }, []);

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

//   const calculateGrandTotal = () => {
//     return Object.keys(selectedOptions)
//       .reduce((grandTotal, categoryName) => {
//         return (
//           grandTotal +
//           selectedOptions[categoryName]?.reduce(
//             (total, opt) => total + parseFloat(opt.amount || 0),
//             0
//           )
//         );
//       }, 0)
//       .toFixed(2);
//   };

//   useEffect(() => {
//     if (setValue) {
//       setValue(calculateGrandTotal()); // Send the grand total to the parent component
//     }
//   }, [selectedOptions, setValue]);

//   return (
//     <div className="flex flex-col items-center justify-center w-full bg-white to-gray-100 p-4">
//       {Object.keys(electric).length === 0 ? (
//         <div className="text-gray-600 text-xl">No options available.</div>
//       ) : (
//         Object.keys(electric).map((categoryName) => (
//           <div
//             key={categoryName}
//             className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 relative flex flex-col gap-4 m-2"
//           >
//             <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
//             <div>
//               <div
//                 className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-2 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//                 onClick={() => toggleDropdown(categoryName)}
//               >
//                 {selectedOptions[categoryName]?.length > 0 ? (
//                   selectedOptions[categoryName].map((option) => (
//                     <span
//                       key={option.value}
//                       className="inline-flex items-center justify-between px-1 py-1 mr-2 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
//                     >
//                       {option.label}
//                       <button
//                         className="ml-2 hover:text-blue-800 bg-white rounded-3xl text-black "
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleOption(categoryName, option);
//                         }}
//                       >
//                         &times;
//                       </button>
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-gray-500 flex items-center justify-between ">
//                     <p>Select options...</p>
//                     <IoMdAdd />
//                   </span>
//                 )}
//               </div>

//               {isDropdownOpen[categoryName] && (
//                 <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                   {electric[categoryName].map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={() => {
//                         toggleOption(categoryName, option);
//                         closeDropdown(categoryName);
//                       }}
//                       className={`cursor-pointer px-4 py-2 text-black hover:bg-blue-100 ${
//                         selectedOptions[categoryName]?.some(
//                           (opt) => opt.value === option.value
//                         )
//                           ? "bg-blue-50"
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
//                 <h2 className="text-xl font-bold text-gray-800">Set Pieces</h2>
//                 {selectedOptions[categoryName].map((option) => (
//                   <div key={option.value} className="mt-4">
//                     <h3 className="text-black font-semibold ">
//                       {option.label}
//                     </h3>
//                     <div className="flex gap-4 mt-2">
//                       <input
//                         type="number"
//                         placeholder="Pieces"
//                         min="0"
//                         className="text-black flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                         value={option.pieces || ""}
//                         onChange={(e) =>
//                           updatePieces(
//                             categoryName,
//                             option.value,
//                             parseInt(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </div>
//                     <p className="text-gray-600 text-sm mt-2">
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
//         ))
//       )}
//     </div>
//   );
// };

// export default Electric;

// import { electric } from "../static/electric";
// import { useState, useCallback, useEffect } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Electric = ({ setValues }) => {
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
//           : [...categoryOptions, { ...option, pieces: 0, amount: 0 }],
//       };
//     });
//   }, []);

//   const updatePieces = useCallback((categoryName, value, pieces) => {
//     const validPieces = isNaN(pieces) || pieces < 0 ? 0 : pieces;

//     setSelectedOptions((prev) => {
//       const updatedOptions = prev[categoryName]?.map((opt) => {
//         if (opt.value === value) {
//           const amount = validPieces * (opt.price || 0);
//           return {
//             ...opt,
//             pieces: validPieces,
//             amount: amount > 0 ? amount.toFixed(2) : 0,
//           };
//         }
//         return opt;
//       });

//       return {
//         ...prev,
//         [categoryName]: updatedOptions || [],
//       };
//     });
//   }, []);

//   const toggleDropdown = (categoryName) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [categoryName]: !prev[categoryName],
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

//   // Update the parent whenever selectedOptions changes
//   useEffect(() => {
//     const totalAmount = Object.keys(selectedOptions).reduce(
//       (total, category) => {
//         return (
//           total +
//           selectedOptions[category]?.reduce(
//             (catTotal, opt) => catTotal + parseFloat(opt.amount || 0),
//             0
//           )
//         );
//       },
//       0
//     );

//     setValues(totalAmount.toFixed(2));
//   }, [selectedOptions, setValues]);

//   return (
//     <div className="flex flex-col items-center justify-center w-full bg-white to-gray-100 p-4">
//       {Object.keys(electric).length === 0 ? (
//         <div className="text-gray-600 text-xl">No options available.</div>
//       ) : (
//         Object.keys(electric).map((categoryName) => (
//           <div
//             key={categoryName}
//             className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 relative flex flex-col gap-4 m-2"
//           >
//             <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
//             <div>
//               <div
//                 className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-2 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//                 onClick={() => toggleDropdown(categoryName)}
//               >
//                 {selectedOptions[categoryName]?.length > 0 ? (
//                   selectedOptions[categoryName].map((option) => (
//                     <span
//                       key={option.value}
//                       className="inline-flex items-center justify-between px-1 py-1 mr-2 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
//                     >
//                       {option.label}
//                       <button
//                         className="ml-2 hover:text-blue-800 bg-white rounded-3xl text-black "
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleOption(categoryName, option);
//                         }}
//                       >
//                         &times;
//                       </button>
//                     </span>
//                   ))
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
//                   {electric[categoryName].map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleOption(categoryName, option);
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
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {selectedOptions[categoryName]?.length > 0 && (
//               <div className="mt-6">
//                 <h2 className="text-xl font-bold text-gray-800">Set Pieces</h2>
//                 {selectedOptions[categoryName].map((option) => (
//                   <div key={option.value} className="mt-4">
//                     <h3 className="text-gray-700 font-semibold">
//                       {option.label}
//                     </h3>
//                     <div className="flex gap-4 mt-2">
//                       <input
//                         type="number"
//                         placeholder="Pieces"
//                         min="0"
//                         className="flex-1 bg-gray-50 border text-black border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                         value={option.pieces || ""}
//                         onChange={(e) =>
//                           updatePieces(
//                             categoryName,
//                             option.value,
//                             parseInt(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </div>
//                     <p className="text-gray-600 text-sm mt-2">
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
//         ))
//       )}
//     </div>
//   );
// };

// export default Electric;
// ***************************************************************

// import { electric } from "../static/electric";
// import { useState, useCallback, useEffect } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Electric = ({ setValues }) => {
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
//           : [...categoryOptions, { ...option, pieces: 0, amount: 0 }],
//       };
//     });
//   }, []);

//   const updatePieces = useCallback((categoryName, value, pieces) => {
//     const validPieces = isNaN(pieces) || pieces < 0 ? 0 : pieces;

//     setSelectedOptions((prev) => {
//       const updatedOptions = prev[categoryName]?.map((opt) => {
//         if (opt.value === value) {
//           const amount = validPieces * (opt.price || 0);
//           return {
//             ...opt,
//             pieces: validPieces,
//             amount: amount > 0 ? amount.toFixed(2) : 0,
//           };
//         }
//         return opt;
//       });

//       return {
//         ...prev,
//         [categoryName]: updatedOptions || [],
//       };
//     });
//   }, []);

//   const toggleDropdown = (categoryName) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [categoryName]: !prev[categoryName],
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

//   // Update the parent whenever selectedOptions changes
//   useEffect(() => {
//     const totalAmount = Object.keys(selectedOptions).reduce(
//       (total, category) => {
//         return (
//           total +
//           selectedOptions[category]?.reduce(
//             (catTotal, opt) => catTotal + parseFloat(opt.amount || 0),
//             0
//           )
//         );
//       },
//       0
//     );

//     setValues(totalAmount.toFixed(2));
//   }, [selectedOptions, updatePieces]);

//   return (
//     <div className="flex flex-col items-center justify-center w-full bg-white to-gray-100 p-4">
//       {Object.keys(electric).length === 0 ? (
//         <div className="text-gray-600 text-xl">No options available.</div>
//       ) : (
//         Object.keys(electric).map((categoryName) => (
//           <div
//             key={categoryName}
//             className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 relative flex flex-col gap-4 m-2"
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
//                   selectedOptions[categoryName].map((option) => (
//                     <span
//                       key={option.value}
//                       className="inline-flex items-center justify-between px-1 py-1 mr-2 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
//                     >
//                       {option.label}
//                       <button
//                         className="ml-2 hover:text-blue-800 bg-white rounded-3xl text-black "
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleOption(categoryName, option);
//                         }}
//                       >
//                         &times;
//                       </button>
//                     </span>
//                   ))
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
//                   {electric[categoryName].map((option) => (
//                     <div
//                       key={option.value}
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent dropdown toggle
//                         toggleOption(categoryName, option);
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
//                 <h2 className="text-xl font-bold text-gray-800">Set Pieces</h2>
//                 {selectedOptions[categoryName].map((option) => (
//                   <div key={option.value} className="mt-4">
//                     <h3 className="text-gray-700 font-semibold">
//                       {option.label}
//                     </h3>
//                     <div className="flex gap-4 mt-2">
//                       <input
//                         type="number"
//                         placeholder="Pieces"
//                         min="0"
//                         className="flex-1 bg-gray-50 border text-black border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
//                         value={option.pieces || ""}
//                         onChange={(e) =>
//                           updatePieces(
//                             categoryName,
//                             option.value,
//                             parseInt(e.target.value) || 0
//                           )
//                         }
//                       />
//                     </div>
//                     <p className="text-gray-600 text-sm mt-2">
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
//         ))
//       )}
//     </div>
//   );
// };

// export default Electric;

import { electric } from "../static/electric";
import { useState, useCallback, useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";

const Electric = ({ setValues }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const dropdownRefs = useRef({}); // Store refs for each dropdown

  const toggleOption = useCallback((categoryName, option) => {
    setSelectedOptions((prev) => {
      const categoryOptions = prev[categoryName] || [];
      return {
        ...prev,
        [categoryName]: categoryOptions.some(
          (opt) => opt.value === option.value
        )
          ? categoryOptions.filter((opt) => opt.value !== option.value)
          : [...categoryOptions, { ...option, pieces: 0, amount: 0 }],
      };
    });
  }, []);

  const updatePieces = useCallback((categoryName, value, pieces) => {
    const validPieces = isNaN(pieces) || pieces < 0 ? 0 : pieces;

    setSelectedOptions((prev) => {
      const updatedOptions = prev[categoryName]?.map((opt) => {
        if (opt.value === value) {
          const amount = validPieces * (opt.price || 0);
          return {
            ...opt,
            pieces: validPieces,
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
  }, []);

  const toggleDropdown = (categoryName) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
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

  // Update the parent whenever selectedOptions changes
  useEffect(() => {
    const totalAmount = Object.keys(selectedOptions).reduce(
      (total, category) => {
        return (
          total +
          selectedOptions[category]?.reduce(
            (catTotal, opt) => catTotal + parseFloat(opt.amount || 0),
            0
          )
        );
      },
      0
    );

    setValues(totalAmount.toFixed(2));
  }, [selectedOptions, updatePieces]);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside any of the dropdowns
      for (const key in dropdownRefs.current) {
        if (
          dropdownRefs.current[key] &&
          !dropdownRefs.current[key].contains(event.target)
        ) {
          setIsDropdownOpen((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white to-gray-100 p-4">
      {Object.keys(electric).length === 0 ? (
        <div className="text-gray-600 text-xl">No options available.</div>
      ) : (
        Object.keys(electric).map((categoryName) => (
          <div
            key={categoryName}
            className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 relative flex flex-col gap-4 m-2"
          >
            <h1 className="text-3xl font-bold text-gray-900 sticky top-0 z-10 bg-white py-2">
              {categoryName}
            </h1>
            <div>
              <div
                className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-2 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
                onClick={() => toggleDropdown(categoryName)}
                ref={(el) => (dropdownRefs.current[categoryName] = el)}
              >
                {selectedOptions[categoryName]?.length > 0 ? (
                  selectedOptions[categoryName].map((option) => (
                    <span
                      key={option.value}
                      className="inline-flex items-center justify-between px-1 py-1 mr-2 text-sm bg-gray-500 text-white font-medium rounded-full pl-3"
                    >
                      {option.label}
                      <button
                        className="ml-2 hover:text-blue-800 bg-white rounded-3xl text-black "
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(categoryName, option);
                        }}
                      >
                        &times;
                      </button>
                    </span>
                  ))
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
                  {electric[categoryName].map((option) => (
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
                <h2 className="text-xl font-bold text-gray-800">Set Pieces</h2>
                {selectedOptions[categoryName].map((option) => (
                  <div key={option.value} className="mt-4">
                    <h3 className="text-gray-700 font-semibold">
                      {option.label}
                    </h3>
                    <div className="flex gap-4 mt-2">
                      <input
                        type="number"
                        placeholder="Pieces"
                        min="0"
                        className="flex-1 bg-gray-50 border text-black border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                        value={option.pieces || ""}
                        onChange={(e) =>
                          updatePieces(
                            categoryName,
                            option.value,
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Price: {`${option.price} INR`}
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
        ))
      )}
    </div>
  );
};

export default Electric;
