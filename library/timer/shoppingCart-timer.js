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
    this.startInSeconds = 0;
    this.timer = null;
  }
  static properties = {
    title: { type: String },
    reverse: { type: Boolean },
    autoreset: { type: Boolean },
    autostart: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
    doubledigits: { type: Boolean },
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("play", this.playTimer, true);
    window.addEventListener("pause", this.pauseTimer, true);
    window.addEventListener("reset", this.resetTimer, true);

    // Auto start
    if (this.autostart) {
      this.playTimer();
      const event = new CustomEvent("timer-autostart", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
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

    this.minutesElements.innerHTML =
      this.doubledigits && minutesValue < 10
        ? `0${minutesValue}`
        : minutesValue;
    this.secondsElements.innerHTML =
      this.doubledigits && secondsValue < 10
        ? `0${secondsValue}`
        : secondsValue;
  };

  playTimer = () => {
    if (this.startInSeconds === 0) {
      this.startInSeconds = this.start;
    }
    if (this.reverse) {
      this.timer = setInterval(() => {
        if (this.startInSeconds <= 0) {
          clearInterval(this.timer);

          // Evento de finalización del timer
          const event = new CustomEvent("timer-end", {
            detail: {
              message: "Timer ended",
            },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);

          // Autoreset
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
      this.timer = setInterval(() => {
        if (this.startInSeconds >= this.limit) {
          clearInterval(this.timer);
          // Evento de finalización del timer
          const event = new CustomEvent("timer-end", {
            detail: {
              message: "Timer ended",
            },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
          // Autoreset
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
    clearInterval(this.timer);
  };

  resetTimer = () => {
    // clearInterval(this.timer); // Limpiar el intervalo del temporizador
    // this.startInSeconds = this.start; // Restablecer startInSeconds al valor inicial
    // this.renderDisplay(this.startInSeconds); // Actualizar la visualización del temporizador
  };

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
