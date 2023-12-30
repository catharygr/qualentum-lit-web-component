import { LitElement, html, css } from "lit";

export class EventTimer extends LitElement {
  constructor() {
    super();
  }
  render() {
    return html`
      <div>
        <p>Event Timer</p>
      </div>
    `;
  }
}

customElements.define("event-timer", EventTimer);
