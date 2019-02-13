<template>
    <div class="pl-tree-node" :class="classes">
        <div class="pl-tree-node-content">
            <pl-icon icon="pl-triangle-right-fill" class="pl-tree-node-icon" @click.stop="toggle"/>
            <pl-check-all :label="null" size="small"/>
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
                                  :auto-close="autoClose"
                                  :empty-text="emptyText"
                                  :toggle-on-click-content="toggleOnClickContent"
                                  :initialized-after-open="initializedAfterOpen"
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
            }
        },
        mounted() {
            if (this.$parent.$parent.$options.name === 'pl-tree-node') {
                this.p_parentNode = this.$parent.$parent
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
        },
        methods: {
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
            close() {
                this.p_open = false
                this.$emit('close', this.data)
            },
            toggle() {
                this[!this.p_open ? 'open' : 'close']()
                this.$emit('click', this.data)
                this.$emit('childToggle', this)
            },
            p_childToggle(child) {
                if (!this.autoClose) return
                if (child.p_open) {
                    this.$refs.nodes.forEach(item => {
                        if (item === child) return
                        if (item.p_open) item.close()
                    })
                }
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