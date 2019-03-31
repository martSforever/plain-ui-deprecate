<template>
    <div class="demo-nav-1">
        <h2>页面一</h2>
        <demo-row>
            <link-button label="打开页面二" @click="page2"/>
            <link-button label="页面二参数:" box-type="line"/>
            <link-input v-model="msg"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-1",
        props: {
            nav: {},
        },
        data() {
            return {
                msg: null,
            }
        },
        methods: {
            onBack(data) {
                // console.log('onBack', data)
                this.$notice.show(`页面一监听到回退事件` + JSON.stringify(data))
            },
            page2() {
                this.nav.push({
                    path: '/nav/test/demo-nav-2',
                    param: {
                        msg: this.msg
                    }
                })
            },
        }
    }
</script>

<style lang="scss">

</style>