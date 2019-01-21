<template>
    <div class="pl-card-content">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "pl-card-content"
    }
</script>

<style lang="scss">
    .pl-card-content {
        @include public-style;
        padding: 12px 16px;
        font-size: 12px;
    }
</style>