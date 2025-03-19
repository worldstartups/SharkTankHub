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
        document.getElementById('season-container').innerHTML = "<p>Failed to load companies.</p>";
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
// Display filtered companies and update count
function displayCompanies(companies) {
    const container = document.getElementById('season-container');
    const countDisplay = document.getElementById('companyCount'); // Get count element
    container.innerHTML = '';

    if (companies.length === 0) {
        container.innerHTML = "<p>No companies found.</p>";
        countDisplay.textContent = "0"; // Update count when no companies match
        return;
    }

    // Create table
    let table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Table headers
    let thead = document.createElement("thead");
    thead.innerHTML = `
        <tr style="background: #222; color: white;">
            <th style="padding: 10px; border: 1px solid white;">Company Name</th>
            <th style="padding: 10px; border: 1px solid white;">Category</th>
            <th style="padding: 10px; border: 1px solid white;">Valuation</th>
            <th style="padding: 10px; border: 1px solid white;">Investor</th>
            <th style="padding: 10px; border: 1px solid white;">CEO</th>
        </tr>
    `;
    table.appendChild(thead);

    // Table body
    let tbody = document.createElement("tbody");
    companies.forEach(company => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td style="padding: 10px; border: 1px solid white;">${company.companyname}</td>
            <td style="padding: 10px; border: 1px solid white;">${company.category}</td>
            <td style="padding: 10px; border: 1px solid white;">${company.valuation}</td>
            <td style="padding: 10px; border: 1px solid white;">${company.investor}</td>
            <td style="padding: 10px; border: 1px solid white;">${company.ceo}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);

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
