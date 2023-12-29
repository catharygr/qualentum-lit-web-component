import { LitElement, html, css } from "lit";

export class ShoppingCartTimer extends LitElement {
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

customElements.define("shopping-cart-timer", ShoppingCartTimer);
