<script lang="ts">
    import Left from "./screen/Left.svelte";
    import Center from "./screen/Center.svelte";
    import Right from "./screen/Right.svelte";
    import FileParser from "./FileParser.svelte";
    import type { Osu } from "./osu-types";

    let currMap: Osu = {
        General: {},
        HitObjects: [],
    };

    let gameStarted: boolean = false;
    let playing: boolean = false;

    function togglePlaying(): void {
        if (!gameStarted) {
            gameStarted = true;
            playing = true;
        } else {
            playing = !playing;
        }
    }
</script>

<div class="container f">
    <div class="left fc">
        <Left metadata={currMap.Metadata} />
        <button on:click={togglePlaying}
            >{gameStarted ? (playing ? "Stop" : "Continue") : "Start"}</button
        >
    </div>
    <div class="center">
        <Center
            {gameStarted}
            {playing}
            audioFileName={currMap.General.AudioFilename}
            hitObjects={currMap.HitObjects}
        />
    </div>
    <div class="right fc">
        <Right />
        <FileParser bind:map={currMap} />
    </div>
</div>

<style lang="scss">
    .container {
        align-items: flex-start;
        width: 100%;
        height: 100%;

        .left {
            padding: 12px;
            width: 35%;
        }

        .center {
            box-sizing: border-box;
            height: 100%;
            padding: 12px;
            width: 35%;
        }

        .right {
            padding: 12px;
            width: 35%;
        }
    }
</style>
