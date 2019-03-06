<template>
    <div class="demo-navigator-main-6">
        <div>
            页面六
        </div>
        <div>
            页面六得到的参数：{{pageParam.msg}}
        </div>
        <link-button label="回退页面" @click="$nav.back()"/>
        <div>
            页面七传递参数：
            <link-input v-model="msg"/>
            <link-button label="打开页面七" box-color="info" @click="$nav.push('/navigator/navigator-main/demo-navigator-main-7',{msg})"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-6",
        data() {
            return {
                msg: null,
            }
        },
    }
</script>

<style lang="scss">

</style>