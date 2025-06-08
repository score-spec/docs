const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
const tabPanes = document.querySelectorAll('.tab-pane');

const activateTab = (tab) => {
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');

  const tabId = tab.getAttribute('id');
  tabPanes.forEach((tabPane) => {
    if (tabPane.getAttribute('aria-labelledby') === tabId) {
      tabPane.classList.add('active');
      tabPane.classList.add('show');
    }
  });
};

const deactivateTab = (tab) => {
  tab.classList.remove('active');
  tab.setAttribute('aria-selected', 'false');
  tab.setAttribute('tabindex', '-1');

  const tabId = tab.getAttribute('id');
  tabPanes.forEach((tabPane) => {
    if (tabPane.getAttribute('aria-labelledby') === tabId) {
      tabPane.classList.remove('active');
      tabPane.classList.remove('show');
    }
  });
};

const activateFirstTab = () => {
  const activeTabs = document.querySelectorAll('.nav-tabs');
  activeTabs.forEach((activeTab) => {
    const hasActiveTab = activeTab.querySelector(
      "button[aria-selected='true']"
    );
    if (!hasActiveTab) {
      const firstTab = activeTab.querySelector('button');
      activateTab(firstTab);
    }
  });
};

const activeTab = localStorage.getItem('activeTab');
if (activeTab) {
  tabs.forEach((tab) => {
    if (tab.innerHTML === activeTab) {
      activateTab(tab);
    } else {
      deactivateTab(tab);
    }
  });
  activateFirstTab();
}

const reinitMermaidInTab = (tabPane) => {
  const mermaidDiagrams = tabPane.querySelectorAll('.language-mermaid');
  if (mermaidDiagrams.length === 0) return;

  mermaidDiagrams.forEach((ele) => {
    ele.innerHTML = ele.getAttribute('data-src') || '';
    ele.removeAttribute('data-processed');
  });

  if (localStorage.getItem('theme') === 'dark') {
    window.mermaid.init(window.darkModeConfig || {}, mermaidDiagrams);
  } else {
    window.mermaid.init(window.lightModeConfig || {}, mermaidDiagrams);
  }
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const innerHTML = tab.innerHTML;
    localStorage.setItem('activeTab', innerHTML);
    tabs.forEach((tab) => {
      if (tab.innerHTML === innerHTML) {
        activateTab(tab);

        const tabId = tab.getAttribute('id');
        tabPanes.forEach((tabPane) => {
          if (tabPane.getAttribute('aria-labelledby') === tabId) {
            setTimeout(() => reinitMermaidInTab(tabPane), 10);
          }
        });
      } else {
        deactivateTab(tab);
      }
    });
    activateFirstTab();
  });
});
