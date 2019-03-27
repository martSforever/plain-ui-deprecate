<template>
    <pl-list class="pl-tab-header" direction="top">
        <pl-item v-if="!data || data.length === 0" key="empty">
            <div class="pl-tab-header-item pl-tab-header-item-active">
                <span>无</span>
            </div>
        </pl-item>
        <pl-item v-for="(item,index) in data"
                 :key="!!ids&&ids[index]?ids[index]:item">
            <div class="pl-tab-header-item"
                 :class="{'pl-tab-header-item-active':index === currentValue}"
                 @click="p_click(item,index)"
                 @contextmenu.prevent.stop="p_contextmenu(item,index)">
                <div class="pl-tab-header-item-text"><pl-tooltip-text :content="item" show-overflow-tooltip/></div>
                <div class="pl-tab-header-item-close" @click.stop="p_close(item,index)" v-if="clearIcon">
                    <pl-icon icon="pl-close" hover/>
                </div>
            </div>
        </pl-item>
    </pl-list>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";
    import PlIcon from "../icon/pl-icon";
    import PlList from "../list/pl-list";
    import PlItem from "../list/pl-item";
    import PlTooltipText from "../tooltip/pl-tooltip-text";

    export default {
        name: "pl-tab-header",
        components: {PlTooltipText, PlItem, PlList, PlIcon},
        mixins: [ValueMixin],
        props: {
            value: {type: Number, default: 0},
            data: {type: Array, default: () => []},
            ids: {type: Array, default: () => []},
            clearIcon: {type: Boolean,},
        },
        methods: {
            p_click(item, index) {
                this.currentValue = index
                this.$emit('click', {item, index})
            },
            p_close(item, index) {
                this.$emit('close', {item, index})
            },
            p_contextmenu(item, index) {
                this.$emit('contextmenu', {item, index})
            },
        }
    }
</script>

<style lang="scss">
    .pl-tab-header {
        @include public-style;
        display: block;
        border-bottom: solid 1px $tab-color;

        .pl-item {
            display: inline-block;
            &:not(:last-child) .pl-tab-header-item {
                border-right: none;
            }
        }

        .pl-tab-header-item {
            padding: 0 16px;
            font-size: 12px;
            height: 36px;
            line-height: 36px;
            display: flex;
            align-items: center;
            background-color: white;
            position: relative;
            top: 1px;
            box-sizing: border-box;
            cursor: pointer;
            border: solid 1px $tab-color;
            width: 150px;
            .pl-tab-header-item-text {
                flex: 1;
                flex-shrink: 0;
                overflow: hidden;
            }

            .pl-tab-header-item-close {
                display: flex;
                align-items: center;
                color: #aaa;
                margin-left: 3px;
                line-height: initial;
            }

            &.pl-tab-header-item-active {
                border-bottom-color: white;
                color: $color-primary;
            }
        }
    }
</style>