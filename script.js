// Find the button that opens and closes the mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");
// Find the navigation menu that the button controls.
const siteNav = document.querySelector(".site-nav");
// Find the footer element that displays the current year.
const currentYear = document.querySelector("#current-year");

// Update the year only when the footer element exists.
if (currentYear) {
  // Show the current year so the copyright date stays up to date.
  currentYear.textContent = new Date().getFullYear();
}

// Set up the menu only when both the button and menu are on the page.
if (menuToggle && siteNav) {
  // Create a helper that closes the menu and updates its accessibility labels.
  const closeMenu = () => {
    // Tell assistive technologies that the menu is collapsed.
    menuToggle.setAttribute("aria-expanded", "false");
    // Update the button label to describe opening the menu.
    menuToggle.setAttribute("aria-label", "Open navigation");
    // Hide the menu by removing its open-state class.
    siteNav.classList.remove("is-open");
  };

  // Toggle the menu whenever the button is clicked.
  menuToggle.addEventListener("click", () => {
    // Check whether the menu is currently open.
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    // Update the button's expanded state to the opposite of its current state.
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    // Change the button label to match the action it will perform next.
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    // Show the menu when opening it, or hide it when closing it.
    siteNav.classList.toggle("is-open", !isOpen);
  });

  // Listen for clicks on links inside the navigation menu.
  siteNav.addEventListener("click", (event) => {
    // Close the menu after a navigation link is selected.
    if (event.target instanceof HTMLAnchorElement) {
      // Use the helper to hide the menu and reset its labels.
      closeMenu();
    }
  });

  // Listen for keyboard presses across the page.
  document.addEventListener("keydown", (event) => {
    // Let the Escape key close the menu.
    if (event.key === "Escape") {
      // Close the menu and reset its accessibility labels.
      closeMenu();
      // Return keyboard focus to the menu button.
      menuToggle.focus();
    }
  });

  // Listen for clicks anywhere on the page.
  document.addEventListener("click", (event) => {
    // Check that the menu is open and the click was outside both menu and button.
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      event.target instanceof Node &&
      !siteNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      // Close the menu after an outside click.
      closeMenu();
    }
  });
}
