let allCompanies = [];
let currentSeasonFile = "season1.json"; // Default season

// Fetch and display companies from JSON
async function fetchSeasonData(seasonFile) {
    try {
        const response = await fetch(seasonFile);
        allCompanies = await response.json();
        currentSeasonFile = seasonFile;
        populateFilters();
        displayCompanies(allCompanies);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('season-container').innerHTML = "<p>Failed to load companies.</p>";
    }
}

// Populate filter dropdowns dynamically
function populateFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const investorFilter = document.getElementById('investorFilter');

    const categories = ["All", ...new Set(allCompanies.map(company => company.category))];
    const investors = ["All", ...new Set(allCompanies.map(company => company.investor))];

    categoryFilter.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    investorFilter.innerHTML = investors.map(inv => `<option value="${inv}">${inv}</option>`).join('');
}

// Apply filters to the company list
function applyFilters() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedInvestor = document.getElementById('investorFilter').value;
    const selectedValuation = document.getElementById('valuationFilter').value;

    let filteredCompanies = allCompanies;

    if (selectedCategory !== "All") {
        filteredCompanies = filteredCompanies.filter(company => company.category === selectedCategory);
    }

    if (selectedInvestor !== "All") {
        filteredCompanies = filteredCompanies.filter(company => company.investor === selectedInvestor);
    }

    if (selectedValuation !== "All") {
        const [min, max] = selectedValuation.split('-').map(Number);
        filteredCompanies = filteredCompanies.filter(company => {
            const valuation = parseInt(company.valuation.replace('₹', '').replace(' Cr', ''));
            return valuation >= min && valuation <= max;
        });
    }

    displayCompanies(filteredCompanies);
}

// Display filtered companies
function displayCompanies(companies) {
    const container = document.getElementById('season-container');
    container.innerHTML = '';

    if (companies.length === 0) {
        container.innerHTML = "<p>No companies found.</p>";
        return;
    }

    companies.forEach(company => {
        const card = document.createElement('div');
        card.classList.add('company-card');
        card.innerHTML = `
            <h3>${company.name}</h3>
            <p><strong>Category:</strong> ${company.category}</p>
            <p><strong>Valuation:</strong> ${company.valuation}</p>
            <p><strong>Investor:</strong> ${company.investor}</p>
            <p><strong>CEO:</strong> ${company.ceo}</p>
        `;
        container.appendChild(card);
    });
}

// Load Season 1 by default
document.addEventListener("DOMContentLoaded", function () {
    fetchSeasonData(currentSeasonFile);
    document.getElementById('categoryFilter').addEventListener("change", applyFilters);
    document.getElementById('investorFilter').addEventListener("change", applyFilters);
    document.getElementById('valuationFilter').addEventListener("change", applyFilters);
});
