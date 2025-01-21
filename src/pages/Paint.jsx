// import { paint } from "../static/paint";
// import { useState } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Paint = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen((prev) => !prev);
//     setIsOptionDropdownOpen(false); // Close options dropdown if category is toggled
//   };

//   const toggleOptionDropdown = () => {
//     if (selectedCategory) {
//       setIsOptionDropdownOpen((prev) => !prev);
//     }
//   };

//   const selectCategory = (category) => {
//     setSelectedCategory(category);
//     setSelectedOption(null); // Reset option selection when category changes
//     setIsCategoryDropdownOpen(false); // Close category dropdown
//   };

//   const selectOption = (option) => {
//     setSelectedOption(option);
//     setIsOptionDropdownOpen(false); // Close options dropdown
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-white p-4 w-full">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 m-2">
//         <h1 className="text-3xl font-bold text-gray-900">Paint Options</h1>
//         {/* Category Dropdown */}
//         <div>
//           <div
//             className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//             onClick={toggleCategoryDropdown}
//           >
//             {selectedCategory ? (
//               <span className="text-gray-900 font-medium">
//                 {selectedCategory}
//               </span>
//             ) : (
//               <span className="text-gray-500 flex items-center justify-between ">
//                 <p>Select options...</p>
//                 <IoMdAdd />
//               </span>
//             )}
//           </div>

//           {isCategoryDropdownOpen && (
//             <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//               {Object.keys(paint).map((category) => (
//                 <div
//                   key={category}
//                   onClick={() => selectCategory(category)}
//                   className="cursor-pointer text-black px-4 py-2 hover:bg-blue-100"
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Options Dropdown */}
//         {selectedCategory && (
//           <div>
//             <div
//               className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//               onClick={toggleOptionDropdown}
//             >
//               {selectedOption ? (
//                 <span className="text-gray-900 font-medium">
//                   {selectedOption.label}
//                 </span>
//               ) : (
//                 <span className="text-gray-500">Select an option...</span>
//               )}
//             </div>

//             {isOptionDropdownOpen && (
//               <div className=" z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                 {paint[selectedCategory].map((option) => (
//                   <div
//                     key={option.value}
//                     onClick={() => selectOption(option)}
//                     className={`cursor-pointer text-black px-4 py-2 hover:bg-blue-100 ${
//                       selectedOption?.value === option.value ? "bg-blue-50" : ""
//                     }`}
//                   >
//                     {option.label}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Display Selected Option */}
//         {selectedOption && (
//           <div>
//             <div className="mt-2">
//               <h3 className="text-gray-700 font-semibold">
//                 {selectedOption.label}
//               </h3>
//               <p className="text-gray-600 text-sm mt-2">
//                 Price: {`${selectedOption.price} INR`}
//               </p>
//             </div>
//             <p className="text-lg font-bold text-gray-900 mt-6">
//               Total Amount: {`${selectedOption.price} INR`}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Paint;
// *************************************************************************************************************
// import { paint } from "../static/paint";
// import { useState, useEffect } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Paint = ({ setValue }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen((prev) => !prev);
//     setIsOptionDropdownOpen(false); // Close options dropdown if category is toggled
//   };

//   const toggleOptionDropdown = () => {
//     if (selectedCategory) {
//       setIsOptionDropdownOpen((prev) => !prev);
//     }
//   };

//   const selectCategory = (category) => {
//     setSelectedCategory(category);
//     setSelectedOption(null); // Reset option selection when category changes
//     setIsCategoryDropdownOpen(false); // Close category dropdown
//   };

//   const selectOption = (option) => {
//     setSelectedOption(option);
//     setIsOptionDropdownOpen(false); // Close options dropdown
//   };

//   useEffect(() => {
//     if (setValue && selectedOption) {
//       setValue(selectedOption.price); // Update parent with the selected option's price
//       // setValue(Math.floor(option.price)); // or parseInt(option.price, 10)
//     }
//   }, [selectedOption, setValue]);

//   return (
//     <div className="flex flex-col items-center justify-center bg-white p-4 w-full">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 m-2">
//         <h1 className="text-3xl font-bold text-gray-900">Paint Options</h1>

//         {/* Category Dropdown */}
//         <div>
//           <div
//             className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//             onClick={toggleCategoryDropdown}
//           >
//             {selectedCategory ? (
//               <span className="text-gray-900 font-medium">
//                 {selectedCategory}
//               </span>
//             ) : (
//               <span className="text-gray-500 flex items-center justify-between">
//                 <p>Select category...</p>
//                 <IoMdAdd />
//               </span>
//             )}
//           </div>

//           {isCategoryDropdownOpen && (
//             <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//               {Object.keys(paint).map((category) => (
//                 <div
//                   key={category}
//                   onClick={() => selectCategory(category)}
//                   className="cursor-pointer px-4 py-2 hover:bg-blue-100 text-black"
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Options Dropdown */}
//         {selectedCategory && (
//           <div>
//             <div
//               className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//               onClick={toggleOptionDropdown}
//             >
//               {selectedOption ? (
//                 <span className="text-gray-900 font-medium">
//                   {selectedOption.label}
//                 </span>
//               ) : (
//                 <span className="text-gray-500">Select an option...</span>
//               )}
//             </div>

//             {isOptionDropdownOpen && (
//               <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                 {paint[selectedCategory].map((option) => (
//                   <div
//                     key={option.value}
//                     onClick={() => selectOption(option)}
//                     className={`cursor-pointer px-4 py-2 hover:bg-blue-100 text-black ${
//                       selectedOption?.value === option.value ? "bg-blue-50" : ""
//                     }`}
//                   >
//                     {option.label}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Display Selected Option */}
//         {selectedOption && (
//           <div>
//             <div className="mt-2">
//               <h3 className="text-gray-700 font-semibold">
//                 {selectedOption.label}
//               </h3>
//               <p className="text-gray-600 text-sm mt-2">
//                 Price: {`${selectedOption.price} INR`}
//               </p>
//             </div>
//             <p className="text-lg font-bold text-gray-900 mt-6">
//               Total Amount: {`${selectedOption.price} INR`}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Paint;

// import { paint } from "../static/paint";
// import { useEffect, useState } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Paint = ({ setValues }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen((prev) => !prev);
//     setIsOptionDropdownOpen(false); // Close options dropdown if category is toggled
//   };

//   const toggleOptionDropdown = () => {
//     if (selectedCategory) {
//       setIsOptionDropdownOpen((prev) => !prev);
//     }
//   };

//   const selectCategory = (category) => {
//     setSelectedCategory(category);
//     setSelectedOption(null); // Reset option selection when category changes
//     setIsCategoryDropdownOpen(false); // Close category dropdown
//   };

//   const selectOption = (option) => {
//     setSelectedOption(option);
//     setIsOptionDropdownOpen(false); // Close options dropdown
//     // setValues(option.price); // Pass the selected price to the parent
//   };

//   // useEffect(() => {
//   //   Object.keys(selectedOption).forEach((selectedCategory) => {
//   //     setValues(option.price); // Send category total directly to the parent
//   //   });
//   // }, [selectOption]);

//   useEffect(() => {
//     if (selectedOption) {
//       setValues(selectedOption.price); // Update parent when selectedOption changes
//     }
//   }, [selectedOption, setValues]);

//   return (
//     <div className="flex flex-col items-center justify-center bg-white p-4 w-full">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 m-2">
//         <h1 className="text-3xl font-bold text-gray-900">Paint Options</h1>

//         {/* Category Dropdown */}
//         <div>
//           <div
//             className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//             onClick={toggleCategoryDropdown}
//           >
//             {selectedCategory ? (
//               <span className="text-gray-900 font-medium">
//                 {selectedCategory}
//               </span>
//             ) : (
//               <span className="text-gray-500 flex items-center justify-between">
//                 <p>Select options...</p>
//                 <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1 ">
//                   <IoMdAdd />
//                 </div>
//               </span>
//             )}
//           </div>

//           {isCategoryDropdownOpen && (
//             <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//               {Object.keys(paint).map((category) => (
//                 <div
//                   key={category}
//                   onClick={() => selectCategory(category)}
//                   className="cursor-pointer text-black px-4 py-2 hover:bg-blue-100"
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Options Dropdown */}
//         {selectedCategory && (
//           <div>
//             <div
//               className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//               onClick={toggleOptionDropdown}
//             >
//               {selectedOption ? (
//                 <span className="text-gray-900 font-medium">
//                   {selectedOption.label}
//                 </span>
//               ) : (
//                 <span className="text-gray-500">Select an option...</span>
//               )}
//             </div>

//             {isOptionDropdownOpen && (
//               <div className=" z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                 {paint[selectedCategory].map((option) => (
//                   <div
//                     key={option.value}
//                     onClick={() => selectOption(option)}
//                     className={`cursor-pointer text-black px-4 py-2 hover:bg-blue-100 ${
//                       selectedOption?.value === option.value ? "bg-blue-50" : ""
//                     }`}
//                   >
//                     {option.label}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Display Selected Option */}
//         {selectedOption && (
//           <div>
//             <div className="mt-2">
//               <h3 className="text-gray-700 font-semibold">
//                 {selectedOption.label}
//               </h3>
//               <p className="text-gray-600 text-sm mt-2">
//                 Price: {`${selectedOption.price} INR`}
//               </p>
//             </div>
//             <p className="text-lg font-bold text-gray-900 mt-6">
//               Total Amount: {`${selectedOption.price} INR`}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Paint;

// import { paint } from "../static/paint";
// import { useEffect, useState } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Paint = ({ setValues }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen((prev) => !prev);
//     if (!isCategoryDropdownOpen) setIsOptionDropdownOpen(false);
//   };

//   const toggleOptionDropdown = () => {
//     if (selectedCategory) {
//       setIsOptionDropdownOpen((prev) => !prev);
//     }
//   };

//   const selectCategory = (category) => {
//     setSelectedCategory(category);
//     setSelectedOption(null);
//     setIsCategoryDropdownOpen(false);
//   };

//   const selectOption = (option) => {
//     setSelectedOption(option);
//     setIsOptionDropdownOpen(false);
//     setValues(option.price); // Send the selected price to the parent
//   };

//   useEffect(() => {
//     if (selectedOption) {
//       setValues(!selectedOption.price ? 0 : selectedOption.price); // Update parent when selectedOption changes
//     }
//   }, [selectedOption, setValues]);

//   return (
//     <div className="flex flex-col items-center justify-center bg-white p-4 w-full">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 m-2">
//         <h1 className="text-3xl font-bold text-gray-900">Paint Options</h1>

//         {/* Category Dropdown */}
//         <div>
//           <div
//             className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//             onClick={toggleCategoryDropdown}
//           >
//             {selectedCategory ? (
//               <span className="text-gray-900 font-medium">
//                 {selectedCategory},{console.log(selectedCategory)}
//               </span>
//             ) : (
//               <span className="text-gray-500 flex items-center justify-between">
//                 <p>Select a category...</p>
//                 <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1">
//                   <IoMdAdd />
//                 </div>
//               </span>
//             )}
//           </div>

//           {isCategoryDropdownOpen && (
//             <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//               {Object.keys(paint).map((category) => (
//                 <div
//                   key={category}
//                   onClick={() => selectCategory(category)}
//                   className="cursor-pointer text-black px-4 py-2 hover:bg-blue-100"
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Options Dropdown */}
//         {selectedCategory && (
//           <div>
//             <div
//               className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//               onClick={toggleOptionDropdown}
//             >
//               {selectedOption ? (
//                 <span className="text-gray-900 font-medium">
//                   {selectedOption.label}
//                 </span>
//               ) : (
//                 <span className="text-gray-500">Select an option...</span>
//               )}
//             </div>

//             {isOptionDropdownOpen && (
//               <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                 {paint[selectedCategory].map((option) => (
//                   <div
//                     key={option.value}
//                     onClick={() => selectOption(option)}
//                     className={`cursor-pointer text-black px-4 py-2 hover:bg-blue-100 ${
//                       selectedOption?.value === option.value ? "bg-blue-50" : ""
//                     }`}
//                   >
//                     {option.label}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Display Selected Option */}
//         {selectedOption && (
//           <div className="mt-4">
//             <h3 className="text-gray-700 font-semibold">
//               {selectedOption.label}
//             </h3>
//             <p className="text-gray-600 text-sm mt-2">
//               Price: {`${selectedOption.price} INR`}
//             </p>
//             <p className="text-lg font-bold text-gray-900 mt-4">
//               Total Amount: {`${selectedOption.price || 0} INR`}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Paint;

// import { paint } from "../static/paint";
// import { useState } from "react";
// import { IoMdAdd } from "react-icons/io";

// const Paint = ({ setValues }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen((prev) => !prev);
//     setIsOptionDropdownOpen(false); // Close options dropdown when toggling category dropdown
//   };

//   const toggleOptionDropdown = () => {
//     if (selectedCategory) {
//       setIsOptionDropdownOpen((prev) => !prev);
//     }
//   };

//   const selectCategory = (category) => {
//     setSelectedCategory(category);
//     setSelectedOption(null); // Reset the selected option when category changes
//     setIsCategoryDropdownOpen(false); // Close the dropdown
//     setValues(0);
//   };

//   const selectOption = (option) => {
//     setSelectedOption(option);
//     setIsOptionDropdownOpen(false); // Close the dropdown
//     setValues(option.price || 0); // Update the parent with the selected price or 0 if not defined
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-white p-4 w-full">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 m-2">
//         <h1 className="text-3xl font-bold text-gray-900">Paint Options</h1>

//         {/* Category Dropdown */}
//         <div>
//           <div
//             className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//             onClick={toggleCategoryDropdown}
//           >
//             {selectedCategory ? (
//               <span className="text-gray-900 font-medium">
//                 {selectedCategory}
//               </span>
//             ) : (
//               <span className="text-gray-500 flex items-center justify-between">
//                 <p>Select a category...</p>
//                 <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1">
//                   <IoMdAdd />
//                 </div>
//               </span>
//             )}
//           </div>

//           {isCategoryDropdownOpen && (
//             <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//               {Object.keys(paint).map((category) => (
//                 <div
//                   key={category}
//                   onClick={() => selectCategory(category)}
//                   className="cursor-pointer text-black px-4 py-2 hover:bg-blue-100"
//                 >
//                   {category}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Options Dropdown */}
//         {selectedCategory && (
//           <div>
//             <div
//               className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
//               onClick={toggleOptionDropdown}
//             >
//               {selectedOption ? (
//                 <span className="text-gray-900 font-medium">
//                   {selectedOption.label}
//                 </span>
//               ) : (
//                 <span className="text-gray-500">Select an option...</span>
//               )}
//             </div>

//             {isOptionDropdownOpen && (
//               <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//                 {paint[selectedCategory].map((option) => (
//                   <div
//                     key={option.value}
//                     onClick={() => selectOption(option)}
//                     className={`cursor-pointer text-black px-4 py-2 hover:bg-blue-100 ${
//                       selectedOption?.value === option.value ? "bg-blue-50" : ""
//                     }`}
//                   >
//                     {option.label}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Display Selected Option */}
//         {selectedOption && (
//           <div className="mt-4">
//             <h3 className="text-gray-700 font-semibold">
//               {selectedOption.label}
//             </h3>
//             <p className="text-gray-600 text-sm mt-2">
//               Price: {`${selectedOption.price || 0} INR`}
//             </p>
//             <p className="text-lg font-bold text-gray-900 mt-4">
//               Total Amount: {`${selectedOption.price || 0} INR`}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Paint;

import { paint } from "../static/paint";
import { useState, useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";

const Paint = ({ setValues }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

  const categoryRef = useRef(null);
  const optionRef = useRef(null);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen((prev) => !prev);
    setIsOptionDropdownOpen(false); // Close options dropdown when toggling category dropdown
  };

  const toggleOptionDropdown = () => {
    if (selectedCategory) {
      setIsOptionDropdownOpen((prev) => !prev);
    }
  };

  const selectCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect the category if it's already selected
      setValues(0); // Reset value when deselecting the category
    } else {
      setSelectedCategory(category); // Select the new category
      setSelectedOption(null); // Reset the selected option when category changes
      setIsCategoryDropdownOpen(false); // Close the dropdown
      setValues(0); // Reset the value to 0 if no option selected
    }
  };

  const selectOption = (option) => {
    if (selectedOption?.value === option.value) {
      setSelectedOption(null); // Deselect the option if it's already selected
      setValues(0); // Reset value when deselecting the option
    } else {
      setSelectedOption(option); // Select the new option
      setValues(option.price || 0); // Update the value with the selected price
    }
    setIsOptionDropdownOpen(false); // Close the dropdown after selection or deselection
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target) &&
        optionRef.current &&
        !optionRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
        setIsOptionDropdownOpen(false);
      }
    };

    // Adding the event listener to detect clicks outside the dropdowns
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 w-full">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 m-2">
        <h1 className="text-3xl font-bold text-gray-900">Paint Options</h1>

        {/* Category Dropdown */}
        <div ref={categoryRef}>
          <div
            className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
            onClick={toggleCategoryDropdown}
          >
            {selectedCategory ? (
              <span className="text-gray-900 font-medium">
                {selectedCategory}
              </span>
            ) : (
              <span className="text-gray-500 flex items-center justify-between">
                <p>Select a category...</p>
                <div className="hover:scale-110 transition-all text-white bg-gray-400 rounded-full p-1">
                  <IoMdAdd />
                </div>
              </span>
            )}
          </div>

          {isCategoryDropdownOpen && (
            <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {Object.keys(paint).map((category) => (
                <div
                  key={category}
                  onClick={() => selectCategory(category)}
                  className={`cursor-pointer text-black px-4 py-2 hover:bg-blue-100 ${
                    selectedCategory === category ? "bg-blue-50" : ""
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Options Dropdown */}
        {selectedCategory && (
          <div ref={optionRef}>
            <div
              className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg px-4 py-2 cursor-pointer hover:ring-2 hover:ring-blue-300"
              onClick={toggleOptionDropdown}
            >
              {selectedOption ? (
                <span className="text-gray-900 font-medium">
                  {selectedOption.label}
                </span>
              ) : (
                <span className="text-gray-500">Select an option...</span>
              )}
            </div>

            {isOptionDropdownOpen && (
              <div className="z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                {paint[selectedCategory].map((option) => (
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
        )}

        {/* Display Selected Option */}
        {selectedOption && (
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold">
              {selectedOption.label}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Price: {`${selectedOption.price || 0} INR`}
            </p>
            <p className="text-lg font-bold text-gray-900 mt-4">
              Total Amount: {`${selectedOption.price || 0} INR`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paint;
