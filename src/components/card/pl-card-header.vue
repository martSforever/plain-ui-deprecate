<template>
    <div class="pl-card-header">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "pl-card-header"
    }
</script>

<style lang="scss">
    .pl-card-header {
        @include public-style;
        height: 44px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 500;
        padding: 0 16px;
        border-bottom: var(--p-border);
        color: var(--p-color-normal-title);
    }
</style>