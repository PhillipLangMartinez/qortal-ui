import { LitElement, html, css } from 'lit';

class ChatAudioPlayer extends LitElement {
  static get properties() {
    return {
      src: { type: String },
      playing: { type: Boolean },
      volume: { type: Number },
      progress: { type: Number }
    };
  }

  constructor() {
    super();
    this.playing = false;
    this.volume = 1.0;
    this.progress = 0.0;
    this.updateProgressInterval = null;
    this.audio = new Audio();
    this.audio.preload = "metadata";
    this.audio.addEventListener('ended', () => {
      this.playing = false;
      this.stopUpdatingProgress();
    });
    this.audio.addEventListener('loadedmetadata', () => {
      console.log('loadedmetadata')
    });
    this.audio.addEventListener('canplaythrough', () => { 
      console.log('canplaythrough')
     })
     this.audio.addEventListener('timeupdate',     () => { 
      console.log('timeupdate')
         });
         this.audio.addEventListener('waiting',        () => { 
          console.log('waiting')
          });


  }

  static get styles() {
    return css`
      .audio-player {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px;
        flex-direction: column;
      }

      .play-button {
        width: 50px;
        height: 50px;
        border: none;
        background-color: #2196f3;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
        margin-right: 10px;
      }

      .play-button.playing {
        background-color: #f44336;
      }

      .slider {
        flex: 1;
      }

      .progress-bar {
        height: 5px;
        background-color: #e0e0e0;
        position: relative;
        margin-left: 10px;
        border-radius: 5px;
        width: 150px;
      }

      .progress-bar-fill {
        height: 100%;
        background-color: #2196f3;
        border-radius: 5px;
        position: absolute;
        left: 0;
        top: 0;
        width: ${this.progress * 100}%;
        transition: width 0.1s ease-in-out;
      }
    `;
  }

  render() {
    return html`
      <div class="audio-player">
        <button class="play-button ${this.playing ? 'playing' : ''}" @click="${this.togglePlaying}">
          ${this.playing ? 'pause' : 'play_arrow'}
        </button>
        <input type="range" min="0" max="100" step="1" class="slider" @input="${this.adjustVolume}" .value="${this.volume * 100}">
        <div class="progress-bar" @click="${this.adjustProgress}">
          <div class="progress-bar-fill" style="width: ${this.progress * 100}%;"></div>
        </div>
      </div>
    `;
  }

  firstUpdated(){
    const audioElement = this.shadowRoot.querySelector('.progress-bar');
   console.log('audioElement', audioElement.clientWidth)
  }

  async adjustProgress(event) {
    const progress = event.offsetX / event.target.clientWidth;

    if (this.audio.duration === Infinity) {
      this.audio.currentTime = 10000000;
    await  new Promise((res)=> {
        setTimeout(() => {
          this.audio.currentTime = 0; // to reset the time, so it starts at the beginning
          res()
        }, 1000);
      })
  }
    const duration = this.audio.duration;
    const position = duration * progress;
    console.log({
      offsetX: event.offsetX,
      clientWidth: event.target.clientWidth,
      progress,
      duration,
      position
    })
    this.audio.currentTime = position;
    this.progress = position / duration;
    if (this.audio.seekable.length > 0) {
      console.log('Audio file is seekable');
    } else {
      console.log('Audio file is not seekable');
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('src')) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.src, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const headers = xhr.getAllResponseHeaders();
        const blob = xhr.response;
        const url = URL.createObjectURL(blob);
        const byteLength = blob.size;
        const contentRange = `bytes 0-${byteLength}/${byteLength}`;
        const contentType = xhr.getResponseHeader('Content-Type');
        this.audio.src = url;
        this.dispatchEvent(new CustomEvent('loaded', { detail: { headers, byteLength, contentRange, contentType } }));
      };
      xhr.send();
    }
    if (changedProperties.has('volume')) {
      this.audio.volume = this.volume;
    }
  }

  togglePlaying() {
    if (this.playing) {
      this.audio.pause();
      this.playing = false;
      this.stopUpdatingProgress();
      } else {
      this.audio.play();
      this.playing = true;
      this.startUpdatingProgress();
      }
      }
      
      adjustVolume(event) {
      this.audio.volume = event.target.value / 100;
      this.volume = this.audio.volume;
      }
      
      startUpdatingProgress() {
      this.updateProgressInterval = setInterval(() => {
      const duration = this.audio.duration;
      const position = this.audio.currentTime;
      this.progress = position / duration;
      }, 100);
      }
      
      stopUpdatingProgress() {
      clearInterval(this.updateProgressInterval);
      }
      }
      
      customElements.define('chat-audio-player', ChatAudioPlayer);
