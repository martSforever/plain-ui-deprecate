<template>
    <div class="demo-test crm-color">
        <button @click="toggleVal = !toggleVal">toggle</button>
        <iframe width="100%" height="300" src="//jsfiddle.net/martsforever/vhq3d4oz/2/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
        <button @click="open">open in fiddle</button>
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
            open() {
                window.open("//jsfiddle.net/martsforever/vhq3d4oz/2/embedded/js,html,css,result/dark/")
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