import { ECSManager } from "../ECSManager";

export abstract class System {
  protected ecsManager: ECSManager;

  constructor(ecsManager: ECSManager) {
    this.ecsManager = ecsManager;
  }

  abstract update(dt: number): void;
}
