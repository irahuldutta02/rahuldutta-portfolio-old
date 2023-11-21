document.addEventListener("DOMContentLoaded", function () {
  const filterItems = document.querySelectorAll(".portfolio-flters li");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      filterItems.forEach((filter) => {
        filter.classList.remove("active-filter");
      });

      item.classList.add("active-filter");
      item.classList.remove("animate-pulse");

      const selectedFilter = item.classList[0];

      portfolioItems.forEach((portfolioItem) => {
        if (selectedFilter === "filter-all") {
          portfolioItem.style.display = "flex";
        } else if (portfolioItem.classList.contains(selectedFilter)) {
          portfolioItem.style.display = "flex";
        } else {
          portfolioItem.style.display = "none";
        }
      });
    });
  });

  filterItems.forEach((item) => {
    const selectedFilter = item.classList[0];
    const count = getProjectCount(selectedFilter);

    const countSpan = item.querySelector(".badge");
    if (countSpan) {
      countSpan.textContent = count;
    }
  });

  function getProjectCount(filterClass) {
    let count = 0;

    portfolioItems.forEach((portfolioItem) => {
      if (
        filterClass === "filter-all" ||
        portfolioItem.classList.contains(filterClass)
      ) {
        count++;
      }
    });

    return count;
  }
});
