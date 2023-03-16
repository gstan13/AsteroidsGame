import { Component } from "./Component";

export class VelocityComponent extends Component {
  dx: number;
  dy: number;

  constructor(dx: number, dy: number) {
    super();
    this.dx = dx;
    this.dy = dy;
  }
}
