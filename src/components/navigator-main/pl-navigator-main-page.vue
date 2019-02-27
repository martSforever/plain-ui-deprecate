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
                    :param="page.param || {}"
                    v-if="page.init"/>
        </div>
    </div>
</template>

<script>

    const STORAGE_KEY = 'navigator-page';

    export default {
        name: "pl-navigator-main-page",
        components: {},
        props: {
            tab: {},
        },
        data() {
            let pageStack = []
            const componentStorage = this.$plain.$storage.get(STORAGE_KEY) || {}
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
        methods: {
            async push(path, param) {
                const component = await this.$plain.pageRegistry(path)
                this.pageStack.push({
                    id: this.$plain.$utils.uuid(),
                    path,
                    param,
                    component,
                    init: true,
                })
                await this.p_save()
                this.$emit('push', {path, param})
            },

            async redirect(path, param) {
                const component = await this.$plain.pageRegistry(path)
                this.pageStack.push({
                    id: this.$plain.$utils.uuid(),
                    path,
                    param,
                    component,
                    init: true,
                })
                await this.$plain.nextTick()
                this.pageStack.splice(this.pageStack.length - 2, 1)
                this.p_save()
                this.$emit('push', {path, param})
                this.$emit('redirect', {path, param})
            },

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

            async p_save() {
                this.selfStorage.pageStack = this.pageStack.map(({path, param, id}) => ({path, param, id}))
                this.componentStorage[this.tab.id] = this.selfStorage
                this.$plain.$storage.set(STORAGE_KEY, this.componentStorage)
            },

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
            }
        }
    }
</style>