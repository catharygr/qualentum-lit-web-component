import { LitElement, html, css } from "lit";
// import { ShoppingCartTimer } from "./shoppingCart-timer.js";
// import { EventTimer } from "./event-timer.js";

export class TimerComponent extends LitElement {
  static styles = css`
    .timer-container {
      display: flex;
      flex-direction: column;
      margin-block: 3rem;
      background-color: var(--text-color);
      color: var(--neutral-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
    }
    .btn-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 1rem;
    }
    button {
      background-color: var(--primary-color);
      padding: 0.7rem 1.8rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease-in-out;
    }
    button:hover {
      scale: 1.03;
      box-shadow: 0 0 0.5rem var(--primary-color);
    }
  `;

  static properties = {
    eventTimer: { type: Boolean },
    title: { type: String },
    btnPause: { type: Boolean },
    btnPlay: { type: Boolean },
    btnReset: { type: Boolean },
  };

  constructor() {
    super();
    this.eventTimer = false;
    this.title = "nada";
    this.btnPause = false;
    this.btnPlay = false;
    this.btnReset = false;
  }

  playTimer = () => {
    const event = new CustomEvent("play", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };
  pauseTimer = () => {
    const event = new CustomEvent("pause", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };
  resetTimer = () => {
    const event = new CustomEvent("reset", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  render() {
    return html`
      <div class="timer-container">
        ${this.eventTimer
          ? html`<event-timer></even?-timer>`
          : html`<shopping-cart-timer
              .title=${this.title}
            ></shopping-cart-timer>`}

        <div class="btn-container">
          ${this.btnPause
            ? html`<button @click=${this.pauseTimer}>Pause</button>`
            : ""}
          ${this.btnPlay
            ? html`<button @click=${this.playTimer}>Play</button>`
            : ""}
          ${this.btnReset
            ? html`<button @click=${this.resetTimer}>Reset</button>`
            : ""}
        </div>
      </div>
    `;
  }
}

customElements.define("timer-component", TimerComponent);
