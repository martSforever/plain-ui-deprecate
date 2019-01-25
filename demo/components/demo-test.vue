<template>
    <div class="demo-test crm-color">
        <button @click="demoTset">demo-test</button>
        <div class="content" @mouseenter="mouseenter" @mouseleave="mouseleave"></div>
    </div>
</template>

<script>
    export default {
        name: "demo-test",
        data() {
            return {
                keyboardListener: {
                    'ctrl+u': (e, name) => {
                        console.log(name)
                    },
                    'ctrl+d': (e, name) => {
                        console.log(name)
                    },
                    'ctrl+n': (e, name) => {
                        console.log(name)
                    },
                    'ctrl+b': (e, name) => {
                        console.log(name)
                    },
                    'ctrl+s': (e, name) => {
                        console.log(name)
                    },
                    'ctrl+g': (e, name) => {
                        console.log(name)
                    },
                    'ctrl+alt+k': (e, name) => {
                        console.log(name)
                    },
                    'ctrl+shift+3': (e, name) => {
                        console.log(name)
                    },
                    'ctrl+a': (e, name) => {
                        console.log(name)
                    },
                }
            }
        },
        methods: {
            demoTset() {
            },
            mouseenter() {
                this.$plain.$utils.keyboard.addListener(this.keyboardListener)
            },
            mouseleave() {
                this.$plain.$utils.keyboard.removeListener(this.keyboardListener)
            },
        },
        mounted() {

        },
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

    .content {
        width: 300px;
        height: 200px;
        background-color: black;
    }


</style>