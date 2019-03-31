<template>
    <div class="demo-nav-3">
        <demo-row>
            <h2>页面三</h2>
        </demo-row>
        <demo-row>
            <link-button box-type="line" :label="`页面三参数:${param.msg}`"/>
        </demo-row>
        <demo-row>
            <link-button @click="nav.back()" label="返回"/>
        </demo-row>
        <demo-row>
            <link-button label="打开页面四" @click="openPage"/>
            <link-button label="打开页面四参数:" box-type="line"/>
            <link-input v-model="msg"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-3",
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
            openPage() {
                this.nav.push({
                    path: '/nav/test/demo-nav-4',
                    param: {
                        msg: this.msg
                    }
                })
            },
        }
    }
</script>

<style lang="scss">

</style>