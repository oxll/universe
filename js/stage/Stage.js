import { Decor } from "../decor/Decor.js";
import { mouse } from "../core/main.js";

export class Stage {
  constructor(engine) {
    this.engine = engine;
    this.composite = Matter.Composite.create();

    this.width = 400;
    this.height = 400;

    this.enclosure = new Decor(this).addProperty("isStatic", true);
    this.add(this.enclosure.body);
    this.resizeEnclosure();

    this.verse = "";

    this.decors = [];
    this.selectedDecor = null;
  }

  bodies() {
    return Matter.Composite.allBodies(this.engine.world);
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

  beforeUpdate() {
    if (!this.selectedDecor) return;

    const x = mouse.x - this.selectedDecor.anchor().x;
    const y = mouse.y - this.selectedDecor.anchor().y;

    Matter.Body.setVelocity(this.selectedDecor.body, { x, y });

    const isInside =
      Matter.Query.point([this.selectedDecor.body], { x: mouse.x, y: mouse.y })
        .length > 0;
    if (isInside) {
      this.selectedDecor.anchorTo(mouse.x, mouse.y);
    }
  }

  // afterRender(): if anchor is still in another body, then lose it (unselect/unanchor)
  // also fix glitch: make static and setPosition instead?


  afterRender(ctx) {}

  mousedown() {
    const selectedBodies = Matter.Query.point(this.bodies(), mouse);
    if (!selectedBodies.length) return;

    this.selectedDecor = this.decors.find(
      (decor) => decor.body === selectedBodies[0],
    );

    this.selectedDecor.anchorTo(mouse.x, mouse.y);
  }

  mouseup() {
    if (!this.selectedDecor) return;

    this.selectedDecor.unanchor();
    this.selectedDecor = null;
  }

  resizeEnclosure() {
    const windowRatio = window.innerWidth / window.innerHeight;
    const stageW = this.width;
    const stageH = this.height;
    const w = stageH * windowRatio;
    const h = stageW / windowRatio;
    const t = Math.max(stageW, stageH);

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
}
