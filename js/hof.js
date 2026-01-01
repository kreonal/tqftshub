document.addEventListener('DOMContentLoaded', function () {
    const url = 'js/tqfts_hof.json';  // Path to your JSON file

    async function fetchHOFData() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const container = document.getElementById('hofContainer');

            data.forEach((manager, index) => {

                // Create a card for each manager
                const card = document.createElement('div');
                card.classList.add('card');

                // Create left and right sections
                const cardLeft = document.createElement('div');
                cardLeft.classList.add('card-left');
                const cardRight = document.createElement('div');
                cardRight.classList.add('card-right');

                // Check if HOF score is 100 or greater and apply the gold background
                if (manager["New HOF Score"] >= 100) {
                    console.log(`Applying gold background for: ${manager.Manager}`);  // Log for verification
                    card.style.backgroundColor = '#d29e1f';  // Gold background
                    cardLeft.style.setProperty('background-color', 'none', 'important');  // Force gold on left section
                    cardRight.style.backgroundColor = 'white';  // Gold for right section
                }

                

                // Populate the card with manager details
                card.innerHTML = `
                    <div class="card-left">
                        <div class="power-rank">${manager["HOF Rank"]}</div> <!-- HOF Score -->
                    </div>
                    <div class="card-right">
                        <div class="card-right-header">
                            <h2>${manager.Manager}, (${manager["Years Active"]})
                        </div>
                        <div class="card-right-details">
                            <p>HOF Score: ${manager["New HOF Score"]}<br>Seasons: ${manager.Years}<br>Score/Season: ${manager["AVG HOF Score Per Season"]}<br>Wins: ${manager.Wins}<br>Win %: ${(manager["Win %"] * 100).toFixed(2)}%</p>
                            <p>Playoff Appearances: ${manager["Playoff Appearances"]}<br>Championships: ${manager.Championships}<br>2nd Place: ${manager["Second Place"]}<br>3rd Place: ${manager["Third Place"]}<br>Scoring Titles: ${manager["Scoring Titles"]}</p>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching Hall of Fame data:', error);
        }
    }

    // Fetch Hall of Fame data on page load
    fetchHOFData();
});
