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
        },
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
        },
    }
</script>

<style lang="scss">

</style>