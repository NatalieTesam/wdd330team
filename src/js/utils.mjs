// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// return product parameters 
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param); // return product
}

export function renderWithTemplate(templateFn, parent, data) {
  parent.innerHTML = templateFn(data);
}

// Helper to render a list of template items
export function renderList(templateFn, parent, list) {
  const htmlList = list.map(templateFn).join("");
  parent.innerHTML = htmlList;
}

export async function renderHTMLWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear=true) {
    // get template using function...no need to loop this time.
    if (clear) {
        parentElement.innerHTML = "";
    }
    const htmlString = await templateFn(data);
    parentElement.insertAdjacentHTML(position, htmlString);
    if(callback) {
        callback(data);
    }
}

function loadTemplate(path) {
    // wait what?  we are returning a new function? 
    // this is called currying and can be very helpful.
    return async function () {
        const res = await fetch(path);
        if (res.ok) {
          const html = await res.text();
          return html;
        }
    };
} 

export function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const header = qs("header");
  const footer = qs("footer");
  
  renderHTMLWithTemplate(headerTemplateFn, header);
  renderHTMLWithTemplate(footerTemplateFn, footer);
}