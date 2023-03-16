import { Component } from "./Component";

export class PlayerControlComponent extends Component {
  isRotatingLeft: boolean;
  isRotatingRight: boolean;
  isAccelerating: boolean;

  constructor() {
    super();
    this.isRotatingLeft = false;
    this.isRotatingRight = false;
    this.isAccelerating = false;
  }
}
