export function displayFirstLanguageInfo(data: any) {
  if (data && typeof data === "object") {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const firstLanguage = keys[0]; // Get the first language key
      const names = data[firstLanguage]; // Get the data for the first language

      // Format the output
      const outputHtml = `<p><strong>Official Name:</strong> ${names.official}</p>`;

      // Display the formatted information in the HTML
      return outputHtml;
    } else {
      return "<p>No language data available.</p>";
    }
  } else {
    return "<p>Data is not available or is not an object.</p>";
  }
}

export function formatAndDisplayIDD(data: any) {
  const root = data.root;
  const suffixes = data.suffixes;

  // Concatenate root and suffixes
  const formattedValue = `${root}${suffixes?.join("")}`;

  return formattedValue;
}
