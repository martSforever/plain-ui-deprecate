<template>
    <div class="pl-navigator-main-tab">
        <div class="pl-navigator-main-tab-wrapper">
            <div class="pl-navigator-main-tab-header-wrapper" v-if="!hideHeader">
                <div class="pl-navigator-main-tab-header">
                    <div class="pl-navigator-main-tab-header-item"
                         v-for="(item,index) in pageStack"
                         :key="index"
                         :class="{
                            'pl-navigator-main-tab-header-item-active':index === currentValue,
                            'pl-navigator-main-tab-header-item-prev':index === currentValue-1,
                            'pl-navigator-main-tab-header-item-next':index === currentValue+1,
                         }"
                         @click="p_clickTabTitle(index)"
                         @contextmenu.prevent="e=>p_contextMenu(e,item,index)">
                        <div class="pl-navigator-main-tab-header-item-wrapper">
                            <div class="pl-navigator-main-tab-header-item-inner">
                                <span class="pl-navigator-main-tab-header-item-label">
                                    <pl-tooltip-text :content="item.title"/>
                                </span>
                                <div class="pl-navigator-main-tab-header-item-close" v-if="pageStack.length>1">
                                    <pl-icon icon="pl-close" @click.stop="p_close(item.id)"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pl-navigator-main-tab-header-item pl-navigator-main-tab-header-item-empty"
                         :class="{'pl-navigator-main-tab-header-item-next':currentValue === pageStack.length - 1}">
                    </div>
                </div>
                <div class="pl-navigator-main-tab-header-slot">
                    <slot name="tab"></slot>
                </div>
            </div>

            <div class="pl-navigator-main-tab-body">
                <pl-navigator-main-page
                        ref="pages"
                        v-for="(item,index) in pageStack"
                        :key="item.id"
                        :id="item.id"
                        :tab="item"
                        :before-push="beforePush"
                        :after-push="afterPush"
                        :get-page-component="p_getPageComponent"
                        :set-storage="p_setStorage"
                        :get-storage="p_getStorage"
                        v-if="item.init"
                        v-show="currentValue === index"

                        @refreshUrl="p_refreshUrl"/>
            </div>
        </div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";
    import PlNavigatorMainPage from "./pl-navigator-main-page";

    import {NAVIGATOR_CONSTANT} from "./index";
    import PlTooltipText from "../tooltip/pl-tooltip-text";

    export default {
        name: "pl-navigator-main-tab",
        components: {PlTooltipText, PlNavigatorMainPage, PlIcon},
        props: {
            defaultPage: {type: Object},                                        //第一次默认打开的页面，格式{title, path, param, security}
            maxTabs: {type: Number, default: 20},                               //最大打开页签的个数
            beforeOpenTab: {type: Function},                                    //打开页签之前钩子函数
            afterOpenTab: {type: Function},                                     //打开页签之后的钩子函数
            beforePush: {type: Function},                                       //打开页面之前的钩子函数
            afterPush: {type: Function},                                        //关闭页面之后的钩子函数
            beforeOpenWindow: {type: Function},                                 //打开浏览器窗口页面之前的钩子函数
            afterOpenWindow: {type: Function},                                  //打开浏览器窗口页面之后的钩子函数
            idGenerator: {type: Function, required: true},                      //Tab页签id生成函数
            pageRegistryErrorHandler: {type: Function},                         //请求页面js文件出错处理
            page404: {type: String},                                            //找不到页面时，显示的404页面
            hideHeader: {type: Boolean},                                        //是否隐藏header
            storageKey: {type: String},                                         //多页面应用同时使用这个导航组件的话，缓存可能会冲突，这里未设置缓存的关键字，不同单页面应用的key应该不同
        },
        data() {
            let pageStack = []
            /*从缓存中获取页面信息*/
            let selfStorage = this.p_getStorage(NAVIGATOR_CONSTANT.TAB)
            if (selfStorage.index != null && !!selfStorage.pageStack && selfStorage.pageStack.length > 0) {
                pageStack = selfStorage.pageStack.map((item) => Object.assign({init: false}, item))
                this.$nextTick(() => this.p_clickTabTitle(selfStorage.index))
            }

            let url = window.location.href
            url = url.substring(0, url.indexOf("?"))
            return {
                pageStack,
                selfStorage,
                currentValue: null,
                url,
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
             * @param   refresh     如果页面已经打开，是否刷新页面
             * @param   iframe      页签是否显示的是一个外部网页地址
             */
            async open({id, title, path, param, security, data, iframe}, refresh = false) {

                /*预处理*/
                const openData = {id, title, path, param, security, data, iframe}
                if (!openData.id) openData.id = this.idGenerator(openData)
                !!this.beforeOpenTab && (await this.beforeOpenTab(openData))
                id = openData.id
                title = openData.title
                path = openData.path
                param = openData.param
                security = openData.security
                data = openData.data
                iframe = openData.iframe

                if (!id) return Promise.reject("打开Tab页时，id不能为空！")

                /*打开之前判断标签是否已经打开，已经打开则切换到标签页，判断标签页是否已经初始化，未初始化则加载页面*/
                let {page, pageIndex} = this.p_findPage(id)
                if (page != null) {
                    if (refresh) await this.refresh(id)
                    if (!page.init) {
                        page.component = await this.p_getPageComponent(path, iframe)
                        page.init = true
                    }
                    Object.assign(page, openData)
                    this.currentValue = pageIndex
                }
                else if (!!this.maxTabs && this.pageStack.length === this.maxTabs) {
                    const msg = `最多只能打开${this.maxTabs}个页签！`
                    this.$dialog.show(msg)
                    return Promise.reject(msg)
                }
                else {
                    /*打开新标签页*/
                    const pc = await this.p_getPageComponent(path, iframe)
                    if (!pc) return
                    page = {id, title, path, param, security, data, component: pc, init: true, iframe}
                    this.pageStack.push(page)
                    await this.$plain.nextTick()
                    this.currentValue = this.pageStack.length - 1
                }
                !!this.afterOpenTab && (await this.afterOpenTab(page))
                this.p_save()
                this.$emit('openTab', page)
                this.p_refreshUrl()
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
            async refresh(id) {
                this.p_clearPage(id)
                /*重新初始化页面*/
                const {page} = this.p_findPage(id)
                if (this.pageStack.length === 0 || !page || !page.init) return
                page.init = false
                await this.$plain.nextTick()
                page.init = true
            },
            /**
             * 刷新某个tab的数据
             * @author  韦胜健
             * @date    2019/3/6 11:36
             */
            async update(id, newTabData) {
                const {page} = this.p_findPage(id)
                if (this.pageStack.length === 0 || !page) return
                Object.assign(page, newTabData)
                this.p_save()
                this.refresh(page.id)
            },
            /**
             * 处理标签标题点击事件
             * @author  韦胜健
             * @date    2019/2/26 16:33
             */
            async p_clickTabTitle(index) {
                if (index === this.currentValue) return
                return await this.p_openPage(this.pageStack[index])
            },
            /**
             * 右击菜单
             * @author  韦胜健
             * @date    2019/3/6 17:10
             */
            async p_contextMenu(e, item, index) {
                const ret = await this.$contextMenu.pick({
                    data: this.pageStack.length > 1 ? ['刷新', '关闭', '关闭左侧页签', '关闭右侧页签', '关闭其他页签'] : ['刷新'],
                    el: e.target
                })
                switch (ret) {
                    case '刷新':
                        this.refresh(item.id)
                        break
                    case '关闭':
                        this.close(item.id)
                        break
                    case '关闭左侧页签':
                        this.pageStack.forEach((itemPage, itemIndex) => itemIndex < index && (this.p_clearPage(itemPage.id)))
                        this.pageStack = this.pageStack.splice(index, this.pageStack.length)
                        this.p_openPage(this.pageStack[0])
                        break
                    case '关闭右侧页签':
                        this.pageStack.forEach((itemPage, itemIndex) => itemIndex > index && (this.p_clearPage(itemPage.id)))
                        this.pageStack = this.pageStack.splice(0, index + 1)
                        this.p_openPage(this.pageStack[index])
                        break
                    case '关闭其他页签':
                        this.pageStack.forEach((itemPage, itemIndex) => itemIndex !== index && (this.p_clearPage(itemPage.id)))
                        this.pageStack = this.pageStack.splice(index, 1)
                        this.p_openPage(this.pageStack[0])
                        break
                }
            },
            /**
             * 打开页面
             * @author  韦胜健
             * @date    2019/3/5 18:54
             */
            async p_openPage(page) {
                const {id, title, path, param, security, data, iframe} = page
                return this.open({id, title, path, param, security, data, iframe})
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
                await this.refresh(id)
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
                this.selfStorage.pageStack = this.pageStack.map(({id, title, path, param, security, data, iframe}) => ({id, title, path, param, security, data, iframe}))
                this.p_setStorage(NAVIGATOR_CONSTANT.TAB, this.selfStorage)
            },
            /**
             * 清除该页签的缓存
             * @author  韦胜健
             * @date    2019/3/6 17:47
             */
            p_clearPage(id) {
                const componentStorage = this.p_getStorage(NAVIGATOR_CONSTANT.PAGE)
                componentStorage[id] = null
                this.p_setStorage(NAVIGATOR_CONSTANT.PAGE, componentStorage)
            },
            /**
             * 获取页面组件对象
             * @author  韦胜健
             * @date    2019/3/8 17:53
             */
            async p_getPageComponent(path, iframe) {
                if (iframe) return 'iframe'
                return await this.p_pageRegistry(path)
            },
            /**
             * 自定义注册页面
             * @author  韦胜健
             * @date    2019/3/7 15:18
             */
            async p_pageRegistry(path) {
                try {
                    return await this.$plain.pageRegistry(path)
                } catch (e) {
                    console.info('找不到页面,转错误处理', e)
                    if (!!this.pageRegistryErrorHandler) await this.pageRegistryErrorHandler(path)
                    if (!!this.page404) return await this.$plain.pageRegistry(this.page404)
                    return Promise.reject(e.message)
                }
            },
            /**
             * 刷新地址信息
             * @author  韦胜健
             * @date    2019/3/11 19:22
             */
            async p_refreshUrl() {
                await this.$plain.$utils.delay(100)
                let tabStorage = this.p_getStorage(NAVIGATOR_CONSTANT.TAB)
                let pageStorage = this.p_getStorage(NAVIGATOR_CONSTANT.PAGE)
                const curTab = tabStorage.pageStack[this.currentValue]
                const curPageStack = (pageStorage[curTab.id] || {}).pageStack || []
                const curPage = curPageStack[curPageStack.length - 1] || {path: 'none'}
                window.history.pushState({}, null, this.url + `?menu=${curTab.path},page=${curPage.path}`)
            },
            /**
             * 获取缓存
             * @author  韦胜健
             * @date    2019/3/11 19:23
             */
            p_getStorage(key) {
                let componentStorage = this.$plain.$storage.get(key) || {}
                return (!!this.storageKey ? componentStorage[this.storageKey] : componentStorage) || {}
            },
            /**
             * 设置缓存
             * @author  韦胜健
             * @date    2019/3/11 19:24
             */
            p_setStorage(key, value) {
                let componentStorage = this.$plain.$storage.get(key) || {}
                if (!!this.storageKey) {
                    componentStorage[this.storageKey] = value
                } else {
                    componentStorage = value
                }
                this.$plain.$storage.set(key, componentStorage)
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
    $navigator-main-tab-head-radios: 6px;

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
            .pl-navigator-main-tab-header-wrapper {
                width: 100%;
                display: flex;
                justify-content: space-between;
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
                        position: relative;
                        width: 150px;
                        &.pl-navigator-main-tab-header-item-empty {
                            cursor: default;
                            width: 10px;
                        }
                        .pl-navigator-main-tab-header-item-wrapper {
                            height: 100%;
                            display: flex;
                            align-items: center;
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
                                transform: scale(0.8);
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
                            &::before {
                                border-left: none !important;
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
                            &::before {
                                border-left: none !important;
                            }
                        }
                        .pl-navigator-main-tab-header-item-inner {
                            width: 100%;
                            padding: 0 20px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            white-space: nowrap;
                            position: relative;
                            box-sizing: border-box;
                        }
                        &::before {
                            content: '';
                            position: absolute;
                            top: 8px;
                            bottom: 8px;
                            left: 0;
                            right: 0;
                            border-left: solid 1px #ddd;
                        }
                    }
                }
                .pl-navigator-main-tab-header-slot {
                    width: 300px;
                    text-align: right;
                    flex-shrink: 0;
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