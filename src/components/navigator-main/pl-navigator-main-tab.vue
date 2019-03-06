<template>
    <div class="pl-navigator-main-tab">
        <div class="pl-navigator-main-tab-wrapper">
            <div class="pl-navigator-main-tab-header">
                <div class="pl-navigator-main-tab-header-item"
                     v-for="(item,index) in pageStack"
                     :key="index"
                     :class="{
                            'pl-navigator-main-tab-header-item-active':index === currentValue,
                            'pl-navigator-main-tab-header-item-prev':index === currentValue-1,
                            'pl-navigator-main-tab-header-item-next':index === currentValue+1,
                         }"
                     @click="p_clickTabTitle(index)">
                    <div class="pl-navigator-main-tab-header-item-wrapper">
                        <span class="pl-navigator-main-tab-header-item-label">{{item.title}}</span>
                        <div class="pl-navigator-main-tab-header-item-close">
                            <pl-icon icon="pl-close" @click.stop="p_close(item.id)"/>
                        </div>
                    </div>
                </div>
                <div class="pl-navigator-main-tab-header-item pl-navigator-main-tab-header-item-empty"
                     :class="{'pl-navigator-main-tab-header-item-next':currentValue === pageStack.length - 1}">
                </div>
            </div>

            <div class="pl-navigator-main-tab-body">
                <pl-navigator-main-page
                        v-for="(item,index) in pageStack"
                        :key="item.id"
                        :tab="item"
                        :before-push="beforePush"
                        :after-push="afterPush"
                        v-if="item.init"
                        v-show="currentValue === index"/>
            </div>
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
            defaultPage: {type: Object},                                        //第一次默认打开的页面，格式{title, path, param, security}
            maxTabs: {type: Number, default: 20},                               //最大打开页签的个数
            beforeOpenTab: {type: Function},                                    //打开页签之前钩子函数
            afterOpenTab: {type: Function},                                     //打开页签之后的钩子函数
            beforePush: {type: Function},                                       //打开页面之前的钩子函数
            afterPush: {type: Function},                                        //关闭页面之后的钩子函数
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
                this.$plain.$tab.$destroy()
                this.$plain.$tab = null
            }
            this.$plain.$tab = this

            /*打开默认页面*/
            if (this.pageStack.length === 0 && !!this.defaultPage) {
                this.p_openPage(this.defaultPage)
            }
        },
        computed: {
            classes() {
                return {}
            },
        },
        methods: {
            /**
             * 打开tab标签页
             * @author  韦胜健
             * @date    2019/2/26 16:27
             * @param   id          tab的id
             * @param   title       tab的标题
             * @param   path        tab根页面路径
             * @param   param       tab根页面参数
             * @param   data        tab页签额外的数据
             * @param   security    tab的安全性
             */
            async open({id, title, path, param, security, data}) {

                /*预处理*/
                const openData = {id, title, path, param, security, data}
                !!this.beforeOpenTab && (await this.beforeOpenTab(openData))
                id = openData.id
                title = openData.title
                path = openData.path
                param = openData.param
                security = openData.security
                data = openData.data

                if (!id) return Promise.reject("打开Tab页时，id不能为空！")

                /*打开之前判断标签是否已经打开，已经打开则切换到标签页，判断标签页是否已经初始化，未初始化则加载页面*/
                let {page, pageIndex} = this.p_findPage(id)
                if (page != null) {
                    if (!page.init) {
                        page.component = await this.$plain.pageRegistry(path)
                        page.init = true
                    }
                    this.currentValue = pageIndex
                    this.p_save()
                    this.$emit('openTab', page)
                    return page
                }

                if (!!this.maxTabs && this.pageStack.length === this.maxTabs) {
                    const msg = `最多只能打开${this.maxTabs}个页签！`
                    this.$dialog.show(msg)
                    return Promise.reject(msg)
                }

                /*打开新标签页*/
                const pc = await this.$plain.pageRegistry(path)
                if (!pc) return
                page = {id, title, path, param, security, data, component: pc, init: true}

                this.pageStack.push(page)
                await this.$plain.nextTick()
                !!this.afterOpenTab && (await this.afterOpenTab(page))
                this.currentValue = this.pageStack.length - 1
                this.p_save()
                this.$emit('openTab', page)
                return page
            },
            /**
             * 关闭标签页
             * @author  韦胜健
             * @date    2019/2/26 16:33
             */
            async close(id) {
                return this.p_close(id)
            },
            /**
             * 刷新当前tab页面
             * @author  韦胜健
             * @date    2019/3/5 18:48
             */
            async fresh() {
                if (this.pageStack.length === 0) return
                this.pageStack[this.currentValue].init = false
                await this.$plain.nextTick()
                this.pageStack[this.currentValue].init = true
            },
            /**
             * 处理标签标题点击事件
             * @author  韦胜健
             * @date    2019/2/26 16:33
             */
            async p_clickTabTitle(index) {
                return await this.p_openPage(this.pageStack[index])
            },
            /**
             * 打开页面
             * @author  韦胜健
             * @date    2019/3/5 18:54
             */
            async p_openPage(page) {
                const {id, title, path, param, security, data} = page
                return this.open({id, title, path, param, security, data})
            },
            /**
             * 处理标签标题关闭事件
             * @author  韦胜健
             * @date    2019/2/26 16:33
             */
            async p_close(id) {
                if (this.pageStack.length === 1) {
                    this.$dialog.show("不能关闭所有页面！")
                    return
                }
                const {page, pageIndex} = this.p_findPage(id)
                if (page == null) return
                let index = pageIndex
                let nextIndex = this.currentValue
                if (index <= this.currentValue) nextIndex--;
                const closePage = this.pageStack.splice(index, 1)
                if (nextIndex < 0 && this.pageStack.length > 0) nextIndex = 0
                nextIndex > -1 && this.p_clickTabTitle(nextIndex)
                this.p_save()
                this.$emit('close', closePage)
            },
            /**
             * 根据title以及path获取page的索引
             * @author  韦胜健
             * @date    2019/2/26 16:34
             */
            p_findPage(id) {
                const page = this.$plain.$utils.findOne(this.pageStack, (item) => item.id === id)
                const pageIndex = this.pageStack.indexOf(page)
                return {page, pageIndex}
            },
            /**
             * 缓存当前页面信息
             * @author  韦胜健
             * @date    2019/2/26 16:34
             */
            p_save() {
                this.selfStorage.index = this.currentValue;
                this.selfStorage.pageStack = this.pageStack.map(({id, title, path, param, security, data}) => ({id, title, path, param, security, data}))
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

    $navigator-main-tab-border-color: #e8ebf7;
    $navigator-main-tab-border: solid 1px $navigator-main-tab-border-color;
    $navigator-main-tab-header-padding: 16px;
    $navigator-main-tab-background-color: #F0F2F7;
    $navigator-main-tab-head-radios: 9px;

    .pl-navigator-main-tab {
        @include public-style;
        height: 100%;
        width: 100%;
        background-color: $navigator-main-tab-background-color;
        padding: 16px;

        .pl-navigator-main-tab-wrapper {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;

            .pl-navigator-main-tab-header {
                height: 32px;
                display: inline-flex;
                align-items: center;
                width: fit-content;
                background-color: white;
                max-width: 100%;
                overflow: hidden;
                .pl-navigator-main-tab-header-item {
                    height: 100%;
                    font-size: 12px;
                    background-color: $navigator-main-tab-background-color;
                    cursor: pointer;
                    user-select: none;
                    box-sizing: border-box;
                    width: 150px;
                    &.pl-navigator-main-tab-header-item-empty {
                        cursor: default;
                        width: 10px;
                    }
                    .pl-navigator-main-tab-header-item-wrapper {
                        height: 100%;
                        padding: 0 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        white-space: nowrap;
                        position: relative;
                        /*.pl-navigator-main-tab-header-item-close {
                            opacity: 0;
                        }*/
                        .pl-navigator-main-tab-header-item-close {
                            position: absolute;
                            right: 20px;
                            top: 0;
                            bottom: 0;
                            display: flex;
                            align-items: center;
                        }
                        .pl-navigator-main-tab-header-item-label {
                            width: calc(100% - 15px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            position: relative;
                        }
                    }
                    &.pl-navigator-main-tab-header-item-active {
                        color: #869eff;
                        .pl-navigator-main-tab-header-item-wrapper {
                            background-color: white;
                            border-top-left-radius: $navigator-main-tab-head-radios;
                            border-top-right-radius: $navigator-main-tab-head-radios;
                        }
                        /*.pl-navigator-main-tab-header-item-close {
                            opacity: 1;
                        }*/
                    }
                    &.pl-navigator-main-tab-header-item-prev {
                        border-bottom-right-radius: $navigator-main-tab-head-radios;
                    }
                    &.pl-navigator-main-tab-header-item-next {
                        border-bottom-left-radius: $navigator-main-tab-head-radios;
                    }
                }
            }
        }
        .pl-navigator-main-tab-body {
            flex: 1;
            position: relative;

            box-sizing: border-box;
        }
    }
</style>