import { SceneManager } from "./scenes/SceneManager";
import { Scene } from "./scenes/Scene";

export class Game {
  private sceneManager: SceneManager;

  constructor() {
    this.sceneManager = new SceneManager();
  }

  setScene(scene: Scene): void {
    this.sceneManager.setScene(scene);
  }

  update(dt: number): void {
    this.sceneManager.update(dt);
  }

  render(): void {
    this.sceneManager.render();
  }
}
