import { System } from "./System";
import { ECSManager } from "../ECSManager";
import { PositionComponent } from "../components/PositionComponent";
import { ColliderComponent } from "../components/ColliderComponent";
import { SpatialGrid } from "../utils/SpatialGrid";

export class CollisionSystem extends System {
  private spatialGrid: SpatialGrid;

  constructor(ecsManager: ECSManager, cellSize: number) {
    super(ecsManager);
    this.spatialGrid = new SpatialGrid(cellSize);
  }

  update(): void {
    const entitiesWithColliders = this.ecsManager.getEntitiesWithComponentTypes(
      PositionComponent,
      ColliderComponent
    );

    this.spatialGrid.clear();
    this.spatialGrid.addEntities(entitiesWithColliders);

    for (const entity of entitiesWithColliders) {
      const position = entity.getComponent(PositionComponent);
      const collider = entity.getComponent(ColliderComponent);

      if (!position) throw new Error("Entity has no position component");
      if (!collider) throw new Error("Entity has no collider component");

      const nearbyEntities = this.spatialGrid.getEntitiesNear(
        position.x,
        position.y,
        collider.radius
      );

      for (const otherEntity of nearbyEntities) {
        if (entity === otherEntity) {
          continue;
        }

        const otherPosition = otherEntity.getComponent(PositionComponent);
        const otherCollider = otherEntity.getComponent(ColliderComponent);

        if (!otherPosition) throw new Error("Entity has no position component");
        if (!otherCollider) throw new Error("Entity has no collider component");

        const dx = position.x - otherPosition.x;
        const dy = position.y - otherPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < collider.radius + otherCollider.radius) {
          // Handle collision here (e.g., emit an event, destroy entities, etc.)
          console.log(
            `Collision detected between entities ${entity.id} and ${otherEntity.id}`
          );
        }
      }
    }
  }
}
