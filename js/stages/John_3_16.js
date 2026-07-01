import { Stage } from "../stage/Stage.js";
import { Decor } from "../decor/Decor.js";

export class John_3_16 extends Stage {
  load() {
    this.width = 600;
    this.height = 400;

    this.verse =
      "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.";

    this.ball = new Decor({ restitution: 0.8, isSensor: false })
      .addPart("circle", "blue", 50, 100, 30)
      .build();

    this.table = new Decor()
      .addPart("rectangle", "#562e0c", 100, 250, 25, 100)
      .addPart("rectangle", "#562e0c", 300, 250, 25, 100)
      .addPart("rectangle", "#562e0c", 200, 200, 275, 25)
      .build();
  }

  renderOverlay(ctx) {
    ctx.fillStyle = "#ff000022";
    ctx.fillRect(0, 0, this.width, this.height);
  }
}
