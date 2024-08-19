export const htmlToText = (htmlString: string): string => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    // Extract the plain text, with formatting evaluated
    return tempElement.textContent || tempElement.innerText || "";
  };