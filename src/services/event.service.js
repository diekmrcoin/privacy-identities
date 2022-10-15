/**
 * @param {string} eventName
 * @param {EventListener} listener
 */
function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}

/**
 * @param {string} eventName
 * @param {EventListener} listener
 */
function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}

/**
 * @param {string} eventName
 * @param {any} data
 */
function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

/**
 * @param {CustomEvent} event
 * @returns {any}
 */
function eventData(event) {
  return event.detail;
}

export { publish, subscribe, unsubscribe, eventData };
