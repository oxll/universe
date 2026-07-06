export class StageManager {
  constructor(engine) {
    this.engine = engine;
    this.stage = null;
  }

  stageWidth() {
    return this.stage.width;
  }

  stageHeight() {
    return this.stage.height;
  }

  setStage(StageClass) {
    this.stage?.exit();
    this.stage = new StageClass(this.engine);

    this.stage.setDimensions();
    this.stage.resizeEnclosure();

    this.stage.setBackgroundColor();
    this.stage.applyBackgroundColor();

    this.stage.setVerse();
    this.stage.loadVerse();

    this.stage.load();
    this.stage.enter();
  }
}
