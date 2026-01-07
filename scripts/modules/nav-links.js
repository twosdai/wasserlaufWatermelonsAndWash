export function initNavLinks() {
  document.querySelectorAll(".social a").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Link not implemented yet!");
    });
  });
}
