// utils/ocrService.js
import Tesseract from "tesseract.js";

export const verifyStudentOCR = async (imageUrl, studentName, rollNumber) => {
  try {
    console.log(`📝 Starting OCR on: ${imageUrl}`);

    const { data: { text } } = await Tesseract.recognize(imageUrl, "eng", {
      // logger: (m) => console.log(m), // Uncomment to see progress bars
    });

    const extractedText = text.toLowerCase().replace(/\s+/g, " "); // Clean text
    const nameCheck = studentName.toLowerCase();
    const rollCheck = rollNumber.toLowerCase(); // Ensure roll no is treated as string

    console.log("📄 Extracted Text:", extractedText);

    // CHECK 1: Does the text contain the Roll Number? (Strict check)
    const rollMatch = extractedText.includes(rollCheck);

    // CHECK 2: Does the text contain the Name? (Partial match allowed)
    // We split name into parts (e.g., "Rahul Sharma" -> ["rahul", "sharma"])
    // and ensure at least the first name exists in the card.
    const nameParts = nameCheck.split(" ");
    const nameMatch = nameParts.some((part) => extractedText.includes(part));

    if (rollMatch && nameMatch) {
      return { success: true, text: extractedText };
    } else {
      return { success: false, text: extractedText };
    }
  } catch (error) {
    console.error("❌ OCR Error:", error);
    return { success: false, error: error.message };
  }
};