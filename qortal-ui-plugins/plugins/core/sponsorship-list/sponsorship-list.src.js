import { LitElement, html, css } from 'lit';
import { render } from 'lit/html.js';

const parentEpml = new Epml({ type: 'WINDOW', source: window.parent });

export class SponsorshipList extends LitElement {
	static properties = {
		version: { String },
	};

	constructor() {
		super();
		this.version = 'STARTING';
	}

	render() {
		console.log('yo what"s up2');
		return html`
			<p>Welcome to the Lit tutorial!</p>
			<p>This is the ${this.version} code.</p>
		`;
	}
}
window.customElements.define('sponsorship-list', SponsorshipList);
