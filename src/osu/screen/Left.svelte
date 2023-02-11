<script lang="ts">
    import type { Metadata } from "../osu-types";

    export let metadata: Metadata;
</script>

<div class="container fc">
    <div class="center fc">
        <h1 class="mt">Welcome to Osu!</h1>
        <p class="shadow mt">Tauri + Svelte + Osu</p>
    </div>

    <div class="separator" />

    <img src="Songs/Wakusei/potofu.jpg" alt="" class="bg-image" />

    <div class="metadata fc">
        <div class="prop-val">
            <span class="property">Title</span>
            <span class="value">{metadata?.Title}</span>
        </div>
        <div class="prop-val">
            <span class="property">Artist</span>
            <span class="value">{metadata?.Artist}</span>
        </div>
        <div class="prop-val">
            <span class="property">Creator</span>
            <span class="value">{metadata?.Creator}</span>
        </div>
        <div class="prop-val">
            <span class="property">Version</span>
            <span class="value">{metadata?.Version}</span>
        </div>
        <div class="prop-val">
            <span class="property">Source</span>
            <span class="value">{metadata?.Source}</span>
        </div>
        <div class="prop-val">
            <span class="property">Tags</span>
            <span class="value">{metadata?.Tags}</span>
        </div>
        <div class="prop-val">
            <span class="property">BeatmapID</span>
            <span class="value">{metadata?.BeatmapID}</span>
        </div>
        <div class="prop-val">
            <span class="property">BeatmapSetID</span>
            <span class="value">{metadata?.BeatmapSetID}</span>
        </div>
    </div>
</div>

<style lang="scss">
    .container {
        .metadata {
            margin-top: 12px;
            .prop-val {
                margin-bottom: 6px;

                .property {
                    font-size: 12px;
                    color: #777;
                }

                .value {
                    font-size: 14px;
                    color: #ccc;
                }
            }
        }

        .bg-image {
            width: 100%;
        }
    }
</style>
