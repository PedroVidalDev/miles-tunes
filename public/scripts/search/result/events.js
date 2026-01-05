import { downloadButton, thumbImage } from "./consts.js";
import { isValidYouTubeUrl } from "../../utils/isValidYouTubeUrl.js";

downloadButton.addEventListener('click', async (event) => {
    downloadButton.disabled = true;

    downloadButton.querySelector('p').style.display = 'none';
    downloadButton.querySelector('img').style.display = 'block';

    const queryParams = new URLSearchParams(window.location.search);
    const videoUrl = queryParams.get('yturl');

    if (!isValidYouTubeUrl(videoUrl)) {
        event.preventDefault();
        alert('Invalid YouTube URL. Please check the link and try again.');
        downloadButton.disabled = false;

        downloadButton.querySelector('p').style.display = 'block';
        downloadButton.querySelector('img').style.display = 'none';

        return;
    }

    const response = await fetch(`/convert?yturl=${videoUrl}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        throw new Error("Conversion failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    
    const contentDisposition = response.headers.get('Content-Disposition');
    let fileName = 'download.mp3';

    if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch && fileNameMatch.length === 2) fileName = fileNameMatch[1];
    }
    
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    downloadButton.disabled = false;

    downloadButton.querySelector('p').style.display = 'block';
    downloadButton.querySelector('img').style.display = 'none';
});

thumbImage.addEventListener('click', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const yturl = queryParams.get('yturl');

    window.open(yturl, '_blank');
})