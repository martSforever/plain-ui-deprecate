<template>
    <div class="pl-navigator-tab" :style="{height:$plain.$utils.unit(height)}">
        <pl-tab-header clear-icon
                       :data="pageStack.map(page=>page.title)"
                       :ids="pageStack.map(page=>page.id)"
                       :value="currentValue"
                       @input="p_clickMenu"
                       @close="p_close"
                       @contextmenu="p_close"
                       ref="header"/>
        <div class="pl-navigator-tab-content">
            <component v-for="(page,index) in pageStack"
                       class="pl-navigator-tab-item"
                       :key="page.id"
                       :param="page.param || {}"
                       :is="page.component"
                       v-if="page.init"
                       v-show="currentValue === index"/>
            <div class="pl-navigator-tab-content-empty" :class="{'pl-navigator-tab-content-empty-hide':!!pageStack && pageStack.length>0}">
                <pl-icon icon="pl-nothing"/>
                <span>空空如也</span>
            </div>
        </div>
    </div>
</template>

<script>
    import PlTabHeader from "../tab/pl-tab-header";
    import PlIcon from "../icon/pl-icon";

    const STORAGE_KEY = 'navigator-tab';

    export default {
        name: "pl-navigator-tab",
        components: {PlIcon, PlTabHeader},
        props: {
            value: {type: Number},                                              //当前显示的页面索引
            initPages: {type: Array, default: () => []},                         //初始化就要显示的页面
            multiple: {type: Boolean},                                          //同一个页面是否只能同时存在一个
            id: {type: String,},                                                //页签id，用来存储当前页签页面页面栈数据的key
            height: {type: Number | String, default: '100%'},                   //高度
        },
        watch: {
            value(val) {
                if (this.currentValue !== val && val >= 0 && val < this.pageStack.length) {
                    this.p_clickMenu(val)
                }
            },
            currentValue(val) {
                this.$emit('input', val)
            },
        },
        data() {
            let pageStack = []
            let currentValue = this.value;
            let tabsStorage, selfStorage;

            let hasStorage = false;

            if (!!this.id) {
                tabsStorage = this.$plain.$storage.get(STORAGE_KEY) || {}
                selfStorage = tabsStorage[this.id] || {}
                if (selfStorage.index != null && !!selfStorage.pageStack && selfStorage.pageStack.length > 0) {
                    hasStorage = true
                    pageStack = selfStorage.pageStack.map((item) => Object.assign({init: false, id: this.$plain.$utils.uuid()}, item))
                    this.$nextTick(() => this.p_clickMenu(selfStorage.index))
                }
            }

            if (!hasStorage && !!this.initPages && this.initPages.length > 0) {
                for (let i = 0; i < this.initPages.length; i++) pageStack.push(Object.assign({init: false, id: this.$plain.$utils.uuid()}, this.initPages[i]))
                this.$nextTick(() => this.p_clickMenu(0))
            }

            return {
                pageStack,
                currentValue,
                tabsStorage,
                selfStorage,
            }
        },
        methods: {
            async getRegisterPageByPath(path) {
                const component = await this.$plain.pageRegistry(path)
                return {component, path}
            },
            p_close({index}) {
                let nextIndex = this.currentValue
                if (index <= this.currentValue) nextIndex--;
                this.pageStack.splice(index, 1)
                if (nextIndex < 0 && this.pageStack.length > 0) nextIndex = 0
                this.p_clickMenu(nextIndex)
            },
            async p_clickMenu(index) {
                this.currentValue = index
                const page = this.pageStack[index]
                if (!page) return
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
                this.$plain.$storage.set(STORAGE_KEY, this.tabsStorage)
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
                this.p_save()
            },
        }
    }
</script>

<style lang="scss">
    .pl-navigator-tab {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 12px;
        .pl-navigator-tab-content {
            flex: 1;
            width: 100%;
            position: relative;
            border: solid 1px var(--p-tab-color);
            box-sizing: border-box;
            overflow: hidden;
            border-top: none;
            .pl-navigator-tab-item {
                height: 100%;
                overflow: auto;
            }
            .pl-navigator-tab-content-empty {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                @include transition-all;
                .pl-icon {
                    font-size: 50px;
                    margin-bottom: 12px;
                }
                span {
                    font-size: 12px;
                }
                &.pl-navigator-tab-content-empty-hide {
                    opacity: 0;
                    z-index: -1;
                }
            }
        }
    }
</style>