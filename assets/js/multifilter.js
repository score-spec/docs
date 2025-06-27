const examplesContainer = document.getElementById("examples-container");
const filters = document.querySelectorAll(".form-check-input");
const listItems = document.querySelectorAll(".examples-list-item");
const pageCount = document.getElementById("pagecount");
const urlParams = new URLSearchParams(window.location.search);

// Check inputs based on query parameters
filters.forEach((filter) => {
  const type = filter.dataset.directory;
  const value = filter.value;
  if (urlParams.has(type)) {
    const values = urlParams.get(type).split("+");
    if (values.includes(value)) {
      filter.checked = true;
    }
  }
});

filterCheckedItems();

filters.forEach((filter) => {
  filter.addEventListener("change", () => {
    let queryParams = filterCheckedItems();

    let path = window.location.pathname;
    if (window.location.pathname.endsWith("/")) {
      path = window.location.pathname.slice(0, -1);
    }
    if (path !== "/" + examplesContainer.dataset.folder) {
      path = "/" + examplesContainer.dataset.folder;
      window.location.href = path + queryParams;
    }
    window.history.pushState(null, null, path + queryParams);
  });
});

function filterCheckedItems() {
  const checkedFilters = getCheckedFilters();
  let queryParams = getQueryParams(checkedFilters);

  filterItems(checkedFilters);
  updatePageCount();
  return queryParams;
}

function getCheckedFilters() {
  return Array.from(filters)
    .filter((filter) => filter.checked)
    .map((filter) => ({
      type: filter.dataset.directory,
      value: filter.value,
    }));
}

function updatePageCount() {
  if (pageCount) {
    const visibleItems = Array.from(listItems).filter(
      (item) => item.style.display === "block"
    );
    pageCount.textContent = visibleItems.length;
  }
}

function filterItems(checkedFilters) {
  // Step 1: Separate filters by type
  const filtersByType = checkedFilters.reduce((acc, filter) => {
    if (!acc[filter.type]) {
      acc[filter.type] = [];
    }
    acc[filter.type].push(filter.value);
    return acc;
  }, {});

  // Step 2: Apply UNION logic
  let unionResults = Array.from(listItems);
  Object.entries(filtersByType).forEach(([type, values]) => {
    unionResults = unionResults.filter((item) => {
      if (item.dataset[type] && item.dataset[type].startsWith("[")) {
        const array = item.dataset[type].slice(1, -1).split(" ");
        return values.some((value) => array.includes(value));
      }
      return values.some((value) => item.dataset[type] === value);
    });
  });

  // Step 3: Apply INTERSECTION logic
  // For each item, check if it matches all filters of different types
  const intersectionResults = unionResults.filter((item) => {
    return Object.entries(filtersByType).every(([type, values]) => {
      // If the item has a data attribute for this type, check if it matches any value
      if (item.dataset[type]) {
        if (item.dataset[type].startsWith("[")) {
          const array = item.dataset[type].slice(1, -1).split(" ");
          return values.some((value) => array.includes(value));
        }
        return values.includes(item.dataset[type]);
      }
      // If the item doesn't have a data attribute for this type, it doesn't match
      return false;
    });
  });

  // Update the display of list items based on the intersection results
  listItems.forEach((item) => {
    item.style.display = intersectionResults.includes(item) ? "block" : "none";
  });
}

function getQueryParams(checkedFilters) {
  // Group objects by type
  const groupedData = checkedFilters.reduce((acc, obj) => {
    if (!acc[obj.type]) {
      acc[obj.type] = [];
    }
    acc[obj.type].push(obj.value);
    return acc;
  }, {});

  // Construct query parameters
  let queryParams = "";
  Object.keys(groupedData).forEach((key) => {
    const values = groupedData[key].join("%2B");
    queryParams += `&${key}=${values}`;
  });

  // Append '?' to the beginning if there are query parameters
  if (queryParams.length > 0) {
    queryParams = "?" + queryParams.substring(1);
  }
  return queryParams;
}
