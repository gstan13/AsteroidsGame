import { System } from "./System";
import { ECSManager } from "../ECSManager";
import { VelocityComponent } from "../components/VelocityComponent";
import { RotationComponent } from "../components/RotationComponent";
import { PlayerControlComponent } from "../components/PlayerControlComponent";

const ROTATION_SPEED = (Math.PI / 180) * 5; // 5 degrees per frame
const ACCELERATION = 0.05;

export class PlayerInputSystem extends System {
  constructor(ecsManager: ECSManager) {
    super(ecsManager);
  }

  update(dt: number): void {
    const entities = this.ecsManager.getEntitiesWithComponentTypes(
      PlayerControlComponent,
      RotationComponent,
      VelocityComponent
    );

    for (const entity of entities) {
      const playerControl = entity.getComponent(PlayerControlComponent);
      const rotation = entity.getComponent(RotationComponent);
      const velocity = entity.getComponent(VelocityComponent);

      if (playerControl && rotation && velocity) {
        // Rotate left
        if (playerControl.isRotatingLeft) {
          rotation.angle -= ROTATION_SPEED * dt;
        }

        // Rotate right
        if (playerControl.isRotatingRight) {
          rotation.angle += ROTATION_SPEED * dt;
        }

        // Accelerate
        if (playerControl.isAccelerating) {
          velocity.dx += Math.cos(rotation.angle) * ACCELERATION * dt;
          velocity.dy += Math.sin(rotation.angle) * ACCELERATION * dt;
        }
      }
    }
  }
}
