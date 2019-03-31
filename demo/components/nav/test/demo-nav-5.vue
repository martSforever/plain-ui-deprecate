<template>
    <div class="demo-nav-5">
        <demo-row>
            <h2>页面五</h2>
        </demo-row>
        <demo-row>
            <link-button box-type="line" :label="`页面五参数:${param.msg}`"/>
        </demo-row>
        <demo-row>
            <link-button @click="back" label="返回"/>
            <link-button box-type="line" label="回退参数"/>
            <link-input v-model="ret"/>
            <link-button box-type="none" label="当回退参数为空时，在beforeBack中限制不能回退"/>
        </demo-row>
        <demo-row>
            <link-button label="回退两个页面" @click="nav.back(ret,2)"/>
            <link-button label="回退所有页面" @click="nav.backOff(ret,2)"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-5",
        props: {
            nav: {},
            param: {},
        },
        data() {
            return {
                ret: 'back data',
            }
        },
        methods: {
            back() {
                this.nav.back(this.ret)
            },

            beforeBack(data) {
                if (!data || data == '') {
                    const msg = '页面五，回退参数不能为空'
                    this.$notice.show(msg)
                    return Promise.reject(msg)
                }
            },
        }
    }
</script>

<style lang="scss">

</style>