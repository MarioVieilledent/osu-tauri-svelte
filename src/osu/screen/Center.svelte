<script lang="ts">
    import { onMount } from "svelte";
    import { keys, fps, volume } from "../settings";
    import { watchResize } from "svelte-watch-resize";
    import type { HitObject } from "../osu-types";

    // Constants

    const SPACE_FOR_KEYS = 54;

    const KEY_1 = 64;
    const KEY_2 = 192;
    const KEY_3 = 320;
    const KEY_4 = 448;

    // Binding variables

    export let hitObjects: HitObject[]; // Osu map
    export let audioFileName: string; // Audio filename

    export let gameStarted: boolean; // Set to true after player click start
    export let playing: boolean; // Set to true after player click start

    // Reactiv statements

    $: gameStarted, initGame(); // On gameStarted change, init the game
    $: $volume, setAdiau(); // Change audio volume

    let interval = 1000 / $fps; // Time interval between each frame
    let time = 0; // Time in ms in map
    let span = 600; // Comment here!!!

    let intervalId: any;

    let w: number; // Width of canvas and context
    let h: number; // Height of canvas and context

    let columnWidth: number = 48;
    let minHitHeight: number = 14;

    let containerCenter: any; // Div container
    let canvasElement: any; // Canvas element

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

    let audio: HTMLAudioElement; // Music to play

    onMount(async () => {
        ctx = canvasElement.getContext("2d");

        w = ctx.canvas.width;
        h = ctx.canvas.height;
    });

    function initGame(): void {
        if (gameStarted) {
            playMusic();

            intervalId = setInterval(() => {
                draw();
                time += interval;
                x: w;
            }, interval);
        }
    }

    function playMusic(): void {
        audio = new Audio(
            `./Songs/480769 SOUND HOLIC feat Nana Takahashi - Wakusei_Lollipop/${audioFileName}`
        );
        audio.volume = 0.2;
        audio.play();
    }

    function draw(): void {
        initCanvas();
        drawHitObjects();
    }

    function initCanvas(): void {
        ctx.strokeStyle = "#636363";
        ctx.fillStyle = "#2f2f2f";
        ctx.fillRect(0, 0, w, h);
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

    function drawHitObjects(): void {
        hitObjects.forEach((hit: HitObject) => {
            if (hit.time > time && hit.time < time + span) {
                drawHit(hit);
            }
        });
    }

    function drawHit(hit: HitObject): void {
        let x: number;
        switch (hit.x) {
            case KEY_1:
                x = 1;
                break;
            case KEY_2:
                x = 3 + columnWidth;
                break;
            case KEY_3:
                x = 6 + columnWidth * 2;
                break;
            case KEY_4:
                x = 9 + columnWidth * 3;
                break;
        }
        ctx.fillStyle = "cyan";
        ctx.fillRect(
            x,
            h - ((hit.time - time) * h) / span,
            columnWidth,
            minHitHeight
        );
    }

    function setAdiau(): void {
        if (audio && $volume) {
            audio.volume = $volume / 100;
        }
    }

    function windowResize(): void {
        if (containerCenter && ctx) {
            h = containerCenter.clientHeight;
            canvasElement.height = h - SPACE_FOR_KEYS;
            ctx.canvas.height = h - SPACE_FOR_KEYS;
        }
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
