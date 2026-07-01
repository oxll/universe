import { createEngine } from "./engine.js";
import { StageManager } from "../stage/StageManager.js";
import { John_3_16 } from "../stages/John_3_16.js";

const { engine, render, runner } = createEngine();

Matter.Render.run(render);
Matter.Runner.run(runner, engine);

export const manager = new StageManager(engine);
manager.setStage(John_3_16);

Matter.Events.on(render, "afterRender", () => {
  if (!manager.currentStage) return;

  const ctx = render.context;

  const stageRatio = manager.stageWidth() / manager.stageHeight();
  const windowRatio = window.innerWidth / window.innerHeight;

  if (windowRatio < stageRatio) {
    const scaledStageHeight = window.innerWidth / stageRatio;

    ctx.translate(0, window.innerHeight - scaledStageHeight);
    ctx.scale(
      window.innerWidth / manager.stageWidth(),
      window.innerWidth / manager.stageWidth(),
    );
  } else {
    const scaledStageWidth = window.innerHeight * stageRatio;

    ctx.translate(window.innerWidth / 2 - scaledStageWidth / 2, 0);
    ctx.scale(
      window.innerHeight / manager.stageHeight(),
      window.innerHeight / manager.stageHeight(),
    );
  }

  manager.renderOverlay(ctx);
});

resize();
window.addEventListener("resize", resize);

function resize() {
  const verseContainer = document.getElementById("verse-container");

  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;

  render.options.width = window.innerWidth;
  render.options.height = window.innerHeight;

  const stageRatio = manager.stageWidth() / manager.stageHeight();
  const windowRatio = window.innerWidth / window.innerHeight;

  if (windowRatio < stageRatio) {
    verseContainer.style.width = "100vw";

    const scaledWindowHeight = manager.stageWidth() / windowRatio;
    render.bounds.min.x = 0;
    render.bounds.max.x = manager.stageWidth();
    render.bounds.min.y = manager.stageHeight() - scaledWindowHeight;
    render.bounds.max.y = manager.stageHeight();
  } else {
    const scaledStageWidth = window.innerHeight * stageRatio;
    const percentWindowWidth = (scaledStageWidth / window.innerWidth) * 100;
    verseContainer.style.width = `${percentWindowWidth}vw`;

    const scaledWindowWidth = manager.stageHeight() * windowRatio;
    render.bounds.min.x = manager.stageWidth() / 2 - scaledWindowWidth / 2;
    render.bounds.max.x = manager.stageWidth() / 2 + scaledWindowWidth / 2;
    render.bounds.min.y = 0;
    render.bounds.max.y = manager.stageHeight();
  }

  manager.currentStage.rescaleInvisibleWalls();
}
