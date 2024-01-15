const projectsList = document.querySelector(".projects-list");
const logoButton = document.querySelector(".logo");
const subtitle = document.querySelector("#subtitle");
const HTMLButton = document.querySelector("#HTML");
const CSSButton = document.querySelector("#CSS");
const JSButton = document.querySelector("#JavaScript");
const EasyButton = document.querySelector("#Easy");
const MediumButton = document.querySelector("#Medium");
const DifficultButton = document.querySelector("#Difficult");
// Function to do API call, retrieves json response and set it to the data variable

const database = "https://projects-database.onrender.com"

async function getAllProjects() {
  const response = await fetch(`${database}/projects`, {
    method: "GET",
  });
  const data = await response.json();
  return data.data;
}

async function getProjectById(id) {
  const response = await fetch(`${database}/projects/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  return data.data;
}

getAllProjects();

// We can now use this function for the event listeners
function displaySearchData(searchData) {
  for (let i = 0; i < searchData.length; i++) {
    //create new list item
    const listItem = document.createElement("li");
    //set class of new list item to createdData
    listItem.setAttribute("class", "list-item createdData");
    //create data-container div
    const dataContainer = document.createElement("div");
    // set class of new div
    dataContainer.setAttribute("class", "data-container createdData");
    //create image-container div
    const imageContainer = document.createElement("div");
    // set class of new div
    imageContainer.setAttribute("class", "image-container createdData");
    // create img tag
    const suggestedPImage = document.createElement("img");
    // set class of new div
    suggestedPImage.setAttribute("class", "suggested-p-image createdData");
    suggestedPImage.setAttribute("src", "");
    if (searchData[i].language == "HTML") {
      suggestedPImage.src = "./Images/HTML.png";
    } else if (searchData[i].language == "CSS") {
      suggestedPImage.src = "./Images/CSS.png";
    } else if (searchData[i].language == "JS") {
      suggestedPImage.src = "./Images/JS.png";
    }
    suggestedPImage.setAttribute("alt", "html");
    //new div called project-text
    const projectText = document.createElement("div");
    //set class to project-text
    projectText.setAttribute("class", "project-text createdData");
    //create h3 element
    const projectTitle = document.createElement("h3");
    //set inner text
    projectTitle.innerHTML = `${searchData[i].name}`;
    // create p element
    const projectDescription = document.createElement("p");
    //set inner text
    projectDescription.textContent = `${searchData[i].short_description}`;
    //build the div structure
    projectText.appendChild(projectTitle);
    projectText.appendChild(projectDescription);
    imageContainer.appendChild(suggestedPImage);
    dataContainer.appendChild(imageContainer);
    dataContainer.appendChild(projectText);
    listItem.appendChild(dataContainer);
    projectsList.appendChild(listItem);

    listItem.addEventListener("click", async () => {
      getAndDisplayDetail(searchData[i].id);
    });

    subtitle.innerHTML = "Suggested Projects";
  }
}

function displayDetail(searchData) {
  for (let i = 0; i < searchData.length; i++) {
    //create list item
    const listItem = document.createElement("li");
    //create new detail container div
    const detailContainer = document.createElement("div");
    //set class of new list item to detail-container createdData
    detailContainer.className = "detail-container createdData";
    //create detail-title div
    const detailTitle = document.createElement("div");
    // set class of new div
    detailTitle.className = "detail-title createdData";
    //create h3 element
    const detailTitleH3 = document.createElement("h3");
    // set content of h3 element
    detailTitleH3.innerHTML = searchData[i].name;
    //create p element
    const detailDescription = document.createElement("p");
    // set content of p element
    detailDescription.textContent = searchData[i].long_description;
    // create image container
    const detailImage = document.createElement("div");
    // set class of new div
    detailImage.className = "detail-image createdData";
    // create img tag
    const suggestedImage = document.createElement("img");
    // set class of new div
    suggestedImage.className = "suggested-image createdData";
    // set src for image
    suggestedImage.setAttribute("src", "./Images/login_ss.webp");
    // set alt text
    suggestedImage.alt = "project preview";
    //new URL called div
    const detailURL = document.createElement("div");
    //set class to detail-url
    detailURL.className = "detail-url createdData";
    //set inner text
    detailURL.innerHTML = `${searchData[i].url}`;
    // create div element
    const detailLang = document.createElement("div");
    // set class and innerHTML
    detailLang.className = "detail-lang createdData";
    detailLang.innerHTML = `${searchData[i].language}`;
    // create difficulty div
    const detailDifficulty = document.createElement("div");
    // set class and innerHTML
    detailDifficulty.className = "detail-difficulty createdData";
    detailDifficulty.innerHTML = `${searchData[i].difficulty}`;
    // create div detail inline
    const detailInline = document.createElement("div");
    detailInline.className = "detail-inline createdData";
    //build the div structure
    detailTitle.appendChild(detailTitleH3);
    detailTitle.appendChild(detailDescription);
    detailImage.appendChild(suggestedImage);
    detailContainer.appendChild(detailTitle);
    detailContainer.appendChild(detailImage);
    detailContainer.appendChild(detailURL);
    detailInline.appendChild(detailLang);
    detailInline.appendChild(detailDifficulty);
    detailContainer.appendChild(detailInline);
    listItem.appendChild(detailContainer);
    projectsList.appendChild(listItem);

    subtitle.innerHTML = "Project Details";
  }
}

async function getAndDisplayAllData() {
  const returnData = await getAllProjects();
  deleteOldData();
  displaySearchData(returnData);
}

async function getAndDisplayDetail(id) {
  const returnData = await getProjectById(id);
  deleteOldData();
  displayDetail(returnData);
}

// Create a function that deletes the suggested projects
function deleteOldData() {
  let removedData = document.getElementsByClassName("createdData");
  while (removedData[0]) {
    removedData[0].parentNode.removeChild(removedData[0]);
  }
}

// Create a function to get project by coding language
async function getProjectsByDifficulty(level) {
  const response = await fetch(
    `${database}/projects/difficulty/${level}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  console.log(data.data);
  return data.data;
}

// Create a function to get project by difficulty
async function getProjectsByLanguage(lang) {
  const response = await fetch(
    `${database}/projects/language/${lang}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  console.log(data.data);
  return data.data;
}

async function getAndDisplayDifficulty(Level) {
  const returnData = await getProjectsByDifficulty(Level);
  deleteOldData();
  displaySearchData(returnData);
  subtitle.innerHTML = `${Level} Projects`;
}
async function getAndDisplayLanguage(Lang) {
  const returnData = await getProjectsByLanguage(Lang);
  deleteOldData();
  displaySearchData(returnData);
  subtitle.innerHTML = `${Lang} Projects`;
}
// Event listeners to the different a tags
addEventListener("load", getAndDisplayAllData);
logoButton.addEventListener("click", getAndDisplayAllData);

HTMLButton.addEventListener("click", () => {
  getAndDisplayLanguage("HTML");
});
CSSButton.addEventListener("click", () => {
  getAndDisplayLanguage("CSS");
});
JSButton.addEventListener("click", () => {
  getAndDisplayLanguage("JS");
});

EasyButton.addEventListener("click", () => {
  getAndDisplayDifficulty("Easy");
});
MediumButton.addEventListener("click", () => {
  getAndDisplayDifficulty("Medium");
});
DifficultButton.addEventListener("click", () => {
  getAndDisplayDifficulty("Difficult");
});
