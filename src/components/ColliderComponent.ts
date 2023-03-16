import { Component } from "./Component";

export class ColliderComponent extends Component {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }
}
