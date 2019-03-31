<template>
    <div class="pl-nav-page">
        <component
                ref="page"
                :is="page.component"
                :param="page.param"
                v-bind="page.props"
                :path="page.path"
                :src="page.path"
                v-if="!!page.component && page.init"/>
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
            return {}
        },
        methods: {
            beforeBack(data) {
                if (!!this.$refs.page && !!this.$refs.page.beforeBack) {
                    return this.$refs.page.beforeBack(data)
                }
            },
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
    }
</style>