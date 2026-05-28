const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

async function fetchCardData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Assuming 'data.data' contains the card information
        const cards = data.data;

        // Sort and display the top 20 popular cards here
        displayTopCards(cards);
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
}

function displayTopCards(cards) {
    // Here you would implement your logic to determine the top 20 cards
    // For now, let's just log the data to see what we get
    console.log(cards);
}

