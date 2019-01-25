<template>
    <div class="demo-test crm-color">
        <button @click="toggleVal = !toggleVal">toggle</button>

        <child-component v-if="toggleVal"/>
    </div>
</template>

<script>

    const childComponent = {
        render(h) {
            return (
                <div class="child-component"></div>
            )
        },
        mounted() {
            this.$plain.$utils.keyboard.listen(this.$el, {
                'ctrl+s': () => {
                    console.log('ctrl+s')
                }
            })
        },
        beforeDestroy() {
            console.log('beforeDestroy')
        }
    }

    export default {
        name: "demo-test",
        components: {childComponent},
        data() {
            return {
                toggleVal: true,
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
            toggle() {
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

    .child-component {
        width: 300px;
        height: 200px;
        background-color: black;
    }


</style>