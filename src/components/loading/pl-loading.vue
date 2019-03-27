<template>
    <pl-icon loading :icon="`pl-loading-${type}`"/>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-loading",
        components: {PlIcon},
        props: {
            type: {type: String, default: 'section-one'},
        },
    }
</script>

<style lang="scss">
    .pl-loading {
        display: inline-block;
        vertical-align: center;
        img.pl-loading-img {
            height: 100%;
            width: 100%;
            display: block;
        }
    }
</style>