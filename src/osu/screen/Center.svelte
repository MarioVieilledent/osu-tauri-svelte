<script lang="ts">
    import { onMount } from "svelte";
    import { keys, fps } from "../settings";
    import { watchResize } from "svelte-watch-resize";

    const SPACE_FOR_KEYS = 54;

    let interval = 1000 / $fps;

    let w: number; // Width of canvas and context
    let h: number; // Height of canvas and context

    let columnWidth: number = 48;

    let containerCenter: any; // div container
    let canvasElement: any; // canvas element

    let ctx: CanvasRenderingContext2D;

    let pressed: boolean[] = [false, false, false, false];

    window.onkeydown = (ev: KeyboardEvent) => {
        let index: number = $keys.findIndex((key: string) => key === ev.key);
        pressed[index] = true;
    };

    window.onkeyup = (ev: KeyboardEvent) => {
        let index: number = $keys.findIndex((key: string) => key === ev.key);
        pressed[index] = false;
    };

    // 2 48 3 48 3 48 3 48 2

    onMount(async () => {
        ctx = canvasElement.getContext("2d");

        w = ctx.canvas.width;
        h = ctx.canvas.height;

        setInterval(() => {
            initCanvas();
        }, interval);
    });

    function windowResize() {
        if (containerCenter && ctx) {
            h = containerCenter.clientHeight;
            canvasElement.height = h - SPACE_FOR_KEYS;
            ctx.canvas.height = h - SPACE_FOR_KEYS;
        }
    }

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

<div
    class="container"
    bind:this={containerCenter}
    use:watchResize={windowResize}
>
    <div class="canvas-and-keys fc">
        <canvas class="mt" bind:this={canvasElement} width="205" height="500" />
        <div class="osu-keys f">
            {#each $keys as key, i}
                <div class={pressed[i] ? "osu-key f key-pressed" : "osu-key f"}>
                    <span>{key}</span>
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .container {
        height: 100%;

        .canvas-and-keys {
            align-items: center;
            height: 100%;

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
</style>
