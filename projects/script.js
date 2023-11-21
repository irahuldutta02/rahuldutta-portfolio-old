// Fetch data from projects.json using fetch
async function getProjects() {
  const response = await fetch("projects-list.json");
  const data = await response.json();

  const projectsContainer = document.querySelector(".projects");
  const searchInput = document.getElementById("search__project");
  const filterItemsContainer = document.querySelector(".filter-items");

  // Get unique filters from projects
  const filters = [...new Set(data.flatMap((project) => project.filter))];

  // Get the latest filter
  const latestFilter = data[0].filter[0].toLowerCase();

  // Generate filter items
  filterItemsContainer.innerHTML = createFilterItems(filters, latestFilter);

  // Initial render
  appendProjectsToContainer(projectsContainer, data);

  // Add event listener for search input and filter items
  searchInput.addEventListener("input", searchProjects);
  filterItemsContainer.addEventListener("click", filterProjects);

  // Function to update projects based on search input
  function searchProjects() {
    const filterAllBtn = document.querySelector(".filter-all");
    filterAllBtn.click();
    const searchTerm = searchInput.value;
    const allProjectTitle = document.querySelectorAll(".project__title h2");

    allProjectTitle.forEach((title) => {
      const project =
        title.parentElement.parentElement.parentElement.parentElement;
      const titleValue = title.textContent.toLowerCase();

      if (titleValue.includes(searchTerm.toLowerCase())) {
        project.style.display = "flex";
      } else {
        project.style.display = "none";
      }
    });
  }

  // Function to update projects based on selected filter
  function filterProjects(event) {
    const filterItem = event.target.closest(".filter-item");
    const selectedFilter = filterItem.classList[0];
    const allProjects = document.querySelectorAll(".project__item");

    // Remove active class from all filter items
    document
      .querySelectorAll(".filter-item")
      .forEach((item) => item.classList.remove("active"));
    // add active class to the selected filter item
    filterItem.classList.add("active");

    if (selectedFilter == "filter-all") {
      allProjects.forEach((project) => {
        project.style.display = "flex";
      });
    } else {
      allProjects.forEach((project) => {
        if (project.classList.contains(selectedFilter)) {
          project.style.display = "flex";
        } else {
          project.style.display = "none";
        }
      });
    }
  }

  updateFilterBadgeCounts(data);
}

getProjects();

// Function to create a project card HTML string
function createProjectCardHTML(project) {
  // for ui-ux projects
  if (project.filter.includes("ui-ux")) {
    const filterClasses = project.filter
      .map((filter) => `filter-${filter.toLowerCase()}`)
      .join(" ");
    return `
    <div class="project__item ${filterClasses}">
      <div class="project__preview">
        <img src="${project.preview}" alt="preview" class="project__image">
      </div>
      <div class="project__details">
        <div class="project__head">
          <div class="project__title">
            <h2>${project.title}</h2>
          </div>
          <div class="project__tech__stacks">
            Using: ${project.techStack
              .map(
                (tech) => `<span class="project__tech__stack">${tech}</span> `
              )
              .join("")}
          </div>
          <div class="project__notes">
            <p>${project.note}</p>
          </div>
        </div>
        <div class="project__btns">
          <a target="_blank" href="${project.link}" class="project__btn">
            <i class="fab fa-figma"></i>
          </a>
        </div>
      </div>
    </div>
  `;
  }

  // for java only projects
  if (project.filter.includes("java")) {
    const filterClasses = project.filter
      .map((filter) => `filter-${filter.toLowerCase()}`)
      .join(" ");
    return `
    <div class="project__item ${filterClasses}">
      <div class="project__preview">
        <img src="${project.preview}" alt="preview" class="project__image">
      </div>
      <div class="project__details">
        <div class="project__head">
          <div class="project__title">
            <h2>${project.title}</h2>
          </div>
          <div class="project__tech__stacks">
            Using: ${project.techStack
              .map(
                (tech) => `<span class="project__tech__stack">${tech}</span> `
              )
              .join("")}
          </div>
          <div class="project__notes">
            <p>${project.note}</p>
          </div>
        </div>
        <div class="project__btns">
          <a target="_blank" href="${project.code}" class="project__btn">
            <i class="fab fa-github"></i>
          </a>
          <a target="_blank" href="${project.download}" class="project__btn">
            <i class="fas fa-download"></i>
          </a>
        </div>
      </div>
    </div>
  `;
  }

  // for every other projects
  const filterClasses = project.filter
    .map((filter) => `filter-${filter.toLowerCase()}`)
    .join(" ");
  return `
    <div class="project__item ${filterClasses}">
      <div class="project__preview">
        <img src="${project.preview}" alt="preview" class="project__image">
      </div>
      <div class="project__details">
        <div class="project__head">
          <div class="project__title">
            <h2>${project.title}</h2>
          </div>
          <div class="project__tech__stacks">
            Using: ${project.techStack
              .map(
                (tech) => `<span class="project__tech__stack">${tech}</span> `
              )
              .join("")}
          </div>
          <div class="project__notes">
            <p>${project.note}</p>
          </div>
        </div>
        <div class="project__btns">
          <a target="_blank" href="${project.livePreview}" class="project__btn">
            <i class="fa-solid fa-link"></i>
          </a>
          <a target="_blank" href="${project.code}" class="project__btn">
            <i class="fa-brands fa-github"></i>
          </a>
          <a target="_blank" href="${project.download}" class="project__btn">
            <i class="fa-solid fa-download"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}
// Function to create filter items based on available filters
function createFilterItems(filters, latestFilter) {
  // Add "All" filter option
  const filterItems = ["all", ...filters];

  return filterItems
    .map(
      (filter) => `
    <li class="filter-${filter.toLowerCase()} filter-item ${
        filter === "all" ? "active" : ""
      }">
      ${filter} <span class="badge"></span>
      ${latestFilter === filter ? "<span class='badge-new'>New</span>" : ""}
    </li>
  `
    )
    .join("");
}

// Function to append project cards to the projects container
function appendProjectsToContainer(container, projects) {
  container.innerHTML = projects
    .map((project) => {
      const html = createProjectCardHTML(project);
      return html;
    })
    .join("");
}

// Function to count projects for each filter and update badge elements
function updateFilterBadgeCounts(projects) {
  const allFilters = document.querySelectorAll(".filter-item");
  const filterCounts = {};
  filterCounts["filter-all"] = projects.length;

  allFilters.forEach((filter) => {
    const filterName = filter.classList[0];
    if (filterName !== "filter-all") {
      const elementCount = document.querySelectorAll(
        `.projects .${filterName}`
      ).length;
      filterCounts[filterName] = elementCount;
    }
  });

  for (const key in filterCounts) {
    const filterItemBadge = document.querySelector(`.${key} .badge`);
    if (filterItemBadge) {
      filterItemBadge.textContent = filterCounts[key];
    }
  }
}
