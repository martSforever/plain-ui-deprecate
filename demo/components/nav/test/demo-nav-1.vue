<template>
    <div class="demo-nav-1">
        <demo-row>
            <h2>页面一</h2>
        </demo-row>
        <demo-row>
            <link-button box-type="line" :label="`页面一参数:${param.msg}`"/>
        </demo-row>
        <demo-row>
            <link-button label="打开页面二" @click="page2"/>
            <link-button label="打开页面二参数:" box-type="line"/>
            <link-input v-model="msg"/>
        </demo-row>
        <demo-row>
            <link-button label="监听事件" @click="nav.on('hello',logData)"/>
            <link-button label="监听一次事件" @click="nav.once('hello',logData)"/>
            <link-button label="解除监听事件" @click="nav.off('hello',logData)"/>
            <link-button label="派发事件" @click="nav.emit('hello','hello world')"/>
            <link-button label="派发全局事件" @click="nav.emit('hello','hello world',true)"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-1",
        props: {
            nav: {},
            param: {},
        },
        data() {
            return {
                msg: null,
            }
        },
        methods: {
            page2() {
                this.nav.push({
                    path: '/nav/test/demo-nav-2',
                    param: {
                        msg: this.msg
                    }
                })
            },

            onBack(data) {
                this.$notice.show(`页面一监听到回退事件` + JSON.stringify(data))
            },

            logData(data) {
                console.log('页面一' + data);
            },
        }
    }
</script>

<style lang="scss">

</style>