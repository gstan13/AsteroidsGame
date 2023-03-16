// src/Entity.ts
import { Component } from "./components/Component";
let nextEntityId = 0;

export class Entity {
  id: number;
  private components: Map<string, Component>;

  constructor() {
    this.id = nextEntityId++;
    this.components = new Map();
  }

  addComponent(component: Component): void {
    const componentName = (component.constructor as typeof Component).name;
    this.components.set(componentName, component);
  }

  removeComponent(componentType: typeof Component): void {
    const componentName = componentType.name;
    this.components.delete(componentName);
  }

  getComponent<T extends Component>(
    componentType: new (...args: any[]) => T
  ): T | null {
    const componentName = (componentType as unknown as typeof Component).name;
    return (this.components.get(componentName) as T) || null;
  }

  hasComponent(componentType: typeof Component): boolean {
    const componentName = componentType.name;
    return this.components.has(componentName);
  }
}
