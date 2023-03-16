import { Scene } from "./Scene";
import { ECSManager } from "../ECSManager";
import { PositionComponent } from "../components/PositionComponent";
import { VelocityComponent } from "../components/VelocityComponent";
import { PlayerControlComponent } from "../components/PlayerControlComponent";
import { RenderingComponent } from "../components/RenderingComponent";
import { RotationComponent } from "../components/RotationComponent";
import { ColliderComponent } from "../components/ColliderComponent";
import { MovementSystem } from "../systems/MovementSystem";
import { PlayerInputSystem } from "../systems/PlayerInputSystem";
import { RenderingSystem } from "../systems/RenderingSystem";
import { CollisionSystem } from "../systems/CollisionSystem";
import { AsteroidSpawningSystem } from "../systems/AsteroidSpawningSystem";
import playerSvg from "../assets/playerSVG";
import asteroidSvg from "../assets/asteroidSVG";

export class GameScene extends Scene {
  private ecsManager: ECSManager;

  constructor(context: CanvasRenderingContext2D) {
    super();

    this.ecsManager = new ECSManager();

    // Set up systems
    this.ecsManager.addSystem(new MovementSystem(this.ecsManager));
    this.ecsManager.addSystem(new PlayerInputSystem(this.ecsManager));
    this.ecsManager.addSystem(new RenderingSystem(this.ecsManager, context));
    this.ecsManager.addSystem(new CollisionSystem(this.ecsManager, 100));
    this.ecsManager.addSystem(new AsteroidSpawningSystem(this.ecsManager));

    // Create player entity
    const player = this.ecsManager.createEntity();
    this.ecsManager.addComponentToEntity(
      player,
      new PositionComponent(400, 300)
    );
    this.ecsManager.addComponentToEntity(player, new VelocityComponent(0, 0));
    this.ecsManager.addComponentToEntity(player, new RotationComponent(0));
    this.ecsManager.addComponentToEntity(player, new PlayerControlComponent());
    this.ecsManager.addComponentToEntity(player, new ColliderComponent(15));
    this.ecsManager.addComponentToEntity(
      player,
      new RenderingComponent(playerSvg)
    );

    // Create initial asteroids
    for (let i = 0; i < 10; i++) {
      const asteroid = this.ecsManager.createEntity();
      this.ecsManager.addComponentToEntity(
        asteroid,
        new PositionComponent(Math.random() * 800, Math.random() * 600)
      );
      this.ecsManager.addComponentToEntity(
        asteroid,
        new VelocityComponent(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        )
      );
      this.ecsManager.addComponentToEntity(asteroid, new RotationComponent(0));
      this.ecsManager.addComponentToEntity(asteroid, new ColliderComponent(30));
      this.ecsManager.addComponentToEntity(
        asteroid,
        new RenderingComponent(asteroidSvg)
      );
    }
  }

  init(): void {
    console.log("GameScene initialized.");
  }

  update(dt: number): void {
    this.ecsManager.update(dt);
  }

  destroy(): void {
    // Clean up resources or remove event listeners when the scene is destroyed
    // For example, you can call the ecsManager's cleanup method here
    this.ecsManager.cleanup();
  }

  render(): void {
    // The rendering is now done by the RenderingSystem, so we don't need any code here.
  }
}
