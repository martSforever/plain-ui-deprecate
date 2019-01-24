<template>
    <div class="demo-test crm-color">
        <button @click="demoTset">demo-test</button>
    </div>
</template>

<script>
    export default {
        name: "demo-test",
        methods: {
            demoTset() {
                const render = function (h) {
                    return (
                        <div>
                            <link-table-column></link-table-column>
                            <ddd>222</ddd>
                        </div>
                    )
                }
                console.log(render(console.log))
            },
        }
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