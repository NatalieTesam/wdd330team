function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function getAlert(category = "alert") {
  return fetch(`./json/${category}.json`)
    .then(convertToJson)
    .catch((error) => console.error("Error fetching alert data"));
}

async function showAllAlerts() {
  const alerts = await getAlert(); // fetch JSON
  const container = document.querySelector(".alert");
  container.innerHTML = "";

  // show each alert by its index
  alerts.forEach((alert) => {
    const alertDiv = document.createElement("div");
    alertDiv.innerHTML =
      '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
      alert.message;
    alertDiv.style.backgroundColor = alert.background;
    alertDiv.style.color = alert.color;
    alertDiv.style.padding = "15px";
    alertDiv.style.margin = "5px";
    alertDiv.style.borderRadius = "6px";

    container.appendChild(alertDiv);
  });
  const main = document.querySelector("main");
  main.prepend(alertSection);
}

document.addEventListener("DOMContentLoaded", showAllAlerts);
