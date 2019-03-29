<template>
    <transition-group
            tag="div"
            @enter="enter"
            @afterEnter="afterEnter"
            @leave="leave"
            class="pl-nav-tabs-header">
        <div class="pl-nav-tabs-header-item pl-nav-tabs-target"
             :class="{'pl-nav-tabs-header-item-active':index === currentValue}"
             v-for="(item,index) in list"
             @click="$emit('click',{item,index})"
             :key="item">
            <div class="pl-nav-tabs-header-item-content">
                <pl-tooltip-text show-overflow-tooltip :content="item"/>
                <div class="pl-nav-tabs-header-item-close" @click.stop="$emit('close',{item,index})">
                    <pl-icon icon="pad-close" hover/>
                </div>
            </div>
        </div>

    </transition-group>
</template>

<script>
    import PlTooltipText from "../tooltip/pl-tooltip-text";
    import PlIcon from "../icon/pl-icon";
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-nav-tabs-header",
        components: {PlIcon, PlTooltipText},
        mixins: [ValueMixin],
        props: {
            list: {type: Array, default: () => []},
        },
        methods: {
            enter(el) {
                el.style.flex = 0
            },
            afterEnter(el) {
                el.style.flex = 1
            },
            leave(el) {
                el.style.flex = 0
            },
        }
    }
</script>

<style lang="scss">
    .pl-nav-tabs-header {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow: hidden;
        .pl-nav-tabs-header-item {
            display: inline-block;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            font-size: 12px;
            border-right: solid 1px $tab-color;
            @include transition-all;
            .pl-nav-tabs-header-item-content {
                width: 100%;
                height: 40px;
                line-height: 40px;
                box-sizing: border-box;
                padding: 0 12px;
                position: relative;
                color: $color-normal-content;
                cursor: pointer;
                .pl-tooltip-text {
                    text-align: center;
                }
                .pl-nav-tabs-header-item-close {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 12px;
                }
            }

            &.pl-nav-tabs-header-item-active {
                background-color: $color-primary-light !important;
            }
        }
    }
</style>