$(document).ready(function () {
    let table = $("#startupTable").DataTable();

    function fetchSeasonData(seasonFile) {
        $.getJSON(seasonFile, function (data) {
            table.clear();
            $("#categoryFilter").html('<option value="All">All</option>');
            $("#investorFilter").html('<option value="All">All</option>');
            
            let categorySet = new Set();
            let investorSet = new Set();

            data.forEach(item => {
                table.row.add([
                    item.company,
                    item.category,
                    item.subcategory,
                    item.investor,
                    `₹${item.valuation} Cr`,
                    `<a href="${item.website}" target="_blank">Visit</a>`
                ]);

                categorySet.add(item.category);
                investorSet.add(item.investor);
            });

            $("#companyCount").text(data.length);
            
            categorySet.forEach(category => {
                $("#categoryFilter").append(`<option value="${category}">${category}</option>`);
            });

            investorSet.forEach(investor => {
                $("#investorFilter").append(`<option value="${investor}">${investor}</option>`);
            });

            table.draw();
        });
    }

    fetchSeasonData("season1.json");

    $(".season-tab").on("click", function () {
        $(".season-tab").removeClass("active");
        $(this).addClass("active");
    });

    $("#categoryFilter, #investorFilter").on("change", function () {
        let category = $("#categoryFilter").val();
        let investor = $("#investorFilter").val();

        table.columns(1).search(category !== "All" ? category : "").draw();
        table.columns(3).search(investor !== "All" ? investor : "").draw();

        $("#companyCount").text(table.rows({ filter: "applied" }).count());
    });
});
