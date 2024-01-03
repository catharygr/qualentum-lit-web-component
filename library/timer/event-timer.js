import { LitElement, html, css } from "lit";

export class EventTimer extends LitElement {
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
    this.timeInSeconds = null;
    this.timer = null;
  }
  static properties = {
    start: { type: Number },
    limit: { type: Number },
    autostart: { type: Boolean },
    autoreset: { type: Boolean },
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

  firstUpdated() {
    this.daysElements = this.shadowRoot.getElementById("days");
    this.hoursElements = this.shadowRoot.getElementById("hours");
    this.minutesElements = this.shadowRoot.getElementById("minutes");
    this.secondsElements = this.shadowRoot.getElementById("seconds");

    if (this.reverse) {
      this.timeInSeconds = this.start;
    } else if (!this.reverse) {
      this.timeInSeconds = 0;
    }
    this.renderDisplay(this.timeInSeconds);

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

  renderDisplay(time) {

  playTimer = () => {
    if (this.reverse) {
      this.timer = setInterval(() => {
        this.timeInSeconds--;
        if (this.timeInSeconds <= 0) {
          clearInterval(this.timer);
          const event = new CustomEvent("timer-end", {
            detail: {
              message: "Timer ended",
            },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
          this.timeInSeconds = this.start;
          this.renderDisplay(this.timeInSeconds);

          // Auto reset
          if (this.autoreset) {
            this.playTimer();
          }
          return;
        } else {
          this.renderDisplay(this.timeInSeconds);
        }
      }, 1000);
    }  else {
      this.timer = setInterval(() => {
        this.timeInSeconds++;
        if (this.timeInSeconds >= this.limit) {
          clearInterval(this.timer);
          const event = new CustomEvent("timer-end", {
            detail: {
              message: "Timer ended",
            },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
          this.timeInSeconds = 0;
          this.renderDisplay(this.timeInSeconds);

          // Auto reset
          if (this.autoreset) {
            this.playTimer();
          }
          return;
        } else {
          this.renderDisplay(this.timeInSeconds);
        }
      }, 1000);
    }
  };

  startTimer = () => {
    if (this.timeInSeconds === 0) {
      this.timeInSeconds = this.start;
    }
    if (this.reverse) {
      this.timer = setInterval(() => {}, 1000);
    }
  };

  render() {
    return html`
      <div class="display">
        <div id="days" class="days"></div>
        <div class="separator">:</div>
        <div id="hours" class="hours"></div>
        <div class="separator">:</div>
        <div id="minutes" class="minutes"></div>
        <div class="separator">:</div>
        <div id="seconds" class="seconds"></div>
      </div>
    `;
  }

  pad(number) {
    return number.toString().padStart(2, "0");
  }
}

// customElements.define("event-timer", EventTimer);
// <div class="display">
// <div id="minutes" class="minutes">00</div>
// <div class="separator">:</div>
// <div id="seconds" class="seconds">00</div>
// </div>
