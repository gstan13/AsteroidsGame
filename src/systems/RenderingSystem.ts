import { System } from "./System";
import { RenderingComponent } from "../components/RenderingComponent";
import { PositionComponent } from "../components/PositionComponent";
import { ECSManager } from "../ECSManager";
import { RotationComponent } from "../components/RotationComponent";

export class RenderingSystem extends System {
  private context: CanvasRenderingContext2D;

  constructor(ecsManager: ECSManager, context: CanvasRenderingContext2D) {
    super(ecsManager);
    this.context = context;
  }

  update(dt: number): void {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );

    const entitiesToRender = this.ecsManager.getEntitiesWithComponentTypes(
      PositionComponent,
      RenderingComponent
    );

    for (const entity of entitiesToRender) {
      const position = entity.getComponent(PositionComponent);
      const rendering = entity.getComponent(RenderingComponent);

      if (!position || !rendering) {
        continue;
      }

      const img = new Image();
      img.src = `data:image/svg+xml,${encodeURIComponent(rendering.svg)}`;

      this.context.save();
      this.context.translate(position.x, position.y);

      if (entity.hasComponent(RotationComponent)) {
        const rotation = entity.getComponent(RotationComponent);

        if (rotation) {
          this.context.rotate(rotation.angle);
        }
      }

      this.context.drawImage(img, -img.width / 2, -img.height / 2);
      this.context.restore();
    }
  }
}
