<template>
    <div class="demo-nav-2">
        <demo-row>
            <h2>页面二</h2>
        </demo-row>
        <demo-row>
            <link-button box-type="line" :label="`页面二参数:${param.msg}`"/>
        </demo-row>
        <demo-row>
            <link-button @click="back" label="返回"/>
        </demo-row>
        <demo-row>
            <link-button label="打开页面三" @click="openPage"/>
            <link-button label="打开页面三参数:" box-type="line"/>
            <link-input v-model="msg"/>
        </demo-row>
        <demo-row>
            <link-button label="监听事件" @click="nav.on('hello',logData)"/>
            <link-button label="派发事件" @click="nav.emit('hello','hello world')"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-2",
        props: {
            param: {},
            nav: {},
        },
        data() {
            return {
                ret: null,
                msg: null,
            }
        },
        methods: {
            back() {
                this.nav.back(this.ret)
            },
            openPage() {
                this.nav.push({
                    path: '/nav/test/demo-nav-3',
                    param: {
                        msg: this.msg
                    }
                })
            },

            onBack(data) {
                this.$notice.show(`页面二监听到回退事件` + JSON.stringify(data))
            },

            logData(data) {
                console.log('页面二' + data);
            },
        }
    }
</script>

<style lang="scss">

</style>