import { Stage } from "../stage/Stage.js";
import { Item } from "../item/Item.js";

export class John_3_16 extends Stage {
  setDimensions() {
    this.width = 600;
    this.height = 400;
  }

  setBackgroundColor() {
    this.backgroundColor = "#ffa";
  }

  setVerse() {
    this.verse = `For God so loved the [world] that
      he gave his one and only [Son],
      that whoever believes in him
      shall not [perish]
      but have eternal [life].`;

    this.verseReference = "John 3:16";
  }

  load() {
    this.table = new Item(this)
      .addPart("rectangle", "#562e0c", 0, 0, 300, 20)
      .addPart("rectangle", "#562e0c", -120, 50, 20, 100)
      .addPart("rectangle", "#562e0c", 120, 50, 20, 100)
      .addProperty("restitution", 0.8)
      .build(175, 300);

    this.ball = new Item(this)
      .addPart("circle", "blue", 100, 100, 30)
      .addProperty("restitution", 0.8)
      .build();
  }

  beforeRender(ctx) {
    ctx.fillStyle = "#f002";
    ctx.fillRect(0, 0, this.width, this.height);
  }

  afterRender(ctx) {
    const span = document.querySelector("#verse .hidden:nth-child(3)");
    const rect = this.mapToStage(span.getBoundingClientRect());

    ctx.fillStyle = "#f009";
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  }
}
