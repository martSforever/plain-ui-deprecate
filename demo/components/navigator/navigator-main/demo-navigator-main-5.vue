<template>
    <div class="demo-navigator-main-5">
        <div>
            页面五:
            <div>
                tabData:{{tabData}}
            </div>
            <div>
                security:{{security}}
            </div>
        </div>
        <link-button label="回退页面" @click="back"/>

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
        props: {
            tabData: {},
            security: {},
            param: {},
        },
        data() {
            console.log(this.tabData)
            return {
                msg: null,
            }
        },
        methods: {
            back() {
                !!this.param.callback && this.param.callback()
                this.$nav.back()
            },
        },
    }
</script>

<style lang="scss">

</style>