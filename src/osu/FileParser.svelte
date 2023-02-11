<script lang="ts">
    import { onMount } from "svelte";
    import type { Osu } from "./osu-types";

    let map: any = {};

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
    const regexKeyValue = /(\w*):\s(.*)/;

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
                    break;
                }
                case patternColours: {
                    line.includes(`[${patternHitObjects}]`)
                        ? (state = patternHitObjects)
                        : {};
                    break;
                }
                case patternHitObjects: {
                    break;
                }
                default: {
                    console.warn("Osu Parse Error");
                }
            }
        });

        console.log(osu);
        return osu;
    }

    onMount(async () => {
        fetch(
            "./Songs/Wakusei/SOUND HOLIC feat. Nana Takahashi - Wakusei Lolipop (Jungdongjin) [LNli].osu"
        ).then((res) =>
            res.text().then((res: string) => {
                parseOsuFile(res);
            })
        );
    });
</script>

<div class="container" />

<style lang="scss">
</style>
