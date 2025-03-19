let allCompanies = [];
let currentSeasonFile = "season1.json"; // Default season

// Fetch and display companies from JSON
async function fetchSeasonData(seasonFile) {
    try {
        const response = await fetch(seasonFile);
        allCompanies = await response.json();
        currentSeasonFile = seasonFile;
        populateFilters();
        applyFilters(); // Ensures all companies are shown initially
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('startupTableBody').innerHTML = "<tr><td colspan='6'>Failed to load companies.</td></tr>";
        document.getElementById('companyCount').textContent = "0"; // Set count to 0 on failure
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

// Apply filters and update count
function applyFilters() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedInvestor = document.getElementById('investorFilter').value;
    const selectedValuation = document.getElementById('valuationFilter').value;

    let filteredCompanies = [...allCompanies]; // Copy all companies initially

    if (selectedCategory !== "All") {
        filteredCompanies = filteredCompanies.filter(company => company.category === selectedCategory);
    }

    if (selectedInvestor !== "All") {
        filteredCompanies = filteredCompanies.filter(company => company.investor === selectedInvestor);
    }

    if (selectedValuation !== "All") {
        const [min, max] = selectedValuation.split('-').map(Number);
        filteredCompanies = filteredCompanies.filter(company => {
            const valuation = parseFloat(company.valuation.replace(/[₹, Cr]/g, "").trim()); // Fixed valuation parsing
            return valuation >= min && valuation <= max;
        });
    }

    displayCompanies(filteredCompanies);
}

// Display filtered companies in table format and update count
function displayCompanies(companies) {
    const tableBody = document.getElementById('startupTableBody');
    const countDisplay = document.getElementById('companyCount'); // Get count element
    tableBody.innerHTML = '';

    if (companies.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6'>No companies found.</td></tr>";
        countDisplay.textContent = "0"; // Update count when no companies match
        return;
    }

    companies.forEach(company => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${company.companyname}</td>
            <td>${company.category}</td>
            <td>${company.subcategory}</td>
            <td>${company.investor}</td>
            <td>₹${company.valuation} Cr</td>
            <td><a href="${company.website}" target="_blank">Visit</a></td>
        `;
        tableBody.appendChild(row);
    });

    // Update the count display
    countDisplay.textContent = companies.length;
}

// Load Season 1 by default
document.addEventListener("DOMContentLoaded", function () {
    fetchSeasonData(currentSeasonFile);
    document.getElementById('categoryFilter').addEventListener("change", applyFilters);
    document.getElementById('investorFilter').addEventListener("change", applyFilters);
    document.getElementById('valuationFilter').addEventListener("change", applyFilters);
});
