const { Engine, Render, Runner } = Matter;

export function createEngine() {
  const engine = Engine.create();

  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      hasBounds: true,
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "#2220",
    },
  });

  const runner = Runner.create();

  return {
    engine,
    render,
    runner,
  };
}
