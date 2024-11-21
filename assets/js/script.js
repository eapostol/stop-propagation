// identify the elements in the HTML web page
const openModalButton = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const submitButton = document.getElementById("submit-button");

// Create a variable to represent a button that toggles the event.stopPropagation() behavior
const toggleButton = document.createElement("button"); // Create toggle button
toggleButton.innerText = "Enable event.stopPropagation()"; // Initial toggle state
document.body.appendChild(toggleButton); // Add toggle button to the page

let useStopPropagation = false; // Create a variable acting as a flag to track enabling or disabling event.stopPropagation()
let messageTimeout; // Create a variable to use for a timeout interval that controls a function managing the "message div" fade-out behavior

// Function to open the modal
openModalButton.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevents this click from triggering the document click listener
  console.log("Open Modal button clicked");
  modal.classList.remove("hidden"); // Show the modal by removing the hidden class
});

// Function to hide the message
function hideMessage() {
  const message = document.getElementById("form-message");
  if (message) {
    message.style.opacity = "0"; // Fade out the message
    setTimeout(() => {
      if (message && message.parentNode) {
        message.parentNode.removeChild(message); // Remove the message from the DOM
      }
    }, 500); // Allow the fade-out transition to complete
  }
}

// Function to close the modal when clicking outside of it or on the submit button
document.addEventListener("click", function (event) {
  console.log("Document click detected"); // Log to confirm document click listener is firing
  if (
    !modal.classList.contains("hidden") &&
    (!modal.querySelector(".modal-content").contains(event.target) ||
      event.target === submitButton)
  ) {
    console.log("Click outside or on Submit detected, closing modal");
    modal.classList.add("hidden"); // Hide the modal by adding the hidden class
    hideMessage(); // Immediately hide the message when the modal closes
  }
});

/* ------------------ */

// Function to create the temporary message
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
    message.style.transition = "opacity 0.5s"; // Add fade-out transition
    document.body.appendChild(message);

    /* a more elegant way to make the new message object is below */
    /* 
    message = Object.assign(document.createElement("div"), {
      id: "form-message",
      innerText: "Form submitted!",
      style: `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: yellow;
      padding: 10px;
      transition: opacity 0.5s;
      `
    });    
        document.body.appendChild(message);
    */
  }

  return message;
}

// Function to display the temporary message
function displayMessage() {
  const message = createMessage();

  message.style.opacity = "1"; // Ensure the message is fully visible

  // Clear any existing timeout
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }

  // Set a timeout to fade out the message after 2 seconds
  messageTimeout = setTimeout( function () {
    // Check the modal visibility when the timeout completes
    if (!modal.classList.contains("hidden")) {
      console.log("Modal is still open, fading message now after 2 seconds");
    }
    hideMessage(); // Fade the message regardless of the modal state
  }, 2000);
}
/* ------------------ */

// This function handles the click event on the Submit button
// In the console, it logs whether event.stopPropagation() is enabled or not
// It also calls the displayMessage() function to show the form submitted message
function handleSubmit(event) {
  console.log(
    `Submit button clicked - ${
      useStopPropagation ? "WITH" : "WITHOUT"
    } stopPropagation`
  );

  if (useStopPropagation) {
    event.stopPropagation(); // Prevent the event from bubbling if enabled
  }

  displayMessage(); // Show the form submitted message
}

// Add the Submit button click event handler to the Submit button
submitButton.addEventListener("click", handleSubmit);

/* ------------------ */

// This function toggles the property / variable used to enable or disable event.stopPropagation()
const toggleEventPropagation = function () {
  useStopPropagation = !useStopPropagation; // Toggle the flag
  toggleButton.innerText = useStopPropagation
    ? "Disable event.stopPropagation()"
    : "Enable event.stopPropagation()"; // Update button text
  console.log(
    `Toggled to ${useStopPropagation ? "WITH" : "WITHOUT"} stopPropagation`
  );
};

// Add the toggle between click event handler to toggle whether to use or not use stopPropagation
toggleButton.addEventListener("click", toggleEventPropagation);
