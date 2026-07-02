import { Stage } from "../stage/Stage.js";
import { Decor } from "../decor/Decor.js";

export class John_3_16 extends Stage {
  load() {
    this.width = 600;
    this.height = 400;

    this.verse =
      "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.";

    this.ball = new Decor(this)
      .addPart("circle", "blue", 50, 100, 30)
      .addProperty("restitution", 0.8)
      .addProperty("isSensor", false)
      .build();

    this.table = new Decor(this)
      .addPart("rectangle", "#562e0c", 100, 250, 25, 100)
      .addPart("rectangle", "#562e0c", 300, 250, 25, 100)
      .addPart("rectangle", "#562e0c", 200, 200, 275, 25)
      .build();
  }

  afterRender(ctx) {
    ctx.fillStyle = "#ff000022";
    ctx.fillRect(0, 0, this.width, this.height);

    if (!this.ball.anchor()) return;

    ctx.fillStyle = "#000";
    ctx.fillRect(this.ball.anchor().x, this.ball.anchor().y, 10, 10);
  }
}
