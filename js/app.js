document.addEventListener('DOMContentLoaded', function () {
    // Default to Power Rankings page on load
    showPage('powerRankings');

    // Data for the charts
    const teams = ['Nick', 'Kendall', 'Calvin', 'Matt', 'Aaron', 'Anthony', 'Karan', 'Henry', 'Rohan', 'Shaun', 'Alfred', 'John', 'Prashant', 'Minh', 'Joey', 'Zack'];
    const wins = [3, 5, 4, 2, 3, 3, 2, 7, 5, 5, 6, 4, 5, 4, 7, 6];
    const avgPoints = [112, 110, 108, 96, 94, 90, 90, 118, 110, 110, 108, 102, 104, 102, 106, 118];
    const consistencyRank = [8, 10, 9, 12, 14, 15, 16, 4, 6, 6, 5, 11, 7, 12, 9, 5];
    const expectedWins = [5, 6, 4, 3, 2, 2, 2, 8, 5, 6, 7, 3, 6, 4, 6, 7];

    // Initialize the charts after page load
    createCharts(teams, wins, avgPoints, consistencyRank, expectedWins);
});

// Function to switch between Power Rankings and Advanced Analysis pages
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active'); // Show the selected page
        } else {
            page.classList.remove('active'); // Hide other pages
        }
    });

    // Ensure that the charts render correctly if switching to Advanced Analysis
    if (pageId === 'advancedAnalysis') {
        const ctx = document.getElementById('winsChart').getContext('2d');
        renderWinsChart(ctx);
        Plotly.Plots.resize(document.getElementById('quadrant-chart'));
        Plotly.Plots.resize(document.getElementById('consistency-chart'));
    }
}

// Function to create the Plotly charts
function createCharts(teams, wins, avgPoints, consistencyRank, expectedWins) {
    // 1. Quadrant chart (Wins vs Avg Points)
    const quadrantData = [
        {
            x: wins,
            y: avgPoints,
            text: teams,
            mode: 'markers+text',
            textposition: 'top center',
            type: 'scatter',
            marker: { size: 10 }
        }
    ];

    const quadrantLayout = {
        title: 'Wins vs Avg Points',
        xaxis: { title: 'Wins', showgrid: true, zeroline: true },
        yaxis: { title: 'Avg Points', showgrid: true, zeroline: true },
        responsive: true
    };

    Plotly.newPlot('quadrant-chart', quadrantData, quadrantLayout);

    // 2. Avg Points vs Consistency Rank (Flipped axis)
    const consistencyData = [
        {
            x: avgPoints,
            y: consistencyRank,
            text: teams,
            mode: 'markers+text',
            textposition: 'top center',
            type: 'scatter',
            marker: { size: 10 }
        }
    ];

    const consistencyLayout = {
        title: 'Avg Points vs Consistency Rank (Flipped)',
        xaxis: { title: 'Avg Points' },
        yaxis: { title: 'Consistency Rank', autorange: 'reversed' },
        responsive: true
    };

    Plotly.newPlot('consistency-chart', consistencyData, consistencyLayout);
}

// Function to render the horizontal bar chart for Expected Wins vs Actual Wins
function renderWinsChart(ctx) {
    const teams = ['Nick', 'Kendall', 'Calvin', 'Matt', 'Aaron', 'Anthony', 'Karan', 'Henry', 'Rohan', 'Shaun', 'Alfred', 'John', 'Prashant', 'Minh', 'Joey', 'Zack'];
    const wins = [3, 5, 4, 2, 3, 3, 2, 7, 5, 5, 6, 4, 5, 4, 7, 6];
    const expectedWins = [5, 6, 4, 3, 2, 2, 2, 8, 5, 6, 7, 3, 6, 4, 6, 7];

    // Sort by expected wins in descending order
    const sortedTeams = teams.map((team, i) => ({
        team: team,
        wins: wins[i],
        expectedWins: expectedWins[i]
    })).sort((a, b) => b.expectedWins - a.expectedWins);

    const sortedLabels = sortedTeams.map(item => item.team);
    const sortedWins = sortedTeams.map(item => item.wins);
    const sortedExpectedWins = sortedTeams.map(item => item.expectedWins);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [
                {
                    label: 'Actual Wins',
                    data: sortedWins,
                    backgroundColor: 'rgba(0, 123, 255, 0.6)', // Blue
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expected Wins',
                    data: sortedExpectedWins,
                    backgroundColor: 'rgba(40, 167, 69, 0.6)', // Green
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y', // Horizontal bar chart
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Wins'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Teams'
                    }
                }
            }
        }
    });
}
