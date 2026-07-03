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
      .build();

    this.table = new Decor(this)
      .addPart("rectangle", "#562e0c", 100, 250, 25, 100)
      .addPart("rectangle", "#562e0c", 300, 250, 25, 100)
      .addPart("rectangle", "#562e0c", 200, 200, 275, 25)
      .addProperty("restitution", 0.8)
      .build();
  }

  afterRender(ctx) {
    // ctx.fillStyle = this.ball.collisions.has(this.enclosure)
    //   ? "#ff01"
    //   : "#f001";
    // ctx.fillRect(0, 0, this.width, this.height);

    // if (this.ball.body.restitution === 0.8) {
    //   ctx.beginPath();
    //   ctx.arc(
    //     this.ball.body.position.x,
    //     this.ball.body.position.y,
    //     30,
    //     0,
    //     2 * Math.PI,
    //   );
    //   ctx.fillStyle = "#00ffaa";
    //   ctx.fill();
    // }

    // if (!this.ball.anchor()) return;

    // ctx.fillStyle = "#000";
    // ctx.fillRect(this.ball.anchor().x - 5, this.ball.anchor().y - 5, 10, 10);
  }
}
