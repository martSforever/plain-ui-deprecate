<template>
    <div class="pl-nav-page">
        <component
                class="pl-nav-page-target"
                ref="page"
                :is="page.component"
                :param="page.param"
                v-bind="page.props"
                :path="page.path"
                :src="page.path"
                v-if="!!page.component && page.init"
                :nav="nav"/>
    </div>
</template>

<script>
    export default {
        name: "pl-nav-page",
        props: {
            id: {type: String, required: true},             //page的id
            page: {},                                       //page页面的数据信息
        },
        data() {
            const pages = this.$plain.$dom.findComponentUpward(this, 'pl-nav-pages')
            return {
                nav: {
                    push: (...args) => pages.push(...args),
                    back: (...args) => pages.back(...args),
                    redirect: (...args) => pages.redirect(...args),
                    backOff: (...args) => pages.backOff(...args),
                }
            }
        },
        methods: {

            push(...args) {
                return this.$parent
            },
            back(...args) {
                console.log(this.$parent)
            },

            /*
             *  back之前执行钩子函数
             *  @author     martsforever
             *  @datetime   2019/3/31 10:40
             */
            beforeBack(data) {
                if (!!this.$refs.page && !!this.$refs.page.beforeBack) {
                    return this.$refs.page.beforeBack(data)
                }
            },
            /*
             * 回退到当前页面时，触发的钩子函数
             *  @author     martsforever
             *  @datetime   2019/3/31 10:40
             */
            onBack(data) {
                if (!!this.$refs.page && !!this.$refs.page.onBack) {
                    return this.$refs.page.onBack(data)
                }
            },
        }

    }
</script>

<style lang="scss">
    .pl-nav-page {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: auto;
        background-color: white;
        @include transition-all;
    }
</style>