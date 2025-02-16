document.getElementById('transferButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const videoId = extractVideoId(currentTab.url);
        if (videoId) {
            const newUrl = `data:text/html,<html><body><div style="position:relative;padding-bottom:56.25%;height:0;"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div></body></html>`;
            chrome.tabs.create({ url: newUrl });
        } else {
            alert('Это не видео YouTube.');
        }
    });
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
