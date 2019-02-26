<template>
    <div class="pl-navigator-main">
        <div class="pl-navigator-main-header-wrapper">
            <div class="pl-navigator-main-header">
                <div class="pl-navigator-main-header-item"
                     v-for="(item,index) in pageStack"
                     :key="index"
                     :class="{'pl-navigator-main-header-item-active':index === currentValue}"
                     @click="p_clickTabTitle(item,index)">
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>

        <div class="pl-navigator-main-body">
            <pl-navigator-main-tab
                    v-for="(item,index) in pageStack"
                    :key="index"
                    :page="item"
                    v-if="item.init"
                    v-show="currentValue === index"/>
        </div>
    </div>
</template>

<script>
    import PlNavigatorMainTab from "./pl-navigator-main-tab";

    export default {
        name: "pl-navigator-main",
        components: {PlNavigatorMainTab},
        data() {
            const pageStack = []
            return {
                pageStack,
                currentValue: null,
            }
        },
        mounted() {
            if (!!this.$nav) {
                console.error("整个应用只允许存在一个navigator-main组件")
                return
            }
            this.$set(this.$plain.Vue.prototype, '$nav', {
                openTab: async (title, path, param) => {
                    await this.open(title, path, param)
                },
                openPage: async () => {

                }
            })
        },
        methods: {
            async open(title, path, param) {
                for (let i = 0; i < this.pageStack.length; i++) {
                    const page = this.pageStack[i];
                    if (page.path === path && page.title === title) {
                        this.currentValue = i
                        return
                    }
                }
                const pc = await this.$plain.pageRegistry(path)
                if (!pc) return
                this.pageStack.push({
                    title,
                    path,
                    component: pc,
                    param,
                    init: true,
                    id: this.$plain.$utils.uuid()
                })
                this.currentValue = this.pageStack.length - 1
                // this.p_save()
            },
            async close() {

            },
            async p_clickTabTitle(item) {
                await this.open(item.title, item.path, item.param)
            },
        },
        beforeDestroy() {
            this.$delete(this.$plain.Vue.prototype, '$nav')
        },
    }
</script>

<style lang="scss">

    $navigator-main-tab-border-color: #d1d7e6;
    $navigator-main-tab-border: solid 1px $navigator-main-tab-border-color;
    $navigator-main-tab-header-padding: 24px;

    .pl-navigator-main {
        @include public-style;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        .pl-navigator-main-header-wrapper {
            @include public-style;
            height: 40px;
            width: 100%;
            display: flex;

            .pl-navigator-main-header {
                @include public-style;
                height: 32px;
                width: 100%;

                border-bottom: $navigator-main-tab-border;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 $navigator-main-tab-header-padding;
                .pl-navigator-main-header-item {
                    padding: 0 $navigator-main-tab-header-padding;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 13px;
                    color: $navigator-main-tab-border-color;
                    border-bottom-color: transparent;
                    &.pl-navigator-main-header-item-active {
                        border: $navigator-main-tab-border;
                        border-bottom-color: white;
                        color: $color-normal-title;
                    }
                }
            }
        }

        .pl-navigator-main-body {
            flex: 1;
            position: relative;
        }
    }
</style>