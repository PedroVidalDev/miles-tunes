import { convertButton, converterInput } from "./consts.js";
import { isValidYouTubeUrl } from "../utils/isValidYouTubeUrl.js";

converterInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    
    if (isValidYouTubeUrl(inputValue)) {
        convertButton.style.display = "block";
    } else {
        convertButton.style.display = "none";
    }
});