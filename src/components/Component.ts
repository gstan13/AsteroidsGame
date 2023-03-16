export abstract class Component {
  static id: number;

  constructor() {
    if (new.target === Component) {
      throw new TypeError("Cannot construct abstract instances directly");
    }
  }
}
