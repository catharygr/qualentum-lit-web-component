import { LitElement, html, css } from "lit";

export class ShoppingCartTimer extends LitElement {
  constructor() {
    super();
  }
  static properties = {
    title: { type: String },
  };

  render() {
    return html`
      <div>
        <p>${this.title}</p>
      </div>
    `;
  }
}

customElements.define("shopping-cart-timer", ShoppingCartTimer);
