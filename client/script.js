import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.getElementById("form");
const chatCotainer = document.getElementById("chat_container");

let loadInterval;
function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent === "....") element.textContent = "";
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(interval);
      return;
    }
    element.textContent += text.charAt(index);
    index++;
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hex = randomNumber.toString(16);

  return `id-${timestamp}-${hex}`;
}

function chatStripe(isAI, value, id) {
  return `
  <div class="wrapper ${isAI && "ai"}" >
    <div class="chat">
      <div class="profile"> 
        <img
          src="${isAI ? bot : user}" 
          alt="${isAI ? "ai" : "user"}"
        /> 
      </div>
      <div class="message" id="${id}">${value}</div>
    </div>
  </div>
  `;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  chatCotainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  const uniqueId = generateUniqueId();
  chatCotainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatCotainer.scrollTop = chatCotainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  //fetch text from server (response from openai)
  const response = await fetch("https://openai-codex-jfux.onrender.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = "";

  if (!response.ok) {
    const err = await response.text();
    messageDiv.innerHTML = "Unable to connect...";
    alert(err);
    return;
  }

  const resdata = await response.json();
  const parsedResdata = resdata.bot.trim();

  typeText(messageDiv, parsedResdata);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleSubmit(e);
});
