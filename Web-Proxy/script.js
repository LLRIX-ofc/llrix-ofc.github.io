const BACKEND_URL = "https://c95973d1-a909-449e-8c1c-4661734cd9e6-00-2jjuaky79g363.sisko.replit.dev"; // Change this!

function loadWebsite() {
    let url = document.getElementById('urlInput').value;

    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    document.getElementById('displayFrame').src = `${BACKEND_URL}/fetch?url=${encodeURIComponent(url)}`;
}
