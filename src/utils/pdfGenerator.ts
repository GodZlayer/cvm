import html2pdf from "html2pdf.js";

export const generatePDF = (
  elementId: string,
  filename: string = "resume.pdf",
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }

  const opt = {
    margin: [10, 10, 10, 10],
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true) as HTMLElement;

  // Apply print-specific styles
  clonedElement.style.width = "100%";
  clonedElement.style.padding = "20px";
  clonedElement.style.backgroundColor = "white";

  // Create a temporary container
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.appendChild(clonedElement);
  document.body.appendChild(container);

  // Generate PDF
  html2pdf()
    .from(clonedElement)
    .set(opt)
    .save()
    .then(() => {
      // Clean up
      document.body.removeChild(container);
    });
};
