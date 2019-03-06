<template>
    <div class="pl-navigator-main-page">
        <div class="pl-navigator-main-page-wrapper">
            <!--<component :is="tab.component" class="pl-navigator-main-page-item" key="root"/>-->
            <component
                    class="pl-navigator-main-page-item"
                    v-for="(page) in pageStack"
                    :key="page.id"
                    :path="page.path"
                    :is="page.component"

                    :pageTabData="tabData"
                    :pageSecurity="page.security || tab.security"
                    :pageParam="page.param || {}"

                    v-if="page.init"/>
        </div>
    </div>
</template>

<script>

    import {NAVIGATOR_CONSTANT} from "./index";

    export default {
        name: "pl-navigator-main-page",
        components: {},
        props: {
            id: {},                                                             //tab的id
            tab: {},                                                            //tab数据信息
            beforePush: {type: Function},                                       //打开页面之前的钩子函数
            afterPush: {type: Function},                                        //打开页面之后的钩子函数
        },
        data() {
            let pageStack = []
            const componentStorage = this.$plain.$storage.get(NAVIGATOR_CONSTANT.PAGE) || {}
            const selfStorage = componentStorage[this.tab.id] || {}
            if (!!selfStorage.pageStack && selfStorage.pageStack.length > 0) {
                pageStack = selfStorage.pageStack.map((item, index) => Object.assign({
                    id: this.$plain.$utils.uuid(),
                    component: null,
                    init: index >= selfStorage.pageStack.length - 2
                }, item))
                this.$nextTick(() => this.p_initComponent())
            } else {
                this.$nextTick(() => this.push(this.tab.path, this.tab.param))
            }

            return {
                pageStack,
                componentStorage,
                selfStorage,
            }
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
             */
            async push(path, param, security) {
                const component = await this.$plain.pageRegistry(path)
                const page = {id: this.$plain.$utils.uuid(), path, param, component, init: true, security}
                this.pageStack.length !== 0 && !!this.beforePush && (await this.beforePush(page, this.tab))
                this.pageStack.push(page)
                this.pageStack.length !== 1 && !!this.afterPush && (await this.afterPush(page, this.tab))
                await this.p_save()
                this.$emit('push', {path, param})
            },
            /**
             * 回退页面
             * @author  韦胜健
             * @date    2019/3/6 11:41
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
                        page.component = await this.$plain.pageRegistry(page.path)
                        page.init = true
                    }
                })
                await this.$plain.nextTick()

                /*弹出页面*/
                const {path, param} = this.pageStack.pop()

                /*保存*/
                await this.p_save()
                this.$emit('back', {path, param})
                return {path, param}
            },
            /**
             * 重定向到页面
             * @author  韦胜健
             * @date    2019/3/6 11:41
             */
            async redirect(path, param, security) {
                const component = await this.$plain.pageRegistry(path)
                this.pageStack.push({
                    id: this.$plain.$utils.uuid(),
                    path,
                    param,
                    component,
                    init: true,
                    security,
                })
                await this.$plain.nextTick()
                this.pageStack.splice(this.pageStack.length - 2, 1)
                this.p_save()
                this.$emit('push', {path, param})
                this.$emit('redirect', {path, param})
            },
            /**
             * 回退所有页面
             * @author  韦胜健
             * @date    2019/3/6 11:41
             */
            async backoff() {
                const page = this.pageStack[0]
                if (!page.init) {
                    page.component = await this.$plain.pageRegistry(page.path)
                    page.init = true
                }
                await this.$plain.nextTick()
                this.pageStack.splice(1, this.pageStack.length)
                await this.p_save()
                this.$emit('backAll')
            },
            /**
             * 保存当前页面信息
             * @author  韦胜健
             * @date    2019/3/6 11:42
             */
            async p_save() {
                this.selfStorage.pageStack = this.pageStack.map(({id, path, param, security}) => ({id, path, param, security}))
                this.componentStorage[this.tab.id] = this.selfStorage
                this.$plain.$storage.set(NAVIGATOR_CONSTANT.PAGE, this.componentStorage)
            },
            /**
             * 初始化需要显示的页面的信息
             * @author  韦胜健
             * @date    2019/3/6 11:42
             */
            async p_initComponent() {
                for (let i = this.pageStack.length - 1; i >= 0; i--) {
                    const page = this.pageStack[i];
                    if (!!page.init && !page.component) page.component = await this.$plain.pageRegistry(page.path)
                }
            },
        }
    }
</script>

<style lang="scss">
    .pl-navigator-main-page {
        @include public-style;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: auto;
        .pl-navigator-main-page-wrapper {
            height: 100%;
            width: 100%;
            position: relative;
            .pl-navigator-main-page-item {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: auto;
                box-sizing: border-box;
                background-color: white;
                padding: 16px;
                box-sizing: border-box;
            }
        }
    }
</style>