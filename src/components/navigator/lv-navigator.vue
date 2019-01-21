<template>
    <div class="lv-navigator">
        <lv-navigator-header :menus="pageStack" :value="currentValue" @input="_clickMenu" @clickClose="_close" ref="header"/>
        <div class="lv-navigator-content">
            <transition-group :name="transition" mode="in-out">
                <component v-for="(page,index) in pageStack"
                           class="lv-navigator-page"
                           :key="page.id"
                           :param="page.param"
                           :is="page.component"
                           v-if="page.init"
                           v-show="currentValue === index"/>
            </transition-group>

            <div class="lv-navigator-content-empty" :class="{'lv-navigator-content-empty-hide':!!pageStack && pageStack.length>0}">
                <link-icon icon="lv-nothing"/>
                <span>空空如也</span>
            </div>
        </div>
    </div>
</template>

<script>

    import LvNavigatorHeader from "./lv-navigator-header";

    const TABS_STORAGE_KEY = 'tabs-storage-key';

    export default {
        name: "lv-navigator",
        components: {LvNavigatorHeader},
        props: {
            register: {type: Array, default: () => []},                     //注册的页面
            init: {type: Array, default: () => []},                         //初始化就要显示的页面
            value: {type: Number},                                          //当前显示的页面索引
            multiple: {type: Boolean},                                      //同一个页面是否只能同时存在一个
            id: {type: String,},                                            //页签id，用来存储当前页签页面页面栈数据的key
            transition: {type: String, default: 'lv-navigator-default-animate'},
        },
        watch: {
            value(val) {
                val !== this.currentValue && (this.currentValue = val)
                this.refresh()
            },
            currentValue(val) {
                this.$emit('input', val)
            },
        },
        data() {
            let pageStack = [];
            let currentValue = this.value;
            let tabsStorage, selfStorage;
            if (!!this.id) {
                tabsStorage = this.$plain.$storage.get(TABS_STORAGE_KEY) || {}
                selfStorage = tabsStorage[this.id] || {}
                if (selfStorage.index != null && !!selfStorage.pageStack && selfStorage.pageStack.length > 0) {
                    selfStorage.index != null && (currentValue = selfStorage.index)
                    !!selfStorage.pageStack && selfStorage.pageStack.length > 0 && (pageStack = selfStorage.pageStack.map((item, index) => {
                        const re = this.getPageByName(item.path)
                        return Object.assign({init: index === selfStorage.index, id: this.$plain.$utils.uuid()}, item, {component: re.component})
                    }))
                }
            }
            else {
                if (!!this.init && this.init.length > 0) {
                    currentValue = 0;
                    pageStack = this.init.map(item => {
                        const re = this.getPageByName(item.path)
                        return Object.assign({init: false, id: this.$plain.$utils.uuid()}, re)
                    })
                    pageStack[0].init = true
                }
            }

            return {
                currentValue,
                pageStack,
                tabsStorage,
                selfStorage,
            }
        },
        methods: {
            _close(index) {
                if (index <= this.currentValue) this.currentValue--;
                this.pageStack.splice(index, 1)
                if (this.currentValue < 0 && this.pageStack.length > 0) this.currentValue = 0
                this.refresh();
            },
            _clickMenu(index) {
                this.currentValue = index
                const page = this.pageStack[index]
                if (!!page && !page.init) page.init = true
                this._save()
            },
            _save() {
                if (!this.id) return
                this.selfStorage.index = this.currentValue;
                this.selfStorage.pageStack = this.pageStack.map(({title, path, icon, param}) => {
                    return {title, path, icon, param}
                })
                this.tabsStorage[this.id] = this.selfStorage
                this.$plain.$storage.set(TABS_STORAGE_KEY, this.tabsStorage)
            },
            getPageByName(path) {
                for (let i = 0; i < this.register.length; i++) {
                    const re = this.register[i];
                    if (re.path === path) return re
                }
                console.log(`${path} is not registered!!`)
                return null
            },
            push(path, param) {
                if (!this.multiple) {
                    for (let i = 0; i < this.pageStack.length; i++) {
                        const page = this.pageStack[i];
                        if (page.path === path) {
                            this.currentValue = i
                            return
                        }
                    }
                }
                const re = this.getPageByName(path)
                if (!re) return
                this.pageStack.push({
                    title: re.title,
                    path: re.path,
                    icon: re.icon,
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
                    this.$refs.header.refresh()
                    this._save()
                })
            },
        }
    }
</script>

<style lang="scss">
    .lv-navigator {
        height: 100%;
        width: 100%;
        @include public-style;
        display: flex;
        flex-direction: column;
        .lv-navigator-content {
            flex: 1;
            position: relative;
            overflow-y: auto;
            .lv-navigator-content-empty {
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
                .lv-icon {
                    font-size: 50px;
                    margin-bottom: 12px;
                }
                span {
                    font-size: 12px;
                }
                &.lv-navigator-content-empty-hide {
                    opacity: 0;
                    z-index: -1;
                }
            }
            span[mode=in-out] {
                &, & .lv-navigator-page {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }

    .lv-navigator-default-animate-enter-active, .lv-navigator-default-animate-leave-active {
        transition: all 0.15s ease
    }

    .lv-navigator-default-animate-enter, .lv-navigator-default-animate-leave-active {
        opacity: 0
    }
</style>