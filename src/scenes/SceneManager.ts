import { Scene } from "./Scene";

export class SceneManager {
  private currentScene: Scene | null;

  constructor() {
    this.currentScene = null;
  }

  setScene(scene: Scene): void {
    if (this.currentScene) {
      this.currentScene.destroy();
    }
    this.currentScene = scene;
    this.currentScene.init();
  }

  update(dt: number): void {
    if (this.currentScene) {
      this.currentScene.update(dt);
    }
  }

  render(): void {
    if (this.currentScene) {
      this.currentScene.render();
    }
  }
}
