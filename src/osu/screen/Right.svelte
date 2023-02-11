<script lang="ts">
    import { onMount } from "svelte";
    import { keys, fps, KEY_SETTINGS, volume } from "../settings";

    function setKey(index: number, e: any): void {
        if (index !== 3) {
            document.getElementById(`key-input-${index + 1}`).focus();
        } else {
            document.getElementById(`key-input-3`).blur();
        }
        $keys[index] = e.target.value;
        $keys = $keys;
        window.localStorage.setItem(KEY_SETTINGS, JSON.stringify($keys));
    }

    function select(e: any): void {
        e.target.select();
    }

    onMount(async () => {
        let k = window.localStorage.getItem(KEY_SETTINGS);
        if (k) {
            $keys = JSON.parse(k);
        } else {
            $keys = ["s", "d", "l", "m"];
        }

        $keys.forEach((k, i) => {
            (
                document.getElementById(`key-input-${i}`) as HTMLInputElement
            ).value = k;
        });
    });
</script>

<div class="container fc">
    <div class="center f">
        <span>Settings</span>
    </div>

    <div class="separator" />

    <div class="setting-block fc">
        <span>Keys</span>
        <div class="four-inputs f">
            <input
                id="key-input-0"
                type="text"
                on:focus={(e) => select(e)}
                on:input={(e) => setKey(0, e)}
            />
            <input
                id="key-input-1"
                type="text"
                on:focus={(e) => select(e)}
                on:input={(e) => setKey(1, e)}
            />
            <input
                id="key-input-2"
                type="text"
                on:focus={(e) => select(e)}
                on:input={(e) => setKey(2, e)}
            />
            <input
                id="key-input-3"
                type="text"
                on:focus={(e) => select(e)}
                on:input={(e) => setKey(3, e)}
            />
        </div>
    </div>

    <div class="separator" />

    <div class="setting-block fc">
        <span>FPS</span>
        <input type="text" bind:value={$fps} />
    </div>

    <div class="separator" />

    <div class="setting-block fc">
        <span>Volume {$volume}%</span>
        <input type="range" min="0" max="100" bind:value={$volume} />
    </div>
</div>

<style lang="scss">
    .container {
        .setting-block {
            span {
                margin-bottom: 6px;
            }
            .four-inputs {
                justify-content: space-between;
                input {
                    width: 22%;
                }
            }
        }
    }
</style>
