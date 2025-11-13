import { loadHeaderFooter } from "./utils.mjs";
import { initModalHandlers } from "./register.mjs";

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
  // Increment click counter for the session
  if (sessionStorage.clickcount) {
    sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
  } else {
    sessionStorage.clickcount = 1;
  }

  // ✅ Only show modal the very first time the user visits Home this session
  if (sessionStorage.clickcount == 1) {
    initModalHandlers();
    document.querySelector('.register-modal').showModal();
  }
});