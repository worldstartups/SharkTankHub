document.addEventListener("DOMContentLoaded", function () {
    const startups = [
        { company: "Company A", category: "Tech", subcategory: "EdTech", investor: "Aman Gupta", valuation: "₹100 Cr", website: "https://example.com" },
        { company: "Company B", category: "Health", subcategory: "Skin/Hair Care", investor: "Namita Thapar", valuation: "₹250 Cr", website: "https://example.com" },
        { company: "Company C", category: "Finance", subcategory: "FinTech", investor: "Anupam Mittal", valuation: "₹500 Cr", website: "https://example.com" },
        { company: "Company D", category: "Tech", subcategory: "AI", investor: "Vineeta Singh", valuation: "₹200 Cr", website: "https://example.com" },
        { company: "Company E", category: "Food", subcategory: "Snacks", investor: "Peyush Bansal", valuation: "₹50 Cr", website: "https://example.com" }
    ];

    const categoryFilter = document.getElementById("categoryFilter");
    const investorFilter = document.getElementById("investorFilter");
    const subcategoryFilter = document.getElementById("subcategoryFilter");
    const tableBody = document.getElementById("tableBody");

    // Populate dropdowns dynamically
    function populateDropdown(filterElement, data) {
        filterElement.innerHTML = data.map(item => `<option value="${item}">${item}</option>`).join("");
    }

    const categories = ["All", ...new Set(startups.map(s => s.category))];
    const investors = ["All", ...new Set(startups.map(s => s.investor))];
    const subcategories = ["All", ...new Set(startups.map(s => s.subcategory))];

    populateDropdown(categoryFilter, categories);
    populateDropdown(investorFilter, investors);
    populateDropdown(subcategoryFilter, subcategories);

    // Function to display data in the table
    function displayData(filteredData) {
        tableBody.innerHTML = "";
        if (filteredData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6">No companies found.</td></tr>`;
            return;
        }

        filteredData.forEach(startup => {
            const row = `<tr>
                <td>${startup.company}</td>
                <td>${startup.category}</td>
                <td>${startup.subcategory}</td>
                <td>${startup.investor}</td>
                <td>${startup.valuation}</td>
                <td><a href="${startup.website}" target="_blank">Visit</a></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    // Filter function
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedInvestor = investorFilter.value;
        const selectedSubcategory = subcategoryFilter.value;

        const filteredData = startups.filter(s => 
            (selectedCategory === "All" || s.category === selectedCategory) &&
            (selectedInvestor === "All" || s.investor === selectedInvestor) &&
            (selectedSubcategory === "All" || s.subcategory === selectedSubcategory)
        );

        displayData(filteredData);
    }

    categoryFilter.addEventListener("change", applyFilters);
    investorFilter.addEventListener("change", applyFilters);
    subcategoryFilter.addEventListener("change", applyFilters);

    // Load all data initially
    displayData(startups);
});
