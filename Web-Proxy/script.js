const BACKEND_URL = "https://c95973d1-a909-449e-8c1c-4661734cd9e6-00-2jjuaky79g363.sisko.replit.dev/"; // Change this

function loadWebsite() {
    let url = document.getElementById('urlInput').value;
    
    // Ensure correct format
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    fetch(`${BACKEND_URL}/fetch?url=${encodeURIComponent(url)}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('displayFrame').srcdoc = data;
        })
        .catch(error => console.error('Error fetching website:', error));
}
