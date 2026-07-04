/*
 * TODO:
 *
 */

import { createEngine } from "./engine.js";
import { StageManager } from "../stage/StageManager.js";
import { John_3_16 } from "../stages/John_3_16.js";

const { engine, render, runner } = createEngine();

export const manager = new StageManager(engine);

export const mouse = { x: 0, y: 0 };

let dx = 0,
  dy = 0,
  k = 1;

Matter.Runner.run(runner, engine);
Matter.Render.run(render);

manager.setStage(John_3_16);
resize();

Matter.Events.on(engine, "collisionStart", (e) => {
  e.pairs.forEach((pair) => {
    if (!manager.stage) return;

    const itemA = manager.stage.itemFromPart(pair.bodyA);
    const itemB = manager.stage.itemFromPart(pair.bodyB);

    itemA.collisions.add(itemB);
    itemB.collisions.add(itemA);
  });
});

Matter.Events.on(engine, "collisionActive", (e) => {
  e.pairs.forEach((pair) => {
    if (!manager.stage) return;

    const itemA = manager.stage.itemFromPart(pair.bodyA);
    const itemB = manager.stage.itemFromPart(pair.bodyB);

    itemA.collisions.add(itemB);
    itemB.collisions.add(itemA);
  });
});

Matter.Events.on(engine, "collisionEnd", (e) => {
  e.pairs.forEach((pair) => {
    if (!manager.stage) return;

    const itemA = manager.stage.itemFromPart(pair.bodyA);
    const itemB = manager.stage.itemFromPart(pair.bodyB);

    itemA.collisions.add(itemB);
    itemB.collisions.add(itemA);
  });
});

Matter.Events.on(engine, "beforeUpdate", () => {
  if (!manager.stage) return;

  manager.stage.items.forEach((item) => {
    item.collisions.clear();
  });

  manager.stage.beforeUpdate();
});

Matter.Events.on(engine, "afterUpdate", () => {
  manager.stage?.afterUpdate();
});

Matter.Events.on(render, "afterRender", () => {
  if (!manager.stage) return;

  const ctx = render.context;

  // JUNK {
  const span = document.querySelector("#verse .hidden:nth-child(3)");
  const rect = span.getBoundingClientRect();

  ctx.fillRect(
    rect.left,
    rect.top,
    rect.right - rect.left,
    rect.bottom - rect.top,
  );
  // }

  ctx.translate(dx, dy);
  ctx.scale(k, k);

  manager.stage.afterRender(ctx);
});

window.addEventListener("mousedown", () => {
  manager.stage?.mousedown();
});

window.addEventListener("mousemove", (event) => {
  mouse.screenX = event.clientX;
  mouse.screenY = event.clientY;

  const bounds = render.bounds;
  const scaleX = (bounds.max.x - bounds.min.x) / render.options.width;
  const scaleY = (bounds.max.y - bounds.min.y) / render.options.height;

  mouse.x = bounds.min.x + mouse.screenX * scaleX;
  mouse.y = bounds.min.y + mouse.screenY * scaleY;
});

window.addEventListener("mouseup", () => {
  manager.stage?.mouseup();
});

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
    const scaledWindowHeight = manager.stageWidth() / windowRatio;
    render.bounds.min.x = 0;
    render.bounds.max.x = manager.stageWidth();
    render.bounds.min.y = manager.stageHeight() - scaledWindowHeight;
    render.bounds.max.y = manager.stageHeight();

    const scaledStageHeight = window.innerWidth / stageRatio;
    dx = 0;
    dy = window.innerHeight - scaledStageHeight;
    k = window.innerWidth / manager.stageWidth();

    verseContainer.style.width = "100vw";
  } else {
    const scaledWindowWidth = manager.stageHeight() * windowRatio;
    render.bounds.min.x = manager.stageWidth() / 2 - scaledWindowWidth / 2;
    render.bounds.max.x = manager.stageWidth() / 2 + scaledWindowWidth / 2;
    render.bounds.min.y = 0;
    render.bounds.max.y = manager.stageHeight();

    const scaledStageWidth = window.innerHeight * stageRatio;
    dx = window.innerWidth / 2 - scaledStageWidth / 2;
    dy = 0;
    k = window.innerHeight / manager.stageHeight();

    const percentWindowWidth = (scaledStageWidth / window.innerWidth) * 100;
    verseContainer.style.width = `${percentWindowWidth}vw`;
  }

  manager.stage.resizeEnclosure();
}
