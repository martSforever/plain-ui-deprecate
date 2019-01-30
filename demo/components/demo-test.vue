<template>
    <div class="demo-test crm-color">
        <button @click="toggleVal = !toggleVal">toggle</button>
        <iframe width="100%" height="300" src="//jsfiddle.net/martsforever/vhq3d4oz/embedded/result,js,html,css" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
        <button @click="open">open in fiddle</button>

        <div v-highlight>
            <pre>
                <code v-html="content"></code>
            </pre>
        </div>

    </div>
</template>

<script>

    import Vue from 'vue'
    import hljs from 'highlight.js';
    import 'highlight.js/styles/googlecode.css' //样式文件

    Vue.directive('highlight',function (el) {
        let blocks = el.querySelectorAll('pre code');
        setTimeout(() =>{
            blocks.forEach((block)=>{
                hljs.highlightBlock(block)
            })
        }, 200)
    })

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
                },
                content:`
                    export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
                `
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

    body {
        background-color: white;
    }
</style>