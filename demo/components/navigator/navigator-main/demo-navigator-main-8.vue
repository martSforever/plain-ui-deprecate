<template>
    <div class="demo-navigator-main-8">
        <div>
            页面八
        </div>
        <div>
            页面八得到的参数：{{pageParam.msg}}
        </div>
        <link-button label="回退页面" @click="$nav.back()"/>
        <link-button label="回退两个页面" @click="$nav.back(2)"/>
        <link-button label="回退到第一个页面" @click="$nav.backoff()"/>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-main-8",
        data() {
            return {
                msg: null,
            }
        },
    }
</script>

<style lang="scss">

</style>