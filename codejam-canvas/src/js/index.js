(function canvasModule() {
  const dataSrc = {
    "4": "4x4.json",
    "32": "32x32.json"
  };
  const baseSize = 512;
  const defaultSize = 4;

  const buttons = document.querySelectorAll(".aside-right__fsize");
  const canvas = document.getElementById("canvas");
  canvas.width = baseSize;
  canvas.height = baseSize;
  const ctx = canvas.getContext("2d");

  async function drawCanvas(size) {
    const spriteSize = baseSize / size;
    const data = await fetch(`./assets/data/${dataSrc[size]}`).then(result =>
      result.json()
    );
    data.forEach((row, i) => {
      row.forEach((column, j) => {
        ctx.fillStyle = Array.isArray(column)
          ? `rgba(${column[0]},${column[1]},${column[2]},${column[3]})`
          : `#${column}`;
        ctx.fillRect(
          spriteSize * i,
          spriteSize * j,
          spriteSize * (i + 1),
          spriteSize * (j + 1)
        );
      });
    });
  }

  async function drawImage() {
    //
  }

  buttons.forEach(el => {
    el.addEventListener("click", () => {
      if ([...el.classList].includes("active")) {
        return;
      }
      buttons.forEach(el => el.classList.remove("active"));
      el.classList.add("active");
      el.dataset.size === "256" ? drawImage() : drawCanvas(el.dataset.size);
    });
  });

  drawCanvas(defaultSize);
})();
