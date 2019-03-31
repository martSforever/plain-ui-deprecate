<template>
    <div class="demo-nav--4">
        <demo-row>
            <h2>页面四</h2>
        </demo-row>
        <demo-row>
            <link-button box-type="line" :label="`页面四参数:${param.msg}`"/>
        </demo-row>
        <demo-row>
            <link-button @click="nav.back()" label="返回"/>
        </demo-row>
        <demo-row>
            <link-button label="打开页面五" @click="openPage"/>
            <link-button label="打开页面五或者重定向到页面六参数:" box-type="line"/>
            <link-input v-model="msg"/>
        </demo-row>
        <demo-row>
            <link-button label="重定向到页面6" @click="redirect"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-nav--4",
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
                    path: '/nav/test/demo-nav-5',
                    param: {
                        msg: this.msg
                    }
                })
            },
            redirect() {
                this.nav.redirect({
                    path: '/nav/test/demo-nav-6',
                    param: {
                        msg: this.msg
                    }
                })
            },
            onBack(data) {
                this.$notice.show(`页面四监听到回退事件` + JSON.stringify(data))
            },

            beforeBack(data) {
                if (!!data && data.indexOf('4') > -1) {
                    const msg = '页面四，返回参数中含4，不可回退'
                    this.$notice.show(msg)
                    return Promise.reject(msg)
                }
            },
        }
    }
</script>

<style lang="scss">

</style>