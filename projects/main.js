document.addEventListener("DOMContentLoaded", function () {
  const filterItems = document.querySelectorAll(".portfolio-flters li");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all filters
      filterItems.forEach((filter) => {
        filter.classList.remove("active-filter");
      });

      // Add active class to the clicked filter
      item.classList.add("active-filter");

      // Get the filter value from the clicked filter
      const selectedFilter = item.classList[0]; // Assumes class structure as described

      // Toggle visibility of portfolio items based on selected filter
      portfolioItems.forEach((portfolioItem) => {
        if (selectedFilter === "filter-all") {
          portfolioItem.style.display = "flex";
        }
        
        else if (portfolioItem.classList[0] === selectedFilter) { // Assumes class structure as described
          portfolioItem.style.display = "flex";
        } else {
          portfolioItem.style.display = "none";
        }
      });
    });
  });
});
