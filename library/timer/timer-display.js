import { LitElement, html, css } from "lit";

export class TimerDisplay extends LitElement {
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

    .days,
    .hours,
    .minutes,
    .seconds {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--text-color);
      box-shadow: 0 0 0.5rem var(--primary-color);
      padding: 0.5rem;
      border-radius: 0.5rem;
      min-width: 1.5rem; /* Ajusta el ancho mínimo para evitar que se colapsen */
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
    shorttimer: { type: Boolean },
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("play", this.playTimer, true);
    window.addEventListener("pause", this.pauseTimer, true);
    window.addEventListener("reset", this.resetTimer, true);
  }

  firstUpdated() {
    this.daysElements = this.shadowRoot.getElementById("days");
    this.hoursElements = this.shadowRoot.getElementById("hours");
    this.minutesElements = this.shadowRoot.getElementById("minutes");
    this.secondsElements = this.shadowRoot.getElementById("seconds");

    if (this.reverse) {
      this.startInSeconds = this.start;
    } else if (!this.reverse) {
      this.startInSeconds = 0;
    }
    this.renderDisplay(this.startInSeconds);

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

  renderDisplay = (time) => {
    if (this.shorttimer) {
      let minutesValue = Math.floor(time / 60);
      let secondsValue = time % 60;

      this.minutesElements.textContent =
        this.doubledigits && minutesValue < 10
          ? `0${minutesValue}`
          : minutesValue;
      this.secondsElements.textContent =
        this.doubledigits && secondsValue < 10
          ? `0${secondsValue}`
          : secondsValue;
    } else {
      let daysValue = Math.floor(time / (24 * 60 * 60));
      let hoursValue = Math.floor((time % (24 * 60 * 60)) / 3600);
      let minutesValue = Math.floor((time % 3600) / 60);
      let secondsValue = time % 60;

      this.daysElements.textContent =
        this.doubledigits && daysValue < 10 ? `0${daysValue}` : daysValue;
      this.hoursElements.textContent =
        this.doubledigits && hoursValue < 10 ? `0${hoursValue}` : hoursValue;
      this.minutesElements.textContent =
        this.doubledigits && minutesValue < 10
          ? `0${minutesValue}`
          : minutesValue;
      this.secondsElements.textContent =
        this.doubledigits && secondsValue < 10
          ? `0${secondsValue}`
          : secondsValue;
    }
  };

  playTimer = () => {
    if (this.reverse) {
      this.timer = setInterval(() => {
        if (this.startInSeconds <= 0) {
          clearInterval(this.timer);

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
        ${!this.shorttimer
          ? html`<div id="days" class="days">00</div>
              <div class="separator">:</div>
              <div id="hours" class="hours">00</div>
              <div class="separator">:</div>`
          : ""}
        <div id="minutes" class="minutes">00</div>
        <div class="separator">:</div>
        <div id="seconds" class="seconds">00</div>
      </div>
    `;
  }
}

customElements.define("timer-display", TimerDisplay);
