type components = [number, number, number];

export default class Vector3 {
  private _components: components;

  public get components(): components {
    return this._components;
  }

  constructor(...args: components) {
    this._components = args;
  }

  add(v: Vector3) {
    return new Vector3(
      ...(v.components.map((v, i) => this.components[i] + v) as components)
    );
  }

  subtract(v: Vector3) {
    return new Vector3(
      ...(v.components.map((v, i) => this.components[i] - v) as components)
    );
  }

  scale(n: number) {
    return new Vector3(
      ...(this.components.map(c => c * n) as components)
    );
  }

  length(): number {
    return Math.hypot(...this.components);
  }

  normalize() {
    return this.scale(1 / this.length());
  }
}
