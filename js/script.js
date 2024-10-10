document.addEventListener('DOMContentLoaded', function () {
    // Replace this URL with the URL to your JSON file
    const url = '/data.json'; 

    async function fetchRankings() {
        try {
            const response = await fetch(url);
            const data = await response.json();

            const container = document.getElementById('powerRankingsContainer');
            
            data.forEach((team, index) => {
                // Create a card for each team
                const card = document.createElement('div');
                card.classList.add('card');

                // Populate the card with team details
                card.innerHTML = `
                    <div class="card-left">
                        <div class="power-rank">${team["Power Ranking"]}</div> <!-- Power Rank -->
                    </div>
                    <div class="card-right">
                        <div class="card-right-header">
                            <h2>${team["Team Name"]} (${team.Manager})</h2>
                        </div>
                        <div class="card-right-details">
                            <p>Change: ${team["Power Ranking Change"]}<br>Record: ${team.Wins}-${team.Losses}<br>Avg Points: ${team["AVG POINTS"]}<br>BOOM%: ${team["BOOM%"]}</p>
                            <p>Scoring Rank: ${ordinalSuffix(team["Scoring Rank"])}<br>Consistency Rank: ${ordinalSuffix(team["Consistency Rank"])}<br>Roster Rank: ${ordinalSuffix(team["Roster Rank"])}<br>BUST%: ${team["BUST%"]}</p>
                        </div>
                        <div class="card-right-outlook">
                            <p>${team["Write-up"]}</p>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Helper function to add ordinal suffix to ranking numbers
    function ordinalSuffix(i) {
        const j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    // Fetch the rankings data on page load
    fetchRankings();
});
