// AUTO WORLD – jednoduché funkce v JavaScriptu

// Automatické doplnění aktuálního roku do patičky.
document.querySelectorAll(".current-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Rozbalovací navigace pro menší obrazovky.
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

// Vyhledávání a filtrování automobilů na stránce auta.html.
const carGrid = document.querySelector("#car-grid");

if (carGrid) {
  const searchInput = document.querySelector("#car-search");
  const filterButtons = document.querySelectorAll(".filter-button");
  const cars = document.querySelectorAll(".catalog-card");
  const resultsCount = document.querySelector("#results-count");
  const noResults = document.querySelector("#no-results");

  let activeFilter = "all";

  function filterCars() {
    const searchText = searchInput.value.trim().toLowerCase();
    let visibleCars = 0;

    cars.forEach((car) => {
      const carName = car.dataset.name.toLowerCase();
      const category = car.dataset.category;
      const matchesSearch = carName.includes(searchText);
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const isVisible = matchesSearch && matchesFilter;

      car.hidden = !isVisible;
      if (isVisible) visibleCars++;
    });

    resultsCount.textContent = `Zobrazeno automobilů: ${visibleCars}`;
    noResults.hidden = visibleCars !== 0;
  }

  searchInput.addEventListener("input", filterCars);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      filterCars();
    });
  });

  filterCars();
}

// Kontrola kontaktního formuláře na úvodní stránce.
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const formMessage = document.querySelector("#form-message");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formMessage.textContent = "Vyplňte prosím všechna pole formuláře.";
      formMessage.classList.add("error");
      return;
    }

    if (!emailPattern.test(email)) {
      formMessage.textContent = "Zadejte prosím platnou e-mailovou adresu.";
      formMessage.classList.add("error");
      return;
    }

    // Formulář je pouze ukázkový – zpráva se nikam neodesílá.
    formMessage.textContent = "Děkujeme! Formulář byl úspěšně zkontrolován.";
    formMessage.classList.remove("error");
    contactForm.reset();
  });
}
