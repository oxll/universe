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

  parseVerse(unparsedVerse) {
    let verse = unparsedVerse;

    verse = verse.replace(/\[(.*?)\]/g, "<span class=\"hidden\">$1</span>");
    //verse = verse.replace(/\*\*(.*?)\*\*/g, '<span class="bold">$1</span>');

    return verse;
  }

  loadVerse() {
    const verse = document.getElementById("verse");
    const reference = document.getElementById("verse-reference");

    verse.innerHTML = this.parseVerse(this.stage.verse);
    reference.innerHTML = this.stage.verseReference;
  }

  setStage(StageClass) {
    this.stage?.exit();
    this.stage = new StageClass(this.engine);

    this.stage.setDimensions();
    this.stage.resizeEnclosure();

    this.stage.setVerse();
    this.loadVerse();

    this.stage.load();
    this.stage.enter();
  }
}
