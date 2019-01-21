<template>
    <div class="lv-item" @click="e=>$emit('click',e)">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "lv-item"
    }
</script>

<style lang="scss">
    .lv-item {
        @include public-style;
    }
</style>