/**
 * @param {string} eventName
 * @param {(data:any)=>void} listener
 */
function subscribe(eventName, listener) {
  document.addEventListener(eventName, (event) => listener(event.detail));
}

/**
 * @param {string} eventName
 * @param {(data:any)=>void} listener
 */
function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, (event) => listener(event.detail));
}

/**
 * @param {string} eventName
 * @param {any} data
 */
function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
