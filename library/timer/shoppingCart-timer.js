import { LitElement, html, css } from "lit";

export class ShoppingCartTimer extends LitElement {
  constructor() {
    super();
  }
  static properties = {
    title: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("play", this.playTimer, true);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("play", this.playTimer, true);
  }

  playTimer() {
    console.log("play-hijo");
  }

  render() {
    return html`
      <div>
        <p>${this.title}</p>
      </div>
    `;
  }
}

customElements.define("shopping-cart-timer", ShoppingCartTimer);
