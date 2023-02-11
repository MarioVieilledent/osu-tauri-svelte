<script lang="ts">
    import Left from "./screen/Left.svelte";
    import Center from "./screen/Center.svelte";
    import Right from "./screen/Right.svelte";
</script>

<div class="container f">
    <div class="left fc">
        <Left />
    </div>
    <div class="center">
        <Center />
    </div>
    <div class="right fc">
        <Right />
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
