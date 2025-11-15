// modalHandlers.js (or inside a <script> tag)
export function initModalHandlers() {
  const registerModal = document.querySelector('.register-modal');
  const confirmationModal = document.querySelector('.confirmationModal');
  const form = registerModal.querySelector('form');
  const closeBtn = registerModal.querySelector('.close');

  // When the form is submitted
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent <dialog> from closing automatically
    registerModal.close();  // hide the register modal
    confirmationModal.showModal(); // show the confirmation
  });

  // When the "I don't like prizes!" button is clicked
  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    registerModal.close();
  });

  // Optional: close confirmation on click or after delay
  confirmationModal.addEventListener('click', () => {
    confirmationModal.close();
  });
}
