import { LitElement, html, css } from "lit";

export class EventTimer extends LitElement {
  static properties = {
    start: { type: Number },
    limit: { type: Number },
    autostart: { type: Boolean },
    autoreset: { type: Boolean },
    doubledigits: { type: Boolean },
  };
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
