<template>
    <link-page>
        <link-header title="页面二"/>
        <link-content>
            <div class="demo-navigator-page-2">
                <link-button-group>
                    <link-button label="返回" prefix-icon="pl-arrow-left" @click="baseNavigator.back()"/>
                    <link-button label="打开页面3" @click="baseNavigator.push('/demo-navigator-page-3',{msg})"/>
                </link-button-group>
                <div>
                    <link-input :value="param.msg"/>
                </div>
                <div>
                    <link-input v-model="msg"/>
                </div>
            </div>
        </link-content>
    </link-page>
</template>

<script>
    export default {
        name: "demo-navigator-page-2",
        props: {
            param: {}
        },
        data() {
            return {
                msg: null
            }
        },
    }
</script>

<style lang="scss">

</style>