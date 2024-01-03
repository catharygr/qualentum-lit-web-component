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
    this.timer = null;
  }
  static properties = {
    reverse: { type: Boolean },
    autoreset: { type: Boolean },
    autostart: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
    doubledigits: { type: Boolean },
  };
  // Lo que ocurre cuando se conecta el componente al DOM
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("play", this.playTimer, true);
    window.addEventListener("pause", this.pauseTimer, true);
    window.addEventListener("reset", this.resetTimer, true);

    if (this.reverse) {
      this.startInSeconds = this.start;
    } else if (!this.reverse) {
      this.startInSeconds = 0;
    }

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
  // Lo que ocurre cuando se desconecta el componente del DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("play", this.playTimer, true);
    window.removeEventListener("pause", this.pauseTimer, true);
    window.removeEventListener("reset", this.resetTimer, true);
  }
  // Cuando queremos acceder al DOM que todavía no se ha renderizado
  updated() {
    this.minutesElements = this.shadowRoot.getElementById("minutes");
    this.secondsElements = this.shadowRoot.getElementById("seconds");
  }
  // La funcion que rederiza el tiempo en el display
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
  //Funciones que se ejecutan cuando se dispara un evento
  playTimer = () => {
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
          this.startInSeconds = this.start;
          this.renderDisplay(this.startInSeconds);

          // Autoreset
          if (this.autoreset) {
            this.playTimer();
          }
          return;
        } else {
          this.startInSeconds--;
          this.renderDisplay(this.startInSeconds);
        }
      }, 1000);
    } else {
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
          this.startInSeconds = 0;
          this.renderDisplay(this.startInSeconds);
          // Autoreset
          if (this.autoreset) {
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
    clearInterval(this.timer);
    if (this.reverse) {
      this.startInSeconds = this.start;
    } else if (!this.reverse) {
      this.startInSeconds = 0;
    }
    this.renderDisplay(this.startInSeconds);
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
