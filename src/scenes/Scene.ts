export abstract class Scene {
  abstract init(): void;
  abstract update(dt: number): void;
  abstract render(): void;
  abstract destroy(): void;
}
