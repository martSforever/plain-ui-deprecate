<template>
    <pl-list class="pl-tab-header" direction="right">
        <pl-item v-if="!data || data.length === 0" key="empty">
            <div class="pl-tab-header-item pl-tab-header-item-active">
                <span>无</span>
            </div>
        </pl-item>
        <pl-item v-for="(item,index) in data"
                 :key="item">
            <div class="pl-tab-header-item"
                 :class="{'pl-tab-header-item-active':index === currentValue}"
                 @click="p_click(item,index)"
                 @contextmenu.prevent.stop="p_contextmenu(item,index)">
                <span>{{item}}</span>
                <div class="pl-tab-header-item-close" @click.stop="p_close(item,index)" v-if="clearIcon">
                    <pl-icon icon="pl-close-circle-fill"/>
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

    export default {
        name: "pl-tab-header",
        components: {PlItem, PlList, PlIcon},
        mixins: [ValueMixin],
        props: {
            value: {type: Number, default: 0},
            data: {type: Array, default: () => []},
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
    $tab-color: #eee;

    .pl-tab-header {
        @include public-style;
        display: flex;
        align-items: center;
        border-bottom: solid 1px $tab-color;
        padding: 0 12px;
        .pl-tab-header-item {
            padding: 0 24px;
            font-size: 12px;
            height: 30px;
            display: flex;
            align-items: center;
            background-color: white;
            position: relative;
            top: 1px;
            box-sizing: border-box;
            cursor: pointer;
            border: solid 1px transparent;
            border-bottom-color: $tab-color;
            border-top: solid 3px white;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            color: #aaa;

            .pl-tab-header-item-close {
                position: absolute;
                top: 0;
                right: 6px;
                display: flex;
                align-items: center;
                height: 100%;
                color: #aaa;
                opacity: 0;
            }

            &.pl-tab-header-item-active {
                border-bottom: solid 1px white;
                border-top-color: $color-normal-content;
                border-left-color: $tab-color;
                border-right-color: $tab-color;
                color: $color-normal-content;
            }
            &:hover {
                .pl-tab-header-item-close {
                    opacity: 0.5;
                }
                &:not(.pl-tab-header-item-active) {
                    color: $color-primary;
                }
            }

        }
    }
</style>