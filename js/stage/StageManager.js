export class StageManager {
  constructor(engine) {
    this.engine = engine;
    this.currentStage = null;
  }

  stageWidth() {
    return this.currentStage.width;
  }

  stageHeight() {
    return this.currentStage.height;
  }

  setVerse(verse) {
    const verseElement = document.getElementById("verse");
    verseElement.textContent = verse;
  }

  setStage(StageClass) {
    this.currentStage?.exit();

    this.currentStage = new StageClass(this.engine);

    this.currentStage.load();
    this.setVerse(this.currentStage.verse);

    this.currentStage.enter();
  }
}
