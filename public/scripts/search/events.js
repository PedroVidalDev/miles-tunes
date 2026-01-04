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

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    window.location.href = `/search?yturl=${encodeURIComponent(query)}`;
});