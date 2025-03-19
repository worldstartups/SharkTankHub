document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("categoryFilter");
    const investorFilter = document.getElementById("investorFilter");
    const subcategoryFilter = document.getElementById("subcategoryFilter");

    // Sample categories (replace with real data)
    const categories = ["All", "Tech", "Health", "Finance", "Food"];
    const investors = ["All", "Aman Gupta", "Anupam Mittal", "Namita Thapar"];
    const subcategories = ["All", "EdTech", "Skin/Hair Care", "Fitness"];

    // Populate filters dynamically
    function populateDropdown(filterElement, data) {
        filterElement.innerHTML = data.map(item => `<option value="${item}">${item}</option>`).join("");
    }

    populateDropdown(categoryFilter, categories);
    populateDropdown(investorFilter, investors);
    populateDropdown(subcategoryFilter, subcategories);

    // Apply filter (You need to modify Datawrapper's embed URL based on filter selection)
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedInvestor = investorFilter.value;
        const selectedSubcategory = subcategoryFilter.value;

        console.log(`Filters: ${selectedCategory}, ${selectedInvestor}, ${selectedSubcategory}`);
        
        // Reload the Datawrapper iframe with new filter parameters (if applicable)
        const iframe = document.getElementById("datawrapper-chart");
        iframe.src = `https://datawrapper.dwcdn.net/Snw41/1/`; // Modify this URL if Datawrapper supports dynamic filtering
    }

    categoryFilter.addEventListener("change", applyFilters);
    investorFilter.addEventListener("change", applyFilters);
    subcategoryFilter.addEventListener("change", applyFilters);
});
