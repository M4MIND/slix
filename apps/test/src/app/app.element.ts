import './app.element.css';

export class AppElement extends HTMLElement {
    public static observedAttributes = [];

    connectedCallback() {
        const title = 'test';
        this.innerHTML = `
      `;
    }
}
customElements.define('app-root', AppElement);
