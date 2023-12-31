import { LitElement, html, css } from "lit";

export class ShoppingCartTimer extends LitElement {
  static styles = css`
    .display {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 0.5rem;
      font-size: 1.2rem;
      padding: 1rem;
      text-align: center;
      margin-block: 1rem;
    }

    .minutes,
    .seconds {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--text-color);
      box-shadow: 0 0 0.5rem var(--primary-color);
      padding: 0.5rem;
      border-radius: 0.5rem;
      width: 1rem;
      height: 1rem;
    }

    .separator {
      display: flex;
      align-items: center;
      color: var(--neutral-color);
    }
  `;

  constructor() {
    super();
    this.startInSeconds = null;
  }
  static properties = {
    title: { type: String },
    reverse: { type: Boolean },
    autoreset: { type: Boolean },
    autostart: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("play", this.playTimer, true);
    window.addEventListener("pause", this.pauseTimer, true);
    window.addEventListener("reset", this.resetTimer, true);
    if (this.autostart) {
      this.playTimer();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("play", this.playTimer, true);
    window.removeEventListener("pause", this.pauseTimer, true);
    window.removeEventListener("reset", this.resetTimer, true);
  }

  updated() {
    this.minutesElements = this.shadowRoot.getElementById("minutes");
    this.secondsElements = this.shadowRoot.getElementById("seconds");
  }

  renderDisplay = (time) => {
    let minutesValue = Math.floor(time / 60);
    let secondsValue = time % 60;

    this.minutesElements.innerHTML = minutesValue;
    this.secondsElements.innerHTML = secondsValue;
  };

  playTimer = () => {
    this.startInSeconds = this.start;

    if (this.reverse) {
      const time = setInterval(() => {
        if (this.startInSeconds <= 0) {
          clearInterval(time);
          if (this.autoreset) {
            this.startInSeconds = this.start;
            this.renderDisplay(this.startInSeconds);
            this.playTimer();
          }
          return;
        } else {
          this.startInSeconds--;
          this.renderDisplay(this.startInSeconds);
        }
      }, 1000);
    } else {
      this.startInSeconds = 0;
      const time = setInterval(() => {
        if (this.startInSeconds >= this.limit) {
          clearInterval(time);
          if (this.autoreset) {
            this.startInSeconds = 0;
            this.renderDisplay(this.startInSeconds);
            this.playTimer();
          }
          return;
        } else {
          this.startInSeconds++;
          this.renderDisplay(this.startInSeconds);
        }
      }, 1000);
    }
  };

  pauseTimer = () => {
    console.log("pause-hijo");
  };

  resetTimer = () => {};

  render() {
    return html`
      <div class="display">
        <div id="minutes" class="minutes">00</div>
        <div class="separator">:</div>
        <div id="seconds" class="seconds">00</div>
      </div>
    `;
  }
}

customElements.define("shopping-cart-timer", ShoppingCartTimer);
