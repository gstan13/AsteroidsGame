import { System } from "./systems/System";
import { Entity } from "./Entity";
import { Component } from "./components/Component";

export class ECSManager {
  private systems: System[];
  private entities: Entity[];

  constructor() {
    this.systems = [];
    this.entities = [];
  }

  createEntity(): Entity {
    const entity = new Entity();
    this.addEntity(entity);
    return entity;
  }

  addComponentToEntity(entity: Entity, component: Component): void {
    entity.addComponent(component);
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  removeSystem(system: System): void {
    const index = this.systems.indexOf(system);
    if (index > -1) {
      this.systems.splice(index, 1);
    }
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  getEntities(): Entity[] {
    return this.entities;
  }

  getEntitiesWithComponentTypes(...componentTypes: any): Entity[] {
    return this.entities.filter((entity) => {
      return componentTypes.every((componentType: any) =>
        entity.hasComponent(componentType)
      );
    });
  }

  update(dt: number): void {
    for (const system of this.systems) {
      system.update(dt);
    }
  }

  cleanup(): void {
    for (const system of this.systems) {
      //@ts-ignore
      if (typeof system.cleanup === "function") {
        //@ts-ignore
        system.cleanup();
      }
    }
  }
}
