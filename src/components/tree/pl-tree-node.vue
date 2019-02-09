<template>
    <div class="pl-tree-node" :class="classes">
        <div class="pl-tree-node-content" @click="toggle">
            <pl-icon icon="pl-triangle-right-fill" class="pl-tree-node-icon"/>
            <span>{{data[labelKey]}}</span>
        </div>
        <pl-collapse-transition>
            <div v-show="p_open">
                <div class="pl-tree-node-wrapper">
                    <pl-tree-node v-for="(item,index) in data[childrenKey]"
                                  :key="index"
                                  :data="item"
                                  :label-key="labelKey"
                                  :children-key="childrenKey"/>
                </div>
            </div>
        </pl-collapse-transition>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";
    import PlCollapseTransition from "../collapse/pl-collapse-transition";

    export default {
        name: "pl-tree-node",
        components: {PlCollapseTransition, PlIcon},
        props: {
            data: {type: Object, default: () => []},
            labelKey: {type: String, required: true},
            childrenKey: {type: String, required: true},
        },
        data() {
            return {
                p_open: false,
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
            toggle() {
                this.p_open = !this.p_open
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
            line-height: 28px;
            &:hover {
                color: $color-primary;
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