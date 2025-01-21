// import { useState } from "react";

// export default function ButtonTwo({ onModularChange }) {
//   const [isFullModular, setIsFullModular] = useState(false);

//   const handleClick = () => {
//     const newValue = !isFullModular;
//     setIsFullModular(newValue);
//     onModularChange(newValue); // Pass the updated value to the parent
//   };

//   return (
//     <div className="flex items-center justify-center gap-16 w-full">
//       <h2
//         onClick={handleClick}
//         className={`text-2xl font-semibold px-4 py-2 rounded-full cursor-pointer shadow-lg
//           ${
//             !isFullModular
//               ? "text-white bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg"
//               : "text-gray-800 border-gray-300 bg-white"
//           }
//           hover:bg-gray-100 transition duration-300`}
//       >
//         Semi Modular
//       </h2>
//       <h2
//         onClick={handleClick}
//         className={`text-2xl font-semibold px-6 py-3 rounded-full cursor-pointer shadow-lg
//             ${
//               isFullModular
//                 ? "text-white bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg"
//                 : "text-gray-800 border-gray-300 bg-white"
//             }
//           hover:bg-gray-100 transition duration-300`}
//       >
//         Full Modular
//       </h2>
//     </div>
//   );
// }

import { useState } from "react";

export default function ButtonTwo({ onModularChange }) {
  const [isFullModular, setIsFullModular] = useState(false);

  const handleClick = () => {
    const newValue = !isFullModular;
    setIsFullModular(newValue);
    onModularChange(newValue); // Pass the updated value to the parent
  };

  return (
    <div className="flex items-center justify-center gap-8 sm:gap-16 w-full">
      <h2
        onClick={handleClick}
        className={`text-lg sm:text-2xl font-semibold px-4 py-2 rounded-full cursor-pointer shadow-lg 
          ${
            !isFullModular
              ? "text-white bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg"
              : "text-gray-800 border-gray-300 bg-white"
          } 
          hover:bg-gray-100 transition duration-300`}
      >
        Semi Modular
      </h2>
      <h2
        onClick={handleClick}
        className={`text-lg sm:text-2xl font-semibold px-6 py-3 rounded-full cursor-pointer shadow-lg 
            ${
              isFullModular
                ? "text-white bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg"
                : "text-gray-800 border-gray-300 bg-white"
            } 
          hover:bg-gray-100 transition duration-300`}
      >
        Full Modular
      </h2>
    </div>
  );
}
