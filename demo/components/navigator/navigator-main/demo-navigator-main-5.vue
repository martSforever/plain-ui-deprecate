<template>
    <div class="demo-navigator-main-5">
        <div>
            页面五:
            <div>
                tabData:{{pageTabData}}
            </div>
            <div>
                security:{{pageSecurity}}
            </div>
        </div>
        <link-button label="回退页面" @click="back"/>
        &nbsp;
        <link-button label="监听事件" @click="listenEvent"/>
        <link-button label="派发页签内事件" @click="$nav.$emit('hello','页面五数据1')"/>
        <link-button label="派发全局事件" @click="$nav.$emit('hello','页面五数据2',true)"/>
        <div>
            页面六传递参数：
            <link-input v-model="msg"/>
            <link-button label="打开页面六" box-color="info" @click="$nav.push('/navigator/navigator-main/demo-navigator-main-6',{msg})"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-5",
        props: {},
        data() {
            console.log(this.pageTabData)
            return {
                msg: null,
            }
        },
        methods: {
            back() {
                !!this.pageParam.callback && this.pageParam.callback()
                this.$nav.back()
            },

            listenEvent() {
                this.$nav.$on('hello',
                    (...args) => {
                        console.log('页面五接受页签内事件：hello', ...args)
                    })
            },
        },
    }
</script>

<style lang="scss">

</style>