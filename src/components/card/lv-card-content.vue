<template>
    <div class="lv-card-content">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "lv-card-content"
    }
</script>

<style lang="scss">
    .lv-card-content {
        @include public-style;
        padding: 12px 16px;
        font-size: 12px;
    }
</style>