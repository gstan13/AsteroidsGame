import { Component } from "./Component";

export class RotationComponent extends Component {
  angle: number;
  angularVelocity: number;

  constructor(angle: number = 0, angularVelocity: number = 0) {
    super();
    this.angle = angle;
    this.angularVelocity = angularVelocity;
  }
}
