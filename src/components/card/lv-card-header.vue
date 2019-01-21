<template>
    <div class="lv-card-header">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "lv-card-header"
    }
</script>

<style lang="scss">
    .lv-card-header {
        @include public-style;
        height: 44px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 500;
        padding: 0 16px;
        border-bottom: $border;
        color: $color-normal-title;
    }
</style>