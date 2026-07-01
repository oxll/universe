import { Decor } from "../decor/Decor.js";

export class Stage {
  constructor(engine) {
    this.engine = engine;
    this.composite = Matter.Composite.create();

    this.width = 400;
    this.height = 400;

    this.enclosure = new Decor({ isStatic: true });
    this.add(this.enclosure.body);
    this.rescaleInvisibleWalls();

    this.verse = "";
  }

  rescaleInvisibleWalls() {
    const windowRatio = window.innerWidth / window.innerHeight;
    const stageW = this.width;
    const stageH = this.height;
    const w = stageH * windowRatio;
    const h = stageW / windowRatio;
    const t = Math.max(stageW / 2, stageH / 2);

    Matter.Body.setParts(this.enclosure.body, []);
    this.enclosure.parts = [];

    if (windowRatio < stageW / stageH) {
      this.enclosure
        .addPart("rect", "", -t / 2, stageH - h / 2, t, h)
        .addPart("rect", "", stageW + t / 2, stageH - h / 2, t, h)
        .addPart("rect", "", stageW / 2, stageH - h - t / 2, stageW, t)
        .addPart("rect", "", stageW / 2, stageH + t / 2, stageW, t);
    } else {
      this.enclosure
        .addPart("rect", "", stageW / 2 - w / 2 - t / 2, stageH / 2, t, stageH)
        .addPart("rect", "", stageW / 2 + w / 2 + t / 2, stageH / 2, t, stageH)
        .addPart("rect", "", stageW / 2, -t / 2, w, t)
        .addPart("rect", "", stageW / 2, stageH + t / 2, w, t);
    }

    Matter.Body.setParts(this.enclosure.body, this.enclosure.parts);
  }

  load() {}

  enter() {
    Matter.Composite.add(this.engine.world, this.composite);
  }

  add(body) {
    Matter.Composite.add(this.composite, body);
  }

  remove(body) {
    Matter.Composite.remove(this.composite, body);
  }

  exit() {
    Matter.Composite.remove(this.engine.world, this.composite);
  }

  renderOverlay(ctx) {}
}
