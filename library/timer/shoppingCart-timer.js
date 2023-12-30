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
    window.addEventListener("pause", this.pauseTimer, true);
    window.addEventListener("reset", this.resetTimer, true);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("play", this.playTimer, true);
    window.removeEventListener("pause", this.pauseTimer, true);
    window.removeEventListener("reset", this.resetTimer, true);
  }

  playTimer() {
    console.log("play-hijo");
  }

  pauseTimer() {
    console.log("pause-hijo");
  }

  resetTimer() {
    console.log("reset-hijo");
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
