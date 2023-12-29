import { LitElement, html, css } from "lit";

export class TimerComponent extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html` <div>Timer</div> `;
  }
}

customElements.define("timer-component", TimerComponent);
