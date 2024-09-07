document.addEventListener('DOMContentLoaded', function () {
    const sheetID = '1Lsc9Oa4haWxAs-SBky6NC7QLH72Q7PQan6oMXLsZfGw'; // Replace with your actual sheet ID
    const apiKey = 'AIzaSyCFWMwOfHIVzQNPuWoIOyYKlBbmzjZNRh8'; // Replace with your API key
    const sheetName = 'ChatGPT_Output';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            populatePowerRankings(rows);
        })
        .catch(error => console.error('Error fetching data:', error));
});





function populatePowerRankings(rows) {
    const container = document.getElementById('powerRankingsContainer');
    rows.slice(1).forEach((row, index) => {
        const teamName = row[1];
        const manager = row[2];
        const lastRank = row[13];
        const rankChange = row[14]; // Rank change field
        const record = `${row[3]}-${row[4]}`;
        const avgPoints = row[6];
        const consistencyRank = row[11];
        const rosterRank = row[10];
        const writeUp = row[15];
        const scoringRank = row[16];

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="card-left">
                ${index + 1} <!-- Power Rank Number -->
            </div>
            <div class="card-right">
                <div class="card-right-header">
                    <h2>${teamName} (${manager})</h2>
                </div>
                <div class="card-right-details">
                    <p>Change: ${rankChange > 0 ? "+" : ""}${rankChange}<br>Record: ${record}<br>PPG: ${avgPoints}</p>
                    <p>Scoring Rank: ${ordinalSuffix(scoringRank)}<br>Consistency Rank: ${ordinalSuffix(consistencyRank)}<br>Roster Rank: ${ordinalSuffix(rosterRank)}</p>
                </div>
                <div class="card-right-outlook">
                    <p>${writeUp}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}


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
