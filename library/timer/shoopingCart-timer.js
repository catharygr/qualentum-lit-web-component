import { LitElement, html, css } from "lit";

export class ShoopingCartTimer extends LitElement {
  constructor() {
    super();
  }
  render() {
    return html`
      <div>
        <p>Timer</p>
      </div>
    `;
  }
}

customElements.define("shooping-cart-timer", ShoopingCartTimer);
