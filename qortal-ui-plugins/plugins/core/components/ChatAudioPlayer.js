import { LitElement, html , css, unsafeCSS } from 'lit';
import Plyr from 'plyr';
import styles from 'plyr/dist/plyr.css'
class ChatAudioPlayer extends LitElement {
  static get properties() {
    return {
      audioUrl: { type: String },
      audioElement : { attribute: false },
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
}



  constructor() {
    super();
    this.audioUrl = '';
    this.audioElement = null;
    this.player = null;
  }


  // createRenderRoot() {
  //   return this;
  // }

  // createAudioPlayer() {
  //   this.audioElement = document.createElement('audio');
  //   this.audioElement.src = this.audioUrl;
  //   this.player = new Plyr(this.audioElement, {
  //     controls: ['play', 'progress', 'current-time', 'mute', 'volume'],
  //   });
  // }

  // updated(changedProperties) {
  //   if (changedProperties.has('audioUrl') && this.audioUrl) {
  //     console.log('create', this.audioUrl)
  //     this.createAudioPlayer();
  //   }
  // }



  firstUpdated(){

    function checkForDuration(cb =()=> {}) {
      if (audio.duration === Infinity) {
        audio.currentTime = 1e101;
        audio.ontimeupdate = function() {
          this.ontimeupdate = () => { return; };
          cb();
        };
      } else {
        cb();
      }
    }
    const audio = this.shadowRoot.getElementById('player');
    this.player = new Plyr(audio, {
      seekTime: 10
    });

    console.log({audio})
// Wait for the audio metadata to be loaded
audio.addEventListener('loadedmetadata', function() {
  checkForDuration(() => {
   
  audio.duration

  });
});
  }

  render() {
    console.log('hello', this.audioUrl, {element: this.audioElement})
    if (!this.audioUrl) {
      return html``;
    }

    return html` 
    
    <div>
    <audio controls id="player" preload="metadata">
      <source src=${this.audioUrl} type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
  
    `;
  }
}

customElements.define('chat-audio-player', ChatAudioPlayer);