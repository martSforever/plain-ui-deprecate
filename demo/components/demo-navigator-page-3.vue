<template>
    <link-page>
        <link-header title="页面三"/>
        <link-content>
            <div class="demo-navigator-page-3">
                <link-button label="回退两个页面" @click="baseNavigator.back(2)"/>
                <link-button label="再次打开页面3" @click="baseNavigator.push('/demo-navigator-page-3',{msg})"/>
                <link-input :value="param.msg"/>
                <link-input v-model="msg"/>
            </div>
        </link-content>
    </link-page>
</template>

<script>
    export default {
        name: "demo-navigator-page-3",
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