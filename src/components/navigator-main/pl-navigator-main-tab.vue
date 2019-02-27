<template>
    <div class="pl-navigator-main-tab">
        <div class="pl-navigator-main-tab-header-wrapper">
            <div class="pl-navigator-main-tab-header">
                <div class="pl-navigator-main-tab-header-item"
                     v-for="(item,index) in pageStack"
                     :key="index"
                     :class="{'pl-navigator-main-tab-header-item-active':index === currentValue}"
                     @click="p_clickTabTitle(index)">
                    <span>{{item.title}}</span>
                    <div class="pl-navigator-main-tab-header-item-close" @click.stop="p_close(item.title,item.path)">
                        <pl-icon icon="pl-close-circle-fill"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="pl-navigator-main-tab-body">
            <pl-navigator-main-page
                    v-for="(item,index) in pageStack"
                    :key="item.id"
                    :tab="item"
                    v-if="item.init"
                    v-show="currentValue === index"/>
        </div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";
    import PlNavigatorMainPage from "./pl-navigator-main-page";

    const STORAGE_KEY = 'navigator-main'

    export default {
        name: "pl-navigator-main-tab",
        components: {PlNavigatorMainPage, PlIcon},
        props: {
            maxTabs: {type: Number, default: 5},                                //最大打开页签的个数
        },
        data() {
            let pageStack = []
            /*从缓存中获取页面信息*/
            let selfStorage = this.$plain.$storage.get(STORAGE_KEY) || {}
            if (selfStorage.index != null && !!selfStorage.pageStack && selfStorage.pageStack.length > 0) {
                pageStack = selfStorage.pageStack.map((item) => Object.assign({init: false}, item))
                this.$nextTick(() => this.p_clickTabTitle(selfStorage.index))
            }
            return {
                pageStack,
                selfStorage,
                currentValue: null,
            }
        },
        created() {
            /*全局注入nav导航对象*/
            if (!!this.$plain.$tab) {
                console.error("整个应用只允许存在一个navigator-main组件")
                return
            }
            this.$plain.$tab = this
        },
        methods: {
            /**
             * 打开tab标签页
             * @author  韦胜健
             * @date    2019/2/26 16:27
             */
            async open(title, path, param) {
                /*打开之前判断标签是否已经打开，已经打开则切换到标签页，判断标签页是否已经初始化，未初始化则加载页面*/
                const pageIndex = this.p_findPage(title, path)
                if (pageIndex != null) {
                    const page = this.pageStack[pageIndex]
                    if (!page.init) {
                        page.component = await this.$plain.pageRegistry(path)
                        page.init = true
                    }
                    this.currentValue = pageIndex
                    this.p_save()
                    return
                }

                if (!!this.maxTabs && this.pageStack.length === this.maxTabs) {
                    const msg = `最多只能打开${this.maxTabs}个页签！`
                    this.$dialog.show(msg)
                    return Promise.reject(msg)
                }

                /*打开新标签页*/
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
                this.p_save()
            },
            /**
             * 关闭标签页
             * @author  韦胜健
             * @date    2019/2/26 16:33
             */
            async close(title, path) {
                return this.p_close(title, path)
            },
            /**
             * 处理标签标题点击事件
             * @author  韦胜健
             * @date    2019/2/26 16:33
             */
            async p_clickTabTitle(index) {
                const {title, path, param} = this.pageStack[index]
                return this.open(title, path, param)
            },
            /**
             * 处理标签标题关闭事件
             * @author  韦胜健
             * @date    2019/2/26 16:33
             */
            async p_close(title, path) {
                if (this.pageStack.length === 1) {
                    this.$dialog.show("不能关闭所有页面！")
                    return
                }
                const pageIndex = this.p_findPage(title, path)
                if (pageIndex == null) return
                let index = pageIndex
                let nextIndex = this.currentValue
                if (index <= this.currentValue) nextIndex--;
                this.pageStack.splice(index, 1)
                if (nextIndex < 0 && this.pageStack.length > 0) nextIndex = 0
                nextIndex > -1 && this.p_clickTabTitle(nextIndex)
                this.p_save()
            },
            /**
             * 根据title以及path获取page的索引
             * @author  韦胜健
             * @date    2019/2/26 16:34
             */
            p_findPage(title, path) {
                for (let i = 0; i < this.pageStack.length; i++) {
                    const page = this.pageStack[i];
                    if (page.path === path && page.title === title) {
                        return i
                    }
                }
                return null
            },
            /**
             * 缓存当前页面信息
             * @author  韦胜健
             * @date    2019/2/26 16:34
             */
            p_save() {
                this.selfStorage.index = this.currentValue;
                this.selfStorage.pageStack = this.pageStack.map(({title, path, param, id}) => {
                    return {title, path, param, id}
                })
                this.$plain.$storage.set(STORAGE_KEY, this.selfStorage)
            },
        },
        beforeDestroy() {
            // console.log('pl-navigator-main-tab beforeDestroy')
            this.$delete(this.$plain, '$tab')
            this.$plain.$tab = null
        },
    }
</script>

<style lang="scss">

    $navigator-main-tab-border-color: #d1d7e6;
    $navigator-main-tab-border: solid 1px $navigator-main-tab-border-color;
    $navigator-main-tab-header-padding: 24px;

    .pl-navigator-main-tab {
        @include public-style;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        .pl-navigator-main-tab-header-wrapper {
            @include public-style;
            height: 40px;
            width: 100%;
            display: flex;

            .pl-navigator-main-tab-header {
                @include public-style;
                height: 32px;
                width: 100%;

                border-bottom: $navigator-main-tab-border;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 $navigator-main-tab-header-padding;
                .pl-navigator-main-tab-header-item {
                    padding: 0 $navigator-main-tab-header-padding;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 13px;
                    color: $navigator-main-tab-border-color;
                    border-bottom-color: transparent;
                    position: relative;
                    .pl-navigator-main-tab-header-item-close {
                        box-sizing: border-box;
                        position: absolute;
                        right: 0.5em;
                        top: 0;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        padding-top: 2px;
                        color: $navigator-main-tab-border-color;
                        opacity: 0;
                    }
                    &.pl-navigator-main-tab-header-item-active {
                        border: $navigator-main-tab-border;
                        border-bottom-color: white;
                        color: $color-normal-title;
                    }
                    &.pl-navigator-main-tab-header-item:hover {
                        .pl-navigator-main-tab-header-item-close {
                            opacity: 1;
                        }
                    }

                }
            }
        }

        .pl-navigator-main-tab-body {
            flex: 1;
            position: relative;
        }
    }
</style>