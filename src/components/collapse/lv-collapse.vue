<template>
    <div class="lv-collapse" :class="{'lv-collapse-active':currentValue}">
        <div class="lv-collapse-head" @click="lv_click">
            <slot name="head">
                <span v-if="!!title">{{title}}</span>
            </slot>
            <div class="lv-collapse-head-icon-wrapper" v-if="!noIcon">
                <lv-icon icon="lv-arrow-down" :color="iconColor"/>
            </div>
        </div>
        <lv-collapse-transition>
            <div class="lv-collapse-body" v-show="currentValue">
                <slot>
                    BODY
                </slot>
            </div>
        </lv-collapse-transition>
    </div>
</template>

<script>


    import LvCollapseTransition from "./lv-collapse-transition";
    import LvIcon from "../icon/lv-icon";
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: 'lv-collapse',
        components: {
            LvIcon,
            LvCollapseTransition
        },
        mixins: [ValueMixin],
        props: {
            title: {},
            value: {type: Boolean},
            noIcon: {type: Boolean},
            iconColor: {type: String},
            disabledClickHead: {type: Boolean},
        },
        data() {
            return {
                lv_group: null,
            };
        },
        methods: {
            lv_click() {
                this.$emit('clickHead')
                if (this.disabledClickHead) return
                if (!!this.lv_group) this.lv_group.lv_click(this.currentValue, this)
                this.currentValue = !this.currentValue;
            },
        },
        mounted() {
            this.lv_group = this.$plain.$dom.findComponentUpward(this, 'lv-collapse-lv_group');
            if (!!this.lv_group) this.lv_group.lv_add(this)
        },
        beforeDestroy() {
            if (!!this.lv_group) this.lv_group.lv_remove(this)
        },
    };
</script>

<style lang="scss">
    .lv-collapse {
        @include public-style;
        width: 100%;
        border: solid 1px $color-normal-background;
        .lv-collapse-head {
            position: relative;
            box-sizing: border-box;
            padding: 12px 32px 12px 16px;
            .lv-collapse-head-icon-wrapper {
                position: absolute;
                right: 16px;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                .lv-icon {
                    @include transition-all-cubic-bezier;
                }
            }
        }
        .lv-collapse-body {

        }

        &.lv-collapse-active {
            .lv-collapse-head-icon-wrapper .lv-icon {
                transform: rotate(180deg);
            }
        }

    }
</style>
