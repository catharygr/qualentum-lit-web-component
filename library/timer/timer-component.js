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
    h3 {
      text-align: center;
      margin-block: 0;
      color: var(--primary-color);
    }

    .btn-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 1rem;
    }
    button {
      background-color: var(--primary-color);
      padding: 0.6rem 1.3rem;
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
    doubledigits: { type: Boolean },
    playDisabled: { type: Boolean },
    pauseDisabled: { type: Boolean },
    resetDisabled: { type: Boolean },
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
    this.doubledigits = false;
    this.playDisabled = false;
    this.pauseDisabled = true;
    this.resetDisabled = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("timer-end", this.timerEnd);
    window.addEventListener("timer-autostart", this.autoPlayTimer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("timer-end", this.timerEnd);
    window.removeEventListener("timer-autostart", this.autoPlayTimer);
  }

  updated() {
    this.alert = this.shadowRoot.getElementById("alert");
  }

  autoPlayTimer = () => {
    this.playDisabled = true;
    this.pauseDisabled = false;
  };

  timerEnd = (event) => {
    if (this.autoreset) {
      return;
    }
    this.alert.textContent = event.detail.message;
    this.playDisabled = false;
    this.pauseDisabled = true;
  };

  playTimer = () => {
    const event = new CustomEvent("play", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.playDisabled = true;
    this.pauseDisabled = false;
  };
  pauseTimer = () => {
    const event = new CustomEvent("pause", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.playDisabled = false;
    this.pauseDisabled = true;
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
        <h3 id="alert">Timer</h3>
        ${this.eventtimer
          ? html`<event-timer></event-timer>`
          : html`<shopping-cart-timer
              .title=${this.title}
              .reverse=${this.reverse}
              .autoreset=${this.autoreset}
              .autostart=${this.autostart}
              .start=${this.start}
              .limit=${this.limit}
              .doubledigits=${this.doubledigits}
            ></shopping-cart-timer>`}

        <div class="btn-container">
          ${this.btnpause
            ? html`<button
                ?disabled=${this.pauseDisabled}
                @click=${this.pauseTimer}
              >
                Pause
              </button>`
            : ""}
          ${this.btnplay
            ? html`<button
                ?disabled=${this.playDisabled}
                @click=${this.playTimer}
              >
                Play
              </button>`
            : ""}
          ${this.btnreset
            ? html`<button
                ?disabled=${this.resetDisabled}
                @click=${this.resetTimer}
              >
                Reset
              </button>`
            : ""}
        </div>
      </div>
    `;
  }
}

customElements.define("timer-component", TimerComponent);
