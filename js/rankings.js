// Populate trust rankings table
function populateRankingsTable() {
    const tableBody = document.getElementById('rankingsTable');
    tableBody.innerHTML = '';
    
    // Update last updated timestamp
    document.getElementById('lastUpdated').textContent = trustData.lastUpdated;
    
    // Sort users by trust score
    const sortedUsers = [...trustData.users].sort((a, b) => b.trustScore - a.trustScore);
    
    // Add each user to the table
    sortedUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.dataset.username = user.username;
        
        // Add rank
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);
        
        // Add username with link to Twitter
        const usernameCell = document.createElement('td');
        const usernameLink = document.createElement('a');
        usernameLink.href = `https://twitter.com/${user.username}`;
        usernameLink.target = '_blank';
        usernameLink.className = 'twitter-link';
        usernameLink.textContent = `@${user.username}`;
        usernameCell.appendChild(usernameLink);
        row.appendChild(usernameCell);
        
        // Add trust score
        const scoreCell = document.createElement('td');
        scoreCell.textContent = user.trustScore.toFixed(4);
        row.appendChild(scoreCell);
        
        // Add number of trustors
        const trustorsCell = document.createElement('td');
        trustorsCell.textContent = user.trustors;
        row.appendChild(trustorsCell);
        
        // Add number of trustees
        const trusteesCell = document.createElement('td');
        trusteesCell.textContent = user.trustees;
        row.appendChild(trusteesCell);
        
        // Add row to table
        tableBody.appendChild(row);
        
        // Add click event to show user details
        row.addEventListener('click', () => {
            window.location.href = `network.html?user=${user.username}`;
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#rankingsTable tr');
        
        rows.forEach(row => {
            const username = row.dataset.username;
            if (!username) return;
            
            if (username.toLowerCase().includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateRankingsTable();
    setupSearch();
});