import { searchButton, searchInput } from "./consts.js";
import { isValidYouTubeUrl } from "../../utils/isValidYouTubeUrl.js";

searchInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    
    if (isValidYouTubeUrl(inputValue)) {
        searchButton.style.display = "block";
    } else {
        searchButton.style.display = "none";
    }
});

searchButton.addEventListener("click", async () => {
    const query = searchInput.value;

    try {

        const response = await fetch(`/search?yturl=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        
        if (data.isValid) {
            window.location.href = `/result?yturl=${encodeURIComponent(query)}`;
        } else {
            alert("Link do video invalido");
        }
    } catch (error) {
        alert("Erro ao buscar o video. Tente novamente mais tarde.");
    }
});