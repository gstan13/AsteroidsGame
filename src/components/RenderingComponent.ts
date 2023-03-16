import { Component } from "./Component";

export class RenderingComponent extends Component {
  svg: string;

  constructor(svg: string) {
    super();
    this.svg = svg;
  }
}
