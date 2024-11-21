const openModalButton = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const submitButton = document.getElementById("submit-button");

const toggleButton = document.createElement("button");
toggleButton.innerText = "Enable event.stopPropagation()";
document.body.appendChild(toggleButton);

let useStopPropagation = false;
let messageTimeout;

openModalButton.addEventListener("click", function (event) {
  event.stopPropagation();
  modal.classList.remove("hidden");
});

function hideMessage() {
  const message = document.getElementById("form-message");
  if (message) {
    message.style.opacity = "0";
    setTimeout(function() {
      if (message && message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 500);
  }
}

document.addEventListener("click", function (event) {
  if (
    !modal.classList.contains("hidden") &&
    (!modal.querySelector(".modal-content").contains(event.target) ||
      event.target === submitButton)
  ) {
    modal.classList.add("hidden");
    hideMessage();
  }
});

function createMessage() {
  let message = document.getElementById("form-message");
  if (!message) {
    message = document.createElement("div");
    message.id = "form-message";
    message.innerText = "Form submitted!";
    message.style.position = "fixed";
    message.style.top = "10px";
    message.style.left = "50%";
    message.style.transform = "translateX(-50%)";
    message.style.backgroundColor = "yellow";
    message.style.padding = "10px";
    message.style.transition = "opacity 0.5s";
    document.body.appendChild(message);
  }
  return message;
}

function displayMessage() {
  const message = createMessage();
  message.style.opacity = "1";
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
  messageTimeout = setTimeout(function () {
    if (!modal.classList.contains("hidden")) {
      console.log("Modal is still open, fading message now after 2 seconds");
    }
    hideMessage();
  }, 2000);
}

function handleSubmit(event) {
  console.log(
    `Submit button clicked - ${
      useStopPropagation ? "WITH" : "WITHOUT"
    } stopPropagation`
  );
  if (useStopPropagation) {
    event.stopPropagation();
  }
  displayMessage();
}

submitButton.addEventListener("click", handleSubmit);

const toggleEventPropagation = function () {
  useStopPropagation = !useStopPropagation;
  toggleButton.innerText = useStopPropagation
    ? "Disable event.stopPropagation()"
    : "Enable event.stopPropagation()";
  console.log(
    `Toggled to ${useStopPropagation ? "WITH" : "WITHOUT"} stopPropagation`
  );
};

toggleButton.addEventListener("click", toggleEventPropagation);
