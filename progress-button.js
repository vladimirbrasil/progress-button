import { Element as PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js"
import "../node_modules/@polymer/iron-icon/iron-icon.js"

//export const html = Polymer.html;

export const html = (strings, ...values) => strings[0]
  + values.map((v, i) => v + strings[i + 1]).join('');

class ProgressButton extends PolymerElement {
  static get template() {
    return html`
      <style>
        /* local styles go here */
        :host {
          display: inline-block;
        }
        iron-icon {
          fill: var(--progress-button-color, rgba(0,0,0,0));
          stroke: var(--progress-button-outline-color, currentcolor);
        }
        :host([pressed]) iron-icon {
          fill: var(--progress-button-pressed-color, currentcolor);
        }
      </style>
        
      <!-- shadow DOM goes here -->
      <svg>
        <path id="arc" fill="none" stroke="#446688" stroke-width="20" />
      </svg>
    `
  }

  static get observers() {
    return [
      'describeProgressArc(radius, strokeWidth, _endAngle)',
    ];
  }

  static get properties() {
    return {
      percentage: {
        type: Number,
        value: 0.75,
      },
      radius: {
        type: Number,
        value: 100,
      },
      strokeWidth: {
        type: Number,
        value: 20,
      },
      _endAngle: {
        type: Number,
        computed: '_computeEndAngle(percentage)',
      },
    };
  }

  constructor() {
    super();
    // this.addEventListener('click', (e) => this.dispatchEvent(new CustomEvent('click', e)));
  }

  _computeEndAngle(percentage) {
    if (percentage > 1 || percentage < 0) return 0;
    if (percentage == 1) return 359.999;
    return 360 * percentage;
  }

  describeProgressArc(radius, strokeWidth, endAngle) {
    if (!radius || !strokeWidth) return;
    const x = radius + (strokeWidth / 2);
    this.$.arc.setAttribute("d", this.describeArc(x, x, radius, 0, endAngle));
  }

  describeArc(x, y, radius, startAngle, _endAngle) {
    // https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
    // http://jsbin.com/gifukir/edit?html,js,output  

    var start = polarToCartesian(x, y, radius, _endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = _endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    }
  }
}

customElements.define('progress-button', ProgressButton);