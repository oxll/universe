import { Decor } from "../decor/Decor.js";
import { mouse } from "../core/main.js";

export class Stage {
  constructor(engine) {
    this.engine = engine;
    this.composite = Matter.Composite.create();

    this.width = 400;
    this.height = 400;

    this.enclosure = new Decor(this).addProperty("isStatic", true);

    this.verse = "";

    this.decors = [];
    this.selectedDecor = null;
  }

  bodies() {
    return Matter.Composite.allBodies(this.engine.world);
  }

  decorFromPart(part) {
    return this.decors.find((decor) => decor.body === part.parent);
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

    const dx = mouse.x - this.selectedDecor.anchor().x;
    const dy = mouse.y - this.selectedDecor.anchor().y;

    Matter.Body.setVelocity(this.selectedDecor.body, { x: dx, y: dy });
  }

  afterUpdate() {
    if (!this.selectedDecor) return;

    if (this.selectedDecor.collisions.has(this.enclosure)) {
      Matter.Body.set(this.selectedDecor.body, "restitution", 0);
    } else {
      Matter.Body.set(
        this.selectedDecor.body,
        "restitution",
        this.selectedDecor.defaultRestitution,
      );
    }

    if (!this.selectedDecor.collisions.size) return;

    if (this.selectedDecor.containsPoint(mouse)) {
      this.selectedDecor.anchorTo(mouse.x, mouse.y);
    } else {
      const delta = Matter.Vector.sub(mouse, this.selectedDecor.anchor());
      const MAX_DIST = 15;

      if (Matter.Vector.magnitudeSquared(delta) > MAX_DIST * MAX_DIST) {
        this.unselectDecor();
      }
    }
  }

  afterRender(ctx) {}

  mousedown() {
    this.selectedDecor = this.decors.find((decor) => {
      return decor.containsPoint(mouse);
    });

    this.selectedDecor?.anchorTo(mouse.x, mouse.y);
  }

  mouseup() {
    this.unselectDecor();
  }

  unselectDecor() {
    if (!this.selectedDecor) return;

    Matter.Body.set(
      this.selectedDecor.body,
      "restitution",
      this.selectedDecor.defaultRestitution,
    );

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

    this.enclosure.clearParts();

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

    this.enclosure.build();
  }
}
