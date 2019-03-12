<template>
    <div class="demo-test-block">
        demo-test-block
        <demo-row>
            <demo-block>
                <link-button label="hello"/>
            </demo-block>
        </demo-row>
        <div class="aaa"></div>

    </div>
</template>

<script>
    export default {
        name: "demo-test-block"
    }
</script>

<style lang="scss">

    body {
        --aaa: #ddd;
    }

    $color-aaa: var(--aaa);

    .aaa {
        /*background-color: rgba($color-aaa, 0.2);*/
        background-color: rgba(var(--aaa), 0.2);
        height: 100px;
        width: 100px;
    }
</style>