const BACKEND_URL = "https://your-render-backend.onrender.com"; // Change this

function loadWebsite() {
    let url = document.getElementById('urlInput').value;

    if (!url.startsWith('http') && !/\.\w{2,}/.test(url)) {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    document.getElementById('displayFrame').src = `${BACKEND_URL}/fetch?url=${encodeURIComponent(url)}`;
}

// Run search when pressing Enter
function handleKey(event) {
    if (event.key === "Enter") {
        loadWebsite();
    }
}
