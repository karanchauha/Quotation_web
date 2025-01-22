import React, { useRef, useState } from "react";
import Testi from "./Testi";
import Electric from "./Electric";
import Pop from "./Pop";
import Paint from "./Paint";
import Navbar from "../components/Navbar";
import Kitchen from "../pages/Kitchen";

const usePDFGenerator = (ref, filename = "document.pdf") => {
  const generatePDF = () => {
    if (!ref.current) return;

    // Clone the node to prevent unintended changes
    const element = ref.current.cloneNode(true);

    // Replace input fields with plain text for better PDF rendering
    const inputs = element.querySelectorAll("input");
    inputs.forEach((input) => {
      const processedValue = (input.value || "").replace(/\*/g, " x ");
      const textNode = document.createTextNode(processedValue);

      // Add a space if the next sibling is also an input
      if (input.nextElementSibling?.tagName === "INPUT") {
        input.parentNode.replaceChild(
          document.createTextNode(processedValue + " "),
          input
        );
      } else {
        input.parentNode.replaceChild(textNode, input);
      }
    });

    // Load html2pdf.js dynamically
    import("html2pdf.js").then((html2pdf) => {
      const options = {
        margin: 0.5,
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf.default().set(options).from(element).save();
    });
  };

  return generatePDF;
};

const Home = () => {
  const pdfRef = useRef();
  const [values_test, setValues_test] = useState({});

  const updateValue = (key, value) => {
    setValues_test((prev) => ({ ...prev, [key]: value }));
  };

  let paint = parseFloat(values_test.Paint) || 0;
  let electric = parseFloat(values_test.Electric) || 0;
  let pop = parseFloat(values_test.Pop) || 0;
  let testi = parseFloat(values_test.Testi) || 0;
  let kitchen = parseFloat(values_test.Kitchen) || 0;

  let value = paint + electric + pop + testi + kitchen;

  const generatePDF = usePDFGenerator(pdfRef, "quotation.pdf");
  return (
    <div className=" bg-white pb-10">
      <Navbar />

      <div>
        <div ref={pdfRef} id="pdf-content">
          <Testi setValues={(value) => updateValue("Testi", value)} />
          <Kitchen setValues={(value) => updateValue("Kitchen", value)} />
          <Electric setValues={(value) => updateValue("Electric", value)} />
          <Pop setValues={(value) => updateValue("Pop", value)} />
          <Paint setValues={(value) => updateValue("Paint", value)} />
        </div>
        <h2 className="text-center  text-gray-500 text-3xl font-semibold py-4 px-8 rounded-lg ">
          Grand Total: {value}
        </h2>
      </div>
      <div
        onClick={generatePDF}
        className="p-4 sm:p-5 bg-gray-500 text-white text-center text-base sm:text-xl w-3/4 sm:w-1/4 mx-auto mt-5 cursor-pointer rounded-full shadow-lg hover:bg-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Download PDF
      </div>
    </div>
  );
};

export default Home;
