import { PositionComponent } from "../components/PositionComponent";
import { Entity } from "../Entity";

export class SpatialGrid {
  private grid: Map<number, Map<number, Entity[]>>;
  private cellSize: number;

  constructor(cellSize: number) {
    this.grid = new Map();
    this.cellSize = cellSize;
  }

  clear(): void {
    this.grid.clear();
  }

  addEntities(entities: Entity[]): void {
    for (const entity of entities) {
      const position = entity.getComponent(PositionComponent);

      if (!position) throw new Error("Entity has no position component");
      const xIndex = Math.floor(position.x / this.cellSize);
      const yIndex = Math.floor(position.y / this.cellSize);

      if (!this.grid.has(xIndex)) {
        this.grid.set(xIndex, new Map());
      }

      if (!this.grid.get(xIndex)?.has(yIndex)) {
        this.grid.get(xIndex)?.set(yIndex, []);
      }

      this.grid.get(xIndex)?.get(yIndex)?.push(entity);
    }
  }

  getEntitiesNear(x: number, y: number, radius: number): Entity[] {
    const xIndex = Math.floor(x / this.cellSize);
    const yIndex = Math.floor(y / this.cellSize);
    const entities: Entity[] = [];

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const cellX = xIndex + xOffset;
        const cellY = yIndex + yOffset;

        if (this.grid.has(cellX)) {
          const cellEntities = this.grid.get(cellX)?.get(cellY) || [];
          for (const entity of cellEntities) {
            const entityPos = entity.getComponent(PositionComponent);
            if (!entityPos) throw new Error("Entity has no position component");

            const dx = entityPos.x - x;
            const dy = entityPos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= radius) {
              entities.push(entity);
            }
          }
        }
      }
    }

    return entities;
  }
}
