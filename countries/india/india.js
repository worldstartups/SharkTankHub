// Fetch and display companies from JSON
async function fetchSeasonData(seasonFile) {
    try {
        const response = await fetch(seasonFile);
        const companyData = await response.json();
        displayCompanies(companyData);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('season-container').innerHTML = "<p>Failed to load companies.</p>";
    }
}

// Display companies as cards
function displayCompanies(companies) {
    const container = document.getElementById('season-container');
    container.innerHTML = '';

    if (companies.length === 0) {
        container.innerHTML = "<p>No companies found for this season.</p>";
        return;
    }

    companies.forEach(company => {
        const card = document.createElement('div');
        card.classList.add('company-card');
        card.innerHTML = `
            <h3>${company.companyname}</h3>
            <p><strong>Category:</strong> ${company.category}</p>
            <p><strong>Valuation:</strong> ${company.Valuation}</p>
            <p><strong>Investor:</strong> ${company.Investor}</p>
            <p><strong>CEO:</strong> ${company.CEO}</p>
        `;
        container.appendChild(card);
    });
}

// Filter Function
function applyFilters() {
    const category = document.getElementById('filter-category').value;
    const investor = document.getElementById('filter-investor').value;
    const valuation = document.getElementById('filter-valuation').value;

    fetch(currentSeasonFile)
        .then(response => response.json())
        .then(data => {
            let filteredData = data;

            if (category !== "All") {
                filteredData = filteredData.filter(c => c.category === category);
            }
            if (investor !== "All") {
                filteredData = filteredData.filter(c => c.Investor === investor);
            }
            if (valuation !== "All") {
                const range = valuation.split('-').map(Number);
                filteredData = filteredData.filter(c => c.Valuation >= range[0] && c.Valuation <= range[1]);
            }

            displayCompanies(filteredData);
        });
}

// Event Listeners for Filters
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filter-category").addEventListener("change", applyFilters);
    document.getElementById("filter-investor").addEventListener("change", applyFilters);
    document.getElementById("filter-valuation").addEventListener("change", applyFilters);
});

// Load Season 1 by default
let currentSeasonFile = "season1.json";
fetchSeasonData(currentSeasonFile);

