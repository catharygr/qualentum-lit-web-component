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
    eventtimer: { type: Boolean },
    title: { type: String },
    btnpause: { type: Boolean },
    btnplay: { type: Boolean },
    btnreset: { type: Boolean },
    reverse: { type: Boolean },
    autoreset: { type: Boolean },
    autostart: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
  };

  constructor() {
    super();
    this.eventtimer = false;
    this.title = "nada";
    this.btnpause = false;
    this.btnplay = false;
    this.btnreset = false;
    this.reverse = false;
    this.autoreset = false;
    this.autostart = false;
    this.start = 0;
    this.limit = 20;
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
        ${this.eventtimer
          ? html`<event-timer></event-timer>`
          : html`<shopping-cart-timer
              .title=${this.title}
              .reverse=${this.reverse}
              .autoreset=${this.autoreset}
              .autostart=${this.autostart}
              .start=${this.start}
              .limit=${this.limit}
            ></shopping-cart-timer>`}

        <div class="btn-container">
          ${this.btnpause
            ? html`<button @click=${this.pauseTimer}>Pause</button>`
            : ""}
          ${this.btnplay
            ? html`<button @click=${this.playTimer}>Play</button>`
            : ""}
          ${this.btnreset
            ? html`<button @click=${this.resetTimer}>Reset</button>`
            : ""}
        </div>
      </div>
    `;
  }
}

customElements.define("timer-component", TimerComponent);
