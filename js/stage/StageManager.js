export class StageManager {
  constructor(engine) {
    this.engine = engine;
    this.curStage = null;
  }

  stageWidth() {
    return this.curStage.width;
  }

  stageHeight() {
    return this.curStage.height;
  }

  setVerse(verse) {
    const verseElement = document.getElementById("verse");
    verseElement.textContent = verse;
  }

  setStage(StageClass) {
    this.curStage?.exit();

    this.curStage = new StageClass(this.engine);
    this.curStage.resizeEnclosure();

    this.curStage.load();
    this.setVerse(this.curStage.verse);

    this.curStage.enter();
  }
}
