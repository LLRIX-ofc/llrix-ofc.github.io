const BACKEND_URL = "https://proxy-bg98.onrender.com"; // Change this!

function loadWebsite() {
    let url = document.getElementById('urlInput').value;

    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    document.getElementById('displayFrame').src = `${BACKEND_URL}/fetch?url=${encodeURIComponent(url)}`;
}
