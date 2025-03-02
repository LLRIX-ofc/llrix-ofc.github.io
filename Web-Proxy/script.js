const BACKEND_URL = "https://web-proxy-backend.nintendoreward2.repl.co"; // Change this

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
