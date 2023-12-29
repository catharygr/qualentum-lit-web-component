import { LitElement, html, css } from "lit";
import { ShoopingCartTimer } from "./shoopingCart-timer.js";
import { EventTimer } from "./event-timer.js";

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
  constructor() {
    super();
    this.type = "shooping-cart";
  }

  render() {
    return html`
      <div class="timer-container">
        <shooping-cart-timer></shooping-cart-timer>
        <event-timer></event-timer>
        <div class="btn-container">
          <button>Pause</button>
          <button>Play</button>
          <button>Reset</button>
        </div>
      </div>
    `;
  }
}

customElements.define("timer-component", TimerComponent);
