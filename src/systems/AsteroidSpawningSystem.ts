import { System } from "./System";
import { PositionComponent } from "../components/PositionComponent";
import { VelocityComponent } from "../components/VelocityComponent";
import { RenderingComponent } from "../components/RenderingComponent";
import { ColliderComponent } from "../components/ColliderComponent";
import { ECSManager } from "../ECSManager";
import { RotationComponent } from "../components/RotationComponent";
import asteroidSVG from "../assets/asteroidSVG";

export class AsteroidSpawningSystem extends System {
  private spawnTimer: number;
  private spawnInterval: number;

  constructor(
    ecsManager: ECSManager,
    // private canvas: HTMLCanvasElement,
    spawnInterval = 2000
  ) {
    super(ecsManager);
    this.spawnTimer = 0;
    this.spawnInterval = spawnInterval;
  }

  update(dt: number): void {
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnAsteroid();
      this.spawnTimer = 0;
    }
  }

  private spawnAsteroid(): void {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const velocityX = (Math.random() * 2 - 1) * 50;
    const velocityY = (Math.random() * 2 - 1) * 50;
    const rotationSpeed = (Math.random() * 2 - 1) * 0.5;

    const asteroid = this.ecsManager.createEntity();
    this.ecsManager.addComponentToEntity(asteroid, new PositionComponent(x, y));
    this.ecsManager.addComponentToEntity(
      asteroid,
      new VelocityComponent(velocityX, velocityY)
    );
    this.ecsManager.addComponentToEntity(
      asteroid,
      new RotationComponent(0, rotationSpeed)
    );
    this.ecsManager.addComponentToEntity(asteroid, new ColliderComponent(30));
    this.ecsManager.addComponentToEntity(
      asteroid,
      new RenderingComponent(asteroidSVG)
    );
  }
}
