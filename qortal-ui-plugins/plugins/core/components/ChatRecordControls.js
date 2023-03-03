import { html, LitElement } from 'lit';

import '@vaadin/icons'

class ChatRecordControls extends LitElement {
  static get styles() {
    return `
      .container {
        border: 1px solid gray;
        border-radius: 5px;
        width: 250px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        box-sizing: border-box;
      }

      .icon {
        cursor: pointer;
        margin: 0 5px;
      }

      .icon:hover {
        color: blue;
      }

      #reset-icon:hover,
      #play-icon:hover,
      #pause-icon:hover,
      #send-icon:hover {
        color: blue;
      }

      #close-icon {
        opacity: 0.6;
        width: 18px;
        height: 18px;
      }

      #close-icon:hover {
        opacity: 1;
        color: red;
      }
    `;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="container">
        <vaadin-icon class="icon" id="play-icon" icon="vaadin:play-circle"></vaadin-icon>
        <vaadin-icon class="icon" id="pause-icon" icon="vaadin:pause-circle"></vaadin-icon>
        <vaadin-icon class="icon" id="reset-icon" icon="vaadin:reset"></vaadin-icon>
        <vaadin-icon class="icon" id="send-icon" icon="vaadin:envelope"></vaadin-icon>
        <vaadin-icon class="icon" id="close-icon" icon="vaadin:close-circle"></vaadin-icon>
      </div>
    `;
  }
}

customElements.define('chat-record-controls', ChatRecordControls);