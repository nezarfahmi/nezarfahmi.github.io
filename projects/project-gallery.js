document.querySelectorAll("[data-project-gallery]").forEach((gallery) => {
  const buttons = Array.from(
    gallery.querySelectorAll("[data-gallery-index]")
  );

  const image = gallery.querySelector("[data-gallery-image]");
  const link = gallery.querySelector("[data-gallery-link]");

  const label = gallery.querySelector(".schematic-current-label");
  const file = gallery.querySelector(".schematic-current-file");

  const previous = gallery.querySelector("[data-gallery-previous]");
  const next = gallery.querySelector("[data-gallery-next]");

  const currentCounter = gallery.querySelector("[data-gallery-current]");
  const totalCounter = gallery.querySelector("[data-gallery-total]");

  let currentIndex = 0;

  totalCounter.textContent = buttons.length;

  function showSheet(index) {
    currentIndex = (index + buttons.length) % buttons.length;

    const selected = buttons[currentIndex];

    const imagePath = selected.dataset.galleryImageSrc;
    const imageLabel = selected.dataset.galleryLabel;
    const fileName = selected.dataset.galleryFile;

    image.src = imagePath;
    image.alt = imageLabel;

    link.href = imagePath;

    label.textContent = imageLabel;
    file.textContent = fileName;

    currentCounter.textContent = currentIndex + 1;

    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle(
        "is-active",
        buttonIndex === currentIndex
      );

      button.setAttribute(
        "aria-current",
        buttonIndex === currentIndex ? "true" : "false"
      );
    });
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showSheet(index);
    });
  });

  previous.addEventListener("click", () => {
    showSheet(currentIndex - 1);
  });

  next.addEventListener("click", () => {
    showSheet(currentIndex + 1);
  });

  showSheet(0);
});