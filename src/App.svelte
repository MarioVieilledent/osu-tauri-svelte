<script lang="ts">
  import { onMount } from "svelte";

  let canvas: any;
  let ctx: CanvasRenderingContext2D;

  let w: number;
  let h: number;

  let columnWidth: number = 48;

  let keys: string[] = ["w", "x", ";", ":"];
  let pressed: boolean[] = [false, false, false, false];

  window.onkeydown = (ev: KeyboardEvent) => {
    let index: number = keys.findIndex((key: string) => key === ev.key);
    pressed[index] = true;
  };

  window.onkeyup = (ev: KeyboardEvent) => {
    let index: number = keys.findIndex((key: string) => key === ev.key);
    pressed[index] = false;
  };

  // 2 48 3 48 3 48 3 48 2

  onMount(async () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    w = ctx.canvas.width;
    h = ctx.canvas.height;

    setInterval(() => {}, 1);

    initCanvas();
  });

  function initCanvas() {
    ctx.strokeStyle = "#636363";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);
    ctx.stroke();
    ctx.moveTo(columnWidth + 3, 0);
    ctx.lineTo(columnWidth + 3, h);
    ctx.stroke();
    ctx.moveTo(columnWidth * 2 + 6, 0);
    ctx.lineTo(columnWidth * 2 + 6, h);
    ctx.stroke();
    ctx.moveTo(columnWidth * 3 + 9, 0);
    ctx.lineTo(columnWidth * 3 + 9, h);
    ctx.stroke();
    ctx.moveTo(columnWidth * 4 + 11, 0);
    ctx.lineTo(columnWidth * 4 + 11, h);
    ctx.stroke();
  }
</script>

<main class="container f">
  <div class="left fc">
    <h1 class="mt">Welcome to Osu!</h1>
    <p class="shadow mt">Tauri + Svelte + Osu</p>

    <br />

    <span>Wakusei Lolipop</span>
    <img src="Songs/Wakusei/potofu.jpg" alt="" class="bg-image" />
  </div>
  <div class="center">
    <div class="canvas-and-keys fc">
      <canvas id="canvas" class="mt" width="205" height="600" />
      <div class="osu-keys f">
        {#each keys as key, i}
          <div class={pressed[i] ? "osu-key f key-pressed" : "osu-key f"}>
            <span>{key}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="right fc">
    <span>Rien ici pour l'instant</span>
  </div>
</main>

<style lang="scss">
  .container {
    align-items: flex-start;
    width: 100%;
    height: 100%;

    .left {
      padding: 12px;
      width: 35%;
      .bg-image {
        width: 100%;
      }
    }

    .center {
      padding: 12px;
      width: 35%;

      .canvas-and-keys {
        align-items: center;

        #canvas {
          padding: 6px;
        }

        .osu-keys {
          justify-content: center;
          width: 100%;

          .osu-key {
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 36px;
            margin: 0px 2px;
            background-color: #454545;
          }

          .key-pressed {
            background-color: #24c8db;
            filter: drop-shadow(0 0 2em #24c8db);
          }
        }
      }
    }

    .right {
      padding: 12px;
      width: 35%;
    }
  }
</style>
