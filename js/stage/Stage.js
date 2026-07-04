import { Item } from "../item/Item.js";
import { mouse } from "../core/main.js";

export class Stage {
  constructor(engine) {
    this.engine = engine;
    this.composite = Matter.Composite.create();

    this.width = 400;
    this.height = 400;

    this.enclosure = new Item(this).addProperty("isStatic", true);

    this.verse = "";
    this.verseReference = "";

    this.items = [];
    this.selectedItem = null;
  }

  setDimensions() {}

  verse() {
    return "";
  }

  verseReference() {
    return "";
  }

  bodies() {
    return Matter.Composite.allBodies(this.engine.world);
  }

  itemFromPart(part) {
    return this.items.find((item) => item.body === part.parent);
  }

  loadItem() {}

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
    if (!this.selectedItem) return;

    const dx = mouse.x - this.selectedItem.anchor().x;
    const dy = mouse.y - this.selectedItem.anchor().y;

    Matter.Body.setVelocity(this.selectedItem.body, { x: dx, y: dy });
  }

  afterUpdate() {
    if (!this.selectedItem) return;

    if (this.selectedItem.collisions.has(this.enclosure)) {
      Matter.Body.set(this.selectedItem.body, "restitution", 0);
    } else {
      Matter.Body.set(
        this.selectedItem.body,
        "restitution",
        this.selectedItem.defaultRestitution,
      );
    }

    if (!this.selectedItem.collisions.size) return;

    if (this.selectedItem.containsPoint(mouse)) {
      this.selectedItem.anchorTo(mouse.x, mouse.y);
    } else {
      const delta = Matter.Vector.sub(mouse, this.selectedItem.anchor());
      const MAX_DIST = 15;

      if (Matter.Vector.magnitudeSquared(delta) > MAX_DIST * MAX_DIST) {
        this.unselectItem();
      }
    }
  }

  afterRender(ctx) {}

  mousedown() {
    this.selectedItem = this.items.find((item) => {
      return item.containsPoint(mouse);
    });

    this.selectedItem?.anchorTo(mouse.x, mouse.y);
  }

  mouseup() {
    this.unselectItem();
  }

  unselectItem() {
    if (!this.selectedItem) return;

    Matter.Body.set(
      this.selectedItem.body,
      "restitution",
      this.selectedItem.defaultRestitution,
    );

    this.selectedItem.unanchor();
    this.selectedItem = null;
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
