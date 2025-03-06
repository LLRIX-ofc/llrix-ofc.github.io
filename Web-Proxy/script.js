const PROXY_URL = "https://proxy-bg98.onrender.com";

async function fetchPage() {
    const userInput = document.getElementById('urlInput').value.trim();
    if (!userInput) {
        alert("Please enter a URL!");
        return;
    }

    let formattedUrl = userInput;

    
    if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = 'https://' + formattedUrl;
    }

    const proxyFetchUrl = `${PROXY_URL}/fetch?url=${encodeURIComponent(formattedUrl)}`;

    try {
        const response = await fetch(proxyFetchUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        
        document.getElementById('output').src = proxyFetchUrl;
    } catch (error) {
        console.error("Fetch failed:", error);
        alert("Failed to load page.");
    }
}
