<template>
    <div class="demo-test crm-color">
        <button>demo-test</button>
    </div>
</template>

<script>
    export default {
        name: "demo-test"
    }
</script>

<style lang="scss">

    body {
        --color: green;
    }

    .crm-color {
        --color: blue;
    }

    button {
        background-color: var(--color);
    }


</style>