import { downloadButton } from "./consts.js";
import { isValidYouTubeUrl } from "../../utils/isValidYouTubeUrl.js";

downloadButton.addEventListener('click', async (event) => {
    const queryParams = new URLSearchParams(window.location.search);
    const videoUrl = queryParams.get('yturl');

    if (!isValidYouTubeUrl(videoUrl)) {
        event.preventDefault();
        alert('Invalid YouTube URL. Please check the link and try again.');
    }

    await fetch(`/convert?yturl=${videoUrl}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
});
