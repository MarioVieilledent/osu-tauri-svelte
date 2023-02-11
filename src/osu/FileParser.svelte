<script lang="ts">
    import { onMount } from "svelte";
    import type { Osu } from "./osu-types";

    export let map: any = {};

    const patternOsuFileFormat = "osuFileFormat";
    const patternGeneral = "General";
    const patternEditor = "Editor";
    const patternMetadata = "Metadata";
    const patternDifficulty = "Difficulty";
    const patternEvents = "Events";
    const patternTimingPoints = "TimingPoints";
    const patternColours = "Colours";
    const patternHitObjects = "HitObjects";

    const regexOsuFileFormat = /osu file format (.*)/;
    const regexKeyValue = /(\w+):\s?(.*)/;
    const regexTimingPoint =
        /([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+),([-+]?[0-9]*\.?[0-9]+)/;
    const regexHitObject = /([0-9]+),([0-9]+),([0-9]+),([0-9]+),([0-9]+),?/;

    function parseOsuFile(fileData: string): Osu {
        let osu: Osu = {
            osuFileFormat: "",
            General: {},
            Editor: {},
            Metadata: {},
            Difficulty: {},
            Events: {},
            TimingPoints: [],
            Colours: [],
            HitObjects: [],
        };

        let state = patternOsuFileFormat;

        const lines = fileData.split("\n");

        lines.forEach((line) => {
            switch (state) {
                case patternOsuFileFormat: {
                    if (line.match(regexOsuFileFormat)) {
                        osu.osuFileFormat = line.match(regexOsuFileFormat)[1];
                    }
                    line.includes(`[${patternGeneral}]`)
                        ? (state = patternGeneral)
                        : {};
                    break;
                }
                case patternGeneral: {
                    line.includes(`[${patternEditor}]`)
                        ? (state = patternEditor)
                        : {};
                    const match = line.match(regexKeyValue);
                    if (match) {
                        osu.General[match[1]] = match[2];
                    }
                    break;
                }
                case patternEditor: {
                    line.includes(`[${patternMetadata}]`)
                        ? (state = patternMetadata)
                        : {};
                    const match = line.match(regexKeyValue);
                    if (match) {
                        osu.Editor[match[1]] = match[2];
                    }
                    break;
                }
                case patternMetadata: {
                    line.includes(`[${patternDifficulty}]`)
                        ? (state = patternDifficulty)
                        : {};
                    const match = line.match(regexKeyValue);
                    if (match) {
                        osu.Metadata[match[1]] = match[2];
                    }
                    break;
                }
                case patternDifficulty: {
                    line.includes(`[${patternEvents}]`)
                        ? (state = patternEvents)
                        : {};
                    const match = line.match(regexKeyValue);
                    if (match) {
                        osu.Difficulty[match[1]] = match[2];
                    }
                    break;
                }
                case patternEvents: {
                    line.includes(`[${patternTimingPoints}]`)
                        ? (state = patternTimingPoints)
                        : {};
                    const match = line.match(regexKeyValue);
                    if (match) {
                        osu.Events[match[1]] = match[2];
                    }
                    break;
                }
                case patternTimingPoints: {
                    line.includes(`[${patternColours}]`)
                        ? (state = patternColours)
                        : {};
                    line.includes(`[${patternHitObjects}]`)
                        ? (state = patternHitObjects)
                        : {};
                    const match = line.match(regexTimingPoint);
                    if (match) {
                        osu.TimingPoints.push({
                            time: Number(match[1]),
                            beatLength: Number(match[2]),
                            meter: Number(match[3]),
                            sampleSet: Number(match[4]) as 0 | 1 | 2 | 3,
                            sampleIndex: Number(match[5]),
                            volume: Number(match[6]),
                            uninherited: Number(match[7]) as 0 | 1,
                            effects: Number(match[8]),
                        });
                    }
                    break;
                }
                case patternColours: {
                    line.includes(`[${patternHitObjects}]`)
                        ? (state = patternHitObjects)
                        : {};
                    // Not coded yet!
                    break;
                }
                case patternHitObjects: {
                    const match = line.match(regexHitObject);
                    if (match) {
                        osu.HitObjects.push({
                            x: Number(match[1]),
                            y: Number(match[2]),
                            time: Number(match[3]),
                            type: Number(match[4]),
                            hitSound: Number(match[5]) as 0 | 1 | 2 | 3,
                        });
                    }
                    break;
                }
            }
        });

        console.log(osu);
        return osu;
    }

    onMount(async () => {
        fetch(
            "./Songs/480769 SOUND HOLIC feat Nana Takahashi - Wakusei_Lollipop/SOUND HOLIC feat. Nana Takahashi - WakuseiLollipop (Adot) [NIGHTMARE].osu"
        ).then((res) =>
            res.text().then((res: string) => {
                map = parseOsuFile(res);
            })
        );
    });
</script>

<div class="container" />

<style lang="scss">
</style>
