<template>
    <div class="pl-navigator-main-tab">
        <div class="pl-navigator-main-tab-wrapper">
            <pl-navigator-main-page
                    v-for="(page) in pageStack"
                    :key="page.id"
                    :page="page"
                    :tab="tab"
                    v-if="page.init"/>
        </div>
    </div>
</template>

<script>

    import {NAVIGATOR_CONSTANT} from "./index";
    import PlNavigatorMainPage from "./pl-navigator-main-page";

    export default {
        name: "pl-navigator-main-tab",
        components: {PlNavigatorMainPage},
        props: {
            id: {},                                                             //tab的id
            tab: {},                                                            //tab数据信息
            beforePush: {type: Function},                                       //打开页面之前的钩子函数
            afterPush: {type: Function},                                        //打开页面之后的钩子函数
            getPageComponent: {type: Function},                                 //注册页面
            getStorage: {},                                                     //通过tab获取缓存
            setStorage: {},                                                     //通过tab设置缓存
        },
        data() {
            let pageStack = []
            const componentStorage = this.getStorage(NAVIGATOR_CONSTANT.PAGE)
            const selfStorage = componentStorage[this.tab.id] || {}
            if (!!selfStorage.pageStack && selfStorage.pageStack.length > 0) {
                pageStack = selfStorage.pageStack.map((item, index) => Object.assign({
                    id: this.$plain.$utils.uuid(),
                    component: null,
                    init: index >= selfStorage.pageStack.length - 2
                }, item))
                this.$nextTick(() => this.p_initComponent())
            } else {
                this.$nextTick(() => this.push(this.tab.path, this.tab.param, null, this.tab.iframe))
            }

            return {
                pageStack,
                componentStorage,
                selfStorage,

                main: null,
                listenEvents: [],
                listener: new this.$plain.Vue({}).$mount()
            }
        },
        created() {
            this.main = this.$plain.$dom.findComponentUpward(this, 'pl-navigator-main')
        },
        computed: {
            tabData() {
                return Object.assign({}, this.tab, {component: null})
            },
        },
        methods: {
            /**
             * 打开页面
             * @author  韦胜健
             * @date    2019/3/6 11:41
             * @param   path            打开的页面的路径
             * @param   param           打开页面传递的参数
             * @param   security        打开页面时给的安全性，如果为null或者undefined，则会传入tab的安全性，想要设置该页面没有安全性，则设置空对象{}
             * @param   iframe          打开的页面是否为一个外部地址，使用iframe窗口打开
             */
            async push(path, param, security, iframe = false) {
                const pageData = {path, param, security, iframe}
                this.pageStack.length !== 0 && !!this.beforePush && (await this.beforePush(pageData, this.tab))
                path = pageData.path
                param = pageData.param
                security = pageData.security
                iframe = pageData.iframe

                const component = await this.getPageComponent(path, iframe)
                const page = {id: this.$plain.$utils.uuid(), path, param, component, init: true, security, iframe}

                this.pageStack.push(page)
                this.pageStack.length !== 1 && !!this.afterPush && (await this.afterPush(page, this.tab))
                await this.p_save()
                this.$emit('push', {path, param})
                this.$emit('refreshUrl')
            },
            /**
             * 回退页面
             * @author  韦胜健
             * @date    2019/3/6 11:41
             * @param   num             回退的页面的个数，默认回退一个页面
             */
            async back(num = 1) {
                if (this.pageStack.length === 1) {
                    console.info("is last page!!!")
                    return
                }
                /*页面退回，将最后一页之前需要删除的页移除*/
                while (num - 1 > 0) {
                    this.pageStack.length > 2 && this.pageStack.splice(this.pageStack.length - 2, 1)
                    num--
                }
                /*初始化需要初始化的页面*/
                this.pageStack.forEach(async (page, index) => {
                    if (!page.init && index >= (this.pageStack.length - 2 - num)) {
                        page.component = await this.getPageComponent(page.path, page.iframe)
                        page.init = true
                    }
                })
                await this.$plain.nextTick()

                /*弹出页面*/
                const popPge = this.pageStack.pop()

                /*保存*/
                await this.p_save()
                this.$emit('back', popPge)
                this.$emit('refreshUrl')
                return popPge
            },
            /**
             * 重定向到页面
             * @author  韦胜健
             * @date    2019/3/6 11:41
             * @param   path            同push的path参数
             * @param   param           同push的param参数
             * @param   security        同push的security参数
             * @param   iframe          同push的iframe参数
             */
            async redirect(path, param, security, iframe) {
                const component = await this.getPageComponent(path, iframe)
                this.pageStack.push({
                    id: this.$plain.$utils.uuid(),
                    path,
                    param,
                    component,
                    init: true,
                    security,
                    iframe,
                })
                await this.$plain.nextTick()
                this.pageStack.splice(this.pageStack.length - 2, 1)
                this.p_save()
                this.$emit('push', {path, param})
                this.$emit('redirect', {path, param})
                this.$emit('refreshUrl')
            },
            /**
             * 回退所有页面
             * @author  韦胜健
             * @date    2019/3/6 11:41
             */
            async backoff() {
                const page = this.pageStack[0]
                if (!page.init) {
                    page.component = await this.getPageComponent(page.path, page.iframe)
                    page.init = true
                }
                await this.$plain.nextTick()
                this.pageStack.splice(1, this.pageStack.length)
                await this.p_save()
                this.$emit('backAll')
                this.$emit('refreshUrl')
            },
            /**
             * 保存当前页面信息
             * @author  韦胜健
             * @date    2019/3/6 11:42
             */
            async p_save() {
                this.selfStorage.pageStack = this.pageStack.map(({id, path, param, security, iframe}) => ({id, path, param, security, iframe}))
                this.componentStorage[this.tab.id] = this.selfStorage
                this.setStorage(NAVIGATOR_CONSTANT.PAGE, this.componentStorage)
            },
            /**
             * 初始化需要显示的页面的信息
             * @author  韦胜健
             * @date    2019/3/6 11:42
             */
            async p_initComponent() {
                for (let i = this.pageStack.length - 1; i >= 0; i--) {
                    const page = this.pageStack[i];
                    if (!!page.init && !page.component) page.component = await this.getPageComponent(page.path, page.iframe)
                }
            },

            /*---------------------------------------导航事件-------------------------------------------*/

            /**
             * 监听事件
             * @author  韦胜健
             * @date    2019/3/19 18:50
             */
            on(event, callback) {
                this.listener.$on(event, callback)
            },

            /**
             * 只监听一次事件
             * @author  韦胜健
             * @date    2019/3/19 18:51
             */
            once(event, callback) {
                this.listener.$once(event, callback)
            },

            /**
             * 移除事件
             * @author  韦胜健
             * @date    2019/3/19 18:51
             */
            off(event, callback) {
                this.listener.$off(event, callback)
            },

            /**
             * 派发事件
             * @author  韦胜健
             * @date    2019/3/19 18:51
             */
            emit(event, param, global) {
                global ? this.main.emit(event, param) : this.listener.$emit(event, param)
            },
        },
        beforeDestroy() {
            /*页面销毁*/
            this.listenEvents.forEach(({event, callback, global}) => this.main.off(global ? event : `${this.id}-${event}`, callback))
        },
    }
</script>

<style lang="scss">
    .pl-navigator-main-tab {
        @include public-style;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: auto;
        .pl-navigator-main-tab-wrapper {
            height: 100%;
            width: 100%;
            position: relative;
            background-color: white;
            .pl-navigator-main-page {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: auto;
                box-sizing: border-box;
                background-color: white;
                padding: 16px;
                z-index: 1;
            }
            iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
        }
    }
</style>