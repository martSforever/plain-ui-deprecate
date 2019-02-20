<template>
    <div class="pl-navigator-tab" :style="{height:$plain.$utils.unit(height)}">
        <pl-tab-header clear-icon
                       :data="pageStack.map(page=>page.title)"
                       :value="currentValue"
                       @input="p_clickMenu"
                       @close="p_close"
                       @contextmenu="p_close"
                       ref="header"/>
        <div class="pl-navigator-tab-content">
            <component v-for="(page,index) in pageStack"
                       class="pl-navigator-page"
                       :key="page.id"
                       :param="page.param"
                       :is="page.component"
                       v-if="page.init"
                       v-show="currentValue === index"/>
        </div>
    </div>
</template>

<script>
    import PlTabHeader from "../tab/pl-tab-header";

    const STORAGE_KEY = 'navigator-tab';

    export default {
        name: "pl-navigator-tab",
        components: {PlTabHeader},
        props: {
            value: {type: Number},                                              //当前显示的页面索引
            initPages: {type: Array, default: () => []},                         //初始化就要显示的页面
            multiple: {type: Boolean},                                          //同一个页面是否只能同时存在一个
            id: {type: String,},                                                //页签id，用来存储当前页签页面页面栈数据的key
            height: {type: Number | String, default: '100%'},                   //高度
        },
        data() {
            let pageStack = []
            let currentValue = this.value;
            let tabsStorage, selfStorage;

            if (!!this.id) {
                tabsStorage = this.$plain.$storage.get(STORAGE_KEY) || {}
                selfStorage = tabsStorage[this.id] || {}
                if (selfStorage.index != null && !!selfStorage.pageStack && selfStorage.pageStack.length > 0) {
                    currentValue = selfStorage.index
                    pageStack = selfStorage.pageStack.map((item, index) => {
                        const page = this.getRegisterPageByPath(item.path)
                        return Object.assign({init: index === selfStorage.index, id: this.$plain.$utils.uuid()}, item, {component: page.component})
                    })
                }
            }
            else {
                if (!!this.initPages && this.initPages.length > 0) {
                    for (let i = 0; i < this.initPages.length; i++) pageStack.push(Object.assign({init: false, id: this.$plain.$utils.uuid()}, this.initPages[i]))
                    this.$nextTick(() => this.p_clickMenu(0))
                }
            }
            return {
                pageStack,
                currentValue,
            }
        },
        methods: {
            async getRegisterPageByPath(path) {
                if (!this.$plain.pageRegistry) {
                    console.error('plain ui need pageRegistry function when installed.')
                    return
                }
                const component = await this.$plain.pageRegistry(path)
                return {component, path}
            },
            p_close({index}) {
                if (index <= this.currentValue) this.currentValue--;
                this.pageStack.splice(index, 1)
                if (this.currentValue < 0 && this.pageStack.length > 0) this.currentValue = 0
                this.refresh();
            },
            async p_clickMenu(index) {
                this.currentValue = index
                const page = this.pageStack[index]
                if (!page.component) page.component = (await this.getRegisterPageByPath(page.path)).component
                if (!!page && !page.init) page.init = true
                this.p_save()
            },
            p_save() {
                if (!this.id) return
                this.selfStorage.index = this.currentValue;
                this.selfStorage.pageStack = this.pageStack.map(({title, path, param}) => {
                    return {title, path, param}
                })
                this.tabsStorage[this.id] = this.selfStorage
                this.$plain.$storage.set(TABS_STORAGE_KEY, this.tabsStorage)
            },
            async push(path, title, param) {
                if (!this.multiple) {
                    for (let i = 0; i < this.pageStack.length; i++) {
                        const page = this.pageStack[i];
                        if (page.path === path) {
                            this.currentValue = i
                            return
                        }
                    }
                }
                const re = await this.getRegisterPageByPath(path)
                if (!re) return
                this.pageStack.push({
                    title: title,
                    path: re.path,
                    component: re.component,
                    param,
                    init: true,
                    id: this.$plain.$utils.uuid()
                })
                this.currentValue = this.pageStack.length - 1
                this.refresh();
            },
            refresh() {
                this.$nextTick(() => {
                    const target = this.pageStack[this.currentValue]
                    !!target && !target.init && (target.init = true)
                    // this.$refs.header.refresh()
                    this.p_save()
                })
            },
        }
    }
</script>

<style lang="scss">
    .pl-navigator-tab {
        display: flex;
        flex-direction: column;
        .pl-navigator-tab-content {
            flex: 1;
            width: 100%;
            overflow: auto;
        }
    }
</style>