import { manager } from "../core/main.js";

export class Decor {
  constructor(options) {
    this.body = Matter.Body.create(options);
    this.parts = [];
  }

  addPart(shape, color, ...dimensions) {
    if (shape === "rect") shape = "rectangle";

    const part = Matter.Bodies[shape](...dimensions);

    if (color) {
      part.render.fillStyle = color;
      part.render.strokeStyle = color;
      part.render.lineWidth = 1;
    } else {
      part.render.visible = false;
    }

    this.parts.push(part);
    return this;
  }

  build() {
    Matter.Body.setParts(this.body, this.parts);
    manager.currentStage.add(this.body);
    return this;
  }
}
