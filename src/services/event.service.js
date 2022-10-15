class EventService {
  /**
   * @param {string} eventName
   * @return {CustomEvent}
   */
  static create(eventName) {
    return new CustomEvent(eventName);
  }

  /**
   * @param {string|CustomEvent} event
   * @param {any} data
   */
  static publish(event, data) {
    if (typeof event === "string")
      event = new CustomEvent(event, { detail: data });
    document.dispatchEvent(event);
  }

  /**
   * @param {string} eventName
   * @param {(data:any)=>void} listener
   */
  static subscribe(eventName, listener) {
    document.addEventListener(eventName, (event) => listener(event.detail));
  }

  /**
   * @param {string} eventName
   * @param {(data:any)=>void} listener
   */
  static unsubscribe(eventName, listener) {
    document.removeEventListener(eventName, (event) => listener(event.detail));
  }
}
export default EventService;
