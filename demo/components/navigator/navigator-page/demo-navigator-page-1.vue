<template>
    <link-page>
        <link-header title="页面一"/>
        <link-content>
            <div class="demo-navigator-page-1">
                <link-button label="打开页面二" @click="baseNavigator.push('/navigator/navigator-page/demo-navigator-page-2',{msg})"/>
                <div>
                    <link-input v-model="msg"/>
                </div>
            </div>
        </link-content>
    </link-page>
</template>

<script>
    export default {
        name: "demo-navigator-page-1",
        props: {
            param: {}
        },
        data() {
            return {
                msg: this.param.msg
            }
        },
    }
</script>

<style lang="scss">

</style>