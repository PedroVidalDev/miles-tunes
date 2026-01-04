import { searchButton, searchInput } from "./consts.js";
import { isValidYouTubeUrl } from "../utils/isValidYouTubeUrl.js";

searchInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    
    if (isValidYouTubeUrl(inputValue)) {
        searchButton.style.display = "block";
    } else {
        searchButton.style.display = "none";
    }
});