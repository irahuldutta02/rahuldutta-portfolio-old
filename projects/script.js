const projectsContainer = document.querySelector(".projects");
const searchInput = document.getElementById("search__project");
const filterItemsContainer = document.querySelector(".filter-items");

// Add event listener for search input and filter items
searchInput.addEventListener("input", searchProjects);
filterItemsContainer.addEventListener("click", filterProjects);

// Fetch data from projects.json using fetch
async function getProjects() {
  const response = await fetch("projects-list.json");
  const data = await response.json();

  // Get unique filters from projects
  const filters = [...new Set(data.flatMap((project) => project.filter))];

  // Get the latest filter
  const latestFilter = data[0].filter[0].toLowerCase();

  // Generate filter items
  filterItemsContainer.innerHTML = createFilterItems(filters, latestFilter);

  // Initial render
  appendProjectsToContainer(projectsContainer, data);

  updateFilterBadgeCounts(data);
}

//calling the getProjects function
getProjects();

// calling the setProjectCount function
// every 0ms, every 500ms after the page loads
setTimeout(() => {
  setProjectCount();
  setInterval(setProjectCount, 0);
}, 500);

// faction to get the project count at any point of time
function setProjectCount() {
  const projects = document.querySelectorAll(".project__item");
  const projectCountElement = document.querySelector(".project__count");
  let projectCount = 0;
  projects.forEach((project) => {
    if (project.style.display !== "none") {
      projectCount++;
    }
  });

  if (projectCount == 0) {
    projectCountElement.style.color = "red";
    projectCountElement.textContent = `No projects found`;
  } else {
    projectCountElement.style.color = "black";
    projectCountElement.textContent = `${projectCount} projects found`;
  }

  projectCountElement.style.display = "inline-block";
}

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
  if (!event.target.closest(".filter-item")) return;
  const filterItem = event.target.closest(".filter-item");
  const selectedFilter = filterItem.classList[0];
  const allProjects = document.querySelectorAll(".project__item");
  const filters = document.querySelectorAll(".filter-item");
  const filterAllBtn = document.querySelector(".filter-all");

  if (selectedFilter == "filter-all") {
    filters.forEach((filter) => filter.classList.remove("active"));
    filterAllBtn.classList.add("active");
    allProjects.forEach((project) => {
      project.style.display = "flex";
    });

    const filterMessage = document.querySelector(".filter__message");
    filterMessage.innerHTML = "";
    filterMessage.style.display = "none";
  } else {
    filterAllBtn.classList.remove("active");
    filterItem.classList.toggle("active");
    const activeFilterItems = document.querySelectorAll(".filter-item.active");

    const activeFilters = [];
    activeFilterItems.forEach((activeFilterItem) => {
      const activeFilter = activeFilterItem.classList[0];
      activeFilters.push(activeFilter);
    });

    const activeFiltersName = activeFilters.map((element) =>
      element.replace("filter-", "")
    );

    const projects = document.querySelectorAll(".project__item");
    projects.forEach((project) => {
      const projectFilters = project.classList;

      let shouldDisplay = activeFilters.every((activeFilter) =>
        projectFilters.contains(activeFilter)
      );

      if (shouldDisplay) {
        project.style.display = "flex";
      } else {
        project.style.display = "none";
      }
    });

    const filterMessage = document.querySelector(".filter__message");
    filterMessage.style.display = "inline-block";
    const activeFiltersNameString = activeFiltersName.join(", ");
    filterMessage.innerHTML = `&nbsp Using ${activeFiltersNameString}`;

    setInterval(() => {
      const projectCountMessageColor =
        document.querySelector(".project__count").style.color;
      filterMessage.style.color = projectCountMessageColor;
    }, 0);
  }
}