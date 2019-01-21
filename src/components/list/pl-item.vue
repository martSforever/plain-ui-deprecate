<template>
    <div class="pl-item" @click="e=>$emit('click',e)">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "pl-item"
    }
</script>

<style lang="scss">
    .pl-item {
        @include public-style;
    }
</style>