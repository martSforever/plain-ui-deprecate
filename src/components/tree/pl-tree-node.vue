<template>
    <div class="pl-tree-node" :class="classes">
        <div class="pl-tree-node-content">
            <pl-icon icon="pl-triangle-right-fill" class="pl-tree-node-icon" @click.stop="toggle"/>
            <pl-check-all :label="null" size="small" :status="checkStatus" @click="p_clickCheck" v-if="checkbox"/>
            <div @click="!!toggleOnClickContent && toggle()">
                {{data[labelKey]}}
            </div>
        </div>
        <pl-collapse-transition v-if="p_initialized">
            <div v-show="p_open">
                <div class="pl-tree-node-wrapper" v-if="!!data[childrenKey] && data[childrenKey].length>0">
                    <pl-tree-node v-for="(item,index) in data[childrenKey]"
                                  ref="nodes"
                                  :key="index"
                                  :data="item"
                                  :label-key="labelKey"
                                  :children-key="childrenKey"
                                  :check-key="checkKey"
                                  :auto-close="autoClose"
                                  :empty-text="emptyText"
                                  :toggle-on-click-content="toggleOnClickContent"
                                  :initialized-after-open="initializedAfterOpen"
                                  :checkbox="checkbox"
                                  @open="val=>$emit('open', val)"
                                  @close="val=>$emit('close',val)"
                                  @click="val=>$emit('click',val)"
                                  @childToggle="p_childToggle"/>
                </div>
                <div v-else>
                    <div class="pl-tree-node-content pl-tree-node-empty-text">
                        {{emptyText}}
                    </div>
                </div>
            </div>
        </pl-collapse-transition>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";
    import PlCollapseTransition from "../collapse/pl-collapse-transition";
    import {TreeMixin} from "./index";
    import PlCheckAll from "../radio/pl-check-all";

    export default {
        name: "pl-tree-node",
        components: {PlCheckAll, PlCollapseTransition, PlIcon},
        mixins: [TreeMixin],
        props: {
            data: {type: Object, default: () => ({})},
        },
        data() {
            return {
                p_open: false,
                p_initialized: !this.initializedAfterOpen,
                p_parentNode: null,
                p_items: [],
            }
        },
        mounted() {
            if (this.$parent.$parent.$options.name === 'pl-tree-node') {
                this.p_parentNode = this.$parent.$parent
                this.p_parentNode.p_addItem(this)
            }

            if (this.checkbox && !this.checkKey) {
                this.$dialog.show("Tree组件在使用checkbox功能时，必须指定checkKey")
            }
        },
        beforeDestroy() {
            if (!!this.p_parentNode) {
                this.p_parentNode.p_removeItem(this)
            }
        },
        computed: {
            classes() {
                return [
                    {
                        'pl-tree-node-open': this.p_open,
                    }
                ]
            },
            hasChild() {
                return this.p_dataHasChildren(this.data)
            },
            childrenData() {
                return !!this.data && this.childrenKey && !!this.data[this.childrenKey] ? this.data[this.childrenKey] : []
            },
            checkStatus() {
                if (this.hasChild) {
                    if (this.childrenData.every(data => data[this.checkKey])) this.p_setDataCheck(this.data, true)
                    if (this.childrenData.some(data => data[this.checkKey])) this.p_setDataCheck(this.data, true)
                    this.p_setDataCheck(this.data, false)
                }
                return this.p_getStatusFromData(this.data)
            },

        },
        methods: {
            /*
             *  打开节点
             *  @author     martsforever
             *  @datetime   2019/2/13 23:20
             */
            open() {
                if (!!this.p_open) return
                const next = () => {
                    this.p_open = true
                    this.$emit('open', this.data)
                    if (!!this.p_parentNode && !this.p_parentNode.p_open) this.p_parentNode.open()
                }
                if (!!this.p_initialized) next()
                else {
                    this.p_initialized = true
                    this.$nextTick(next)
                }
            },
            /*
             *  关闭节点
             *  @author     martsforever
             *  @datetime   2019/2/13 23:20
             */
            close() {
                this.p_open = false
                this.$emit('close', this.data)
            },
            /*
             *  打开关闭节点
             *  @author     martsforever
             *  @datetime   2019/2/13 23:20
             */
            toggle() {
                this[!this.p_open ? 'open' : 'close']()
                this.$emit('click', this.data)
                this.$emit('childToggle', this)
            },
            check() {
                this.p_changeChildrenDataCheck(this.data, true)
            },
            unCheck() {
                this.p_changeChildrenDataCheck(this.data, false)
            },
            toggleCheck() {
                switch (this.checkStatus) {
                    case 'all':
                        this.unCheck()
                        break
                    case 'some':
                        this.unCheck();
                        break
                    case 'none':
                        this.check()
                        break
                }
            },
            /*
             *  处理子节点打开关闭事件
             *  @author     martsforever
             *  @datetime   2019/2/13 23:21
             */
            p_childToggle(child) {
                if (!this.autoClose) return
                if (child.p_open) {
                    this.$refs.nodes.forEach(item => {
                        if (item === child) return
                        if (item.p_open) item.close()
                    })
                }
            },
            /*
             *  添加子节点组件对象
             *  @author     martsforever
             *  @datetime   2019/2/13 23:10
             */
            p_addItem(item) {
                this.p_items.push(item)
            },
            /*
             *  移除子节点对象
             *  @author     martsforever
             *  @datetime   2019/2/13 23:10
             */
            p_removeItem(item) {
                this.$plain.$utils.removeFromArray(this.p_items, item)
            },
            /*
             *  点击复选框
             *  @author     martsforever
             *  @datetime   2019/2/14 21:12
             */
            p_clickCheck() {
                this.toggleCheck()
            },
            /*
             *  设置data中的checkKey选中状态
             *  @author     martsforever
             *  @datetime   2019/2/14 21:31
             */
            p_setDataCheck(data, check = false) {
                !!data && this.checkKey && this.$set(data, this.checkKey, check)
            },
            /*
             *  data是否有子节点数据
             *  @author     martsforever
             *  @datetime   2019/2/14 21:39
             */
            p_dataHasChildren(data) {
                return !!data && this.childrenKey && !!data[this.childrenKey] && data[this.childrenKey].length > 0
            },
            /*
             *  递归修改节点及其子节点的check状态
             *  @author     martsforever
             *  @datetime   2019/2/14 21:43
             */
            p_changeChildrenDataCheck(data, check = false) {
                this.p_setDataCheck(data, check)
                if (this.p_dataHasChildren(data)) data[this.childrenKey].forEach(itemData => this.p_changeChildrenDataCheck(itemData, check))
            },
            /*
             *  根据data的checkKey及其子checkKey判断data节点当前checkbox的显示状态
             *  @author     martsforever
             *  @datetime   2019/2/14 21:54
             */
            p_getStatusFromData(data) {
                /*没有子节点*/
                if (!this.p_dataHasChildren(data)) return data[this.checkKey] ? 'all' : 'none'
                /*有子节点*/
                if (data[this.childrenKey].every(itemData => this.p_getStatusFromData(itemData) === 'all')) return 'all'
                if (data[this.childrenKey].some(itemData => this.p_getStatusFromData(itemData) !== 'none')) return 'some'
                return 'none'
            },
        },
    }
</script>

<style lang="scss">
    .pl-tree-node {
        @include public-style;
        user-select: none;
        .pl-tree-node-icon {
            @include transition-all-cubic-bezier;
            transform: scale(0.7);
        }
        .pl-tree-node-content {
            height: 28px;
            display: flex;
            align-items: center;
            &:hover {
                color: $color-primary;
            }
            &.pl-tree-node-empty-text {
                padding-left: 1em;
            }
            .pl-check-all {
                margin-right: 0.5em;
            }
        }
        .pl-tree-node-wrapper {
            width: 100%;
            padding: 0 18px;
        }
        &.pl-tree-node-open {
            & > .pl-tree-node-content {
                color: $color-primary;
            }
            & > .pl-tree-node-content > .pl-tree-node-icon {
                transform: scale(0.7) rotate(90deg);
            }
        }
    }
</style>