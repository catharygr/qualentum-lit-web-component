import { LitElement, html, css } from "lit";

export class EventTimer extends LitElement {
  static styles = css`
    div {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: space-around;
    }
    span {
      color: blue;
      font-size: 20px;
    }
  `;

  static properties = {
    start: { type: Number },
    limit: { type: Number },
    autostart: { type: Boolean },
    autoreset: { type: Boolean },
    doubledigits: { type: Boolean },
  };
  constructor() {
    super();
    this.start = 0;
    this.limit = 0;
    this.autostart = false;
    this.autoreset = false;
    this.doubledigits = false;
    this.timeInSeconds = 0;
    this.intervalID = null;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.autostart) {
      this.startTimer();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalID);
  }

  updated() {
    this.daysElements = this.shadowRoot.getElementById("days");
    this.hoursElements = this.shadowRoot.getElementById("hours");
    this.minutesElements = this.shadowRoot.getElementById("minutes");
    this.secondsElements = this.shadowRoot.getElementById("seconds");
  }

  startTimer = () => {
    this.timeInSeconds = this.start;
    this.intervalID = setInterval(() => {
      if (this.timeInSeconds >= this.limit) {
        clearInterval(interval);
        if (this.autoreset) {
          this.startTimer();
        }
        return;
      }
      this.timeInSeconds++;
      this.requestUpdate();
    }, 1000);
  };

  render() {
    const seconds = this.timeInSeconds % 60;
    const minutes = Math.floor((this.timeInSeconds / 60) % 60);
    const hours = Math.floor((this.timeInSeconds / 3600) % 24);
    const days = Math.floor(this.timeInSeconds / 86400);

    return html`
      <div class="display">
        <span>${this.doubledigits ? this.pad(days) : days} days</span>
        <span>${this.doubledigits ? this.pad(hours) : hours} hours</span>
        <span>${this.doubledigits ? this.pad(minutes) : minutes} minutes</span>
        <span>${this.doubledigits ? this.pad(seconds) : seconds} seconds</span>
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
