// src/systems/MovementSystem.ts
import { System } from "./System";
import { ECSManager } from "../ECSManager";
import { VelocityComponent } from "../components/VelocityComponent";
import { PositionComponent } from "../components/PositionComponent";
import { RotationComponent } from "../components/RotationComponent";
import { wrapAngle } from "../utils/wrapAngle";

export class MovementSystem extends System {
  constructor(ecsManager: ECSManager) {
    super(ecsManager);
  }

  update(dt: number): void {
    const entities = this.ecsManager.getEntitiesWithComponentTypes(
      PositionComponent,
      VelocityComponent
    );

    for (const entity of entities) {
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);

      if (!position) throw new Error("Entity has no position component");
      if (!velocity) throw new Error("Entity has no velocity component");

      position.x += velocity.dx * dt;
      position.y += velocity.dy * dt;

      if (entity.hasComponent(RotationComponent)) {
        const rotation = entity.getComponent(RotationComponent);
        if (!rotation) throw new Error("Entity has no velocity component");

        rotation.angle += rotation.angularVelocity * dt;
        rotation.angle = wrapAngle(rotation.angle);
      }
    }
  }
}
