# JavaScript: Event Propagation Example

This web application demonstrates the concept of event propagation in JavaScript, specifically focusing on event bubbling and event capturing. Understanding event propagation is crucial for managing how events are handled in the DOM, preventing unwanted behaviors, and improving the user experience.

## Features

- **Event Bubbling**: See how events propagate from child elements to parent elements.
- **Event Capturing**: Observe the capturing phase where events are handled from parent to child elements.
- **Stop Propagation**: Learn how to stop the propagation of events to prevent them from reaching other elements.

## Files

- **index.html**: Contains the structure of the web application with nested elements to demonstrate event propagation.
- **script.js**: Includes the JavaScript code that adds event listeners to the elements and demonstrates event bubbling, capturing, and stopping propagation.

## Usage

1. Open `index.html` in a web browser.
2. Interact with the nested elements to see how events propagate.
3. Check the console for logs that show the order of event handling.

## Example

Clicking on a child element will trigger event listeners on its parent elements unless propagation is stopped. This helps in understanding how events flow through the DOM and how to control them effectively.

## Conclusion

This example is a practical demonstration of event propagation in JavaScript, helping developers to grasp the importance of managing event flow in web applications.