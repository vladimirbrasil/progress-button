import {Element as PolymerElement} from "../../node_modules/@polymer/polymer/polymer-element.js"
import "../../node_modules/@polymer/iron-icons/iron-icons.js"
import "../progress-button.js"

//export const html = Polymer.html;

export const html = (strings, ...values) => strings[0]
+ values.map((v, i) => v + strings[i+1]).join('');

class DemoElement extends PolymerElement {
  
  _message(fav) {
    if (fav) {
      return 'You really like me!';
    } 
    else {
      return 'Do you like me?';
    }
  }
  
  static get template () {
    return html`
      <style>
        :host {
          font-family: sans-serif;
          --progress-button-color: lightgrey;
          --progress-button-outline-color: black;
          --progress-button-pressed-color: red;
        }
      </style>
  
      <h3>Statically-configured progress-buttons</h3>
    
      <progress-button toggle-icon="star"></progress-button>
      <progress-button toggle-icon="star" pressed></progress-button>
    
      <h3>Data-bound progress-button</h3>

      <!-- use a computed binding to generate the message -->
      <div><span>[[_message(isFav)]]</span></div>

      <!-- curly brackets ({{}}} allow two-way binding --> 
      <progress-button toggle-icon="favorite" pressed="{{isFav}}"></progress-button>
    `
  }
}

customElements.define('demo-element', DemoElement);