<template>
    <div class="lv-notice-item"
         :class="[`lv-notice-item-color-${TYPE[type].color}`]" @click="()=>!!click && click()"
         @mouseenter="clearTimer"
         @mouseleave="resetTimer"
    >
        <div class="lv-notice-item-head" v-if="!noHeader">
            <div class="lv-notice-item-title">
                <lv-icon :icon="TYPE[type].icon"/>
                {{title}}
            </div>
            <lv-icon icon="lv-close" class="lv-notice-item-close-icon" @click="close"/>
        </div>
        <div class="lv-notice-item-body">
            <span v-if="!!text">{{text}}</span>
            <lv-render-func :render-func="renderFunc" v-if="!!renderFunc"/>
        </div>
    </div>
</template>

<script>

    import {TYPE} from "../../index";
    import LvIcon from "../icon/lv-icon";
    import LvRenderFunc from "../render/lv-render-func";

    export default {
        name: "lv-notice-item",
        components: {LvRenderFunc, LvIcon},
        props: {
            title: {type: String, default: '消息提示'},
            text: {type: String},
            type: {type: String},
            time: {type: Number},
            done: {type: Function},
            click: {type: Function},
            noHeader: {type: Boolean},
            renderFunc: {type: Function,},
        },
        created() {
            this.resetTimer()
        },
        data() {
            return {
                TYPE,
                timer: null,
            }
        },
        methods: {
            close() {
                this.$emit('done')
            },
            resetTimer() {
                if (this.time !== null) this.timer = setTimeout(() => {
                    this.$emit('done',)
                    !!this.done && (this.done())
                }, this.time)
            },
            clearTimer() {
                if (!!this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }
            },
        }
    }
</script>

<style lang="scss">
    .lv-notice-item {
        @include public-style;
        padding: $padding;
        white-space: nowrap;
        background-color: white;
        min-width: 300px;
        box-shadow: $box-shadow;

        @each $key, $value in $list-color {
            &.lv-notice-item-color-#{$key} {
                .lv-notice-item-head {
                    .lv-notice-item-title {
                        color: $value;
                    }
                }
            }
        }

        .lv-notice-item-head {
            font-size: 14px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: $padding;
            .lv-notice-item-title {
                flex: 1;
                overflow-x: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .lv-notice-item-close-icon {
                @include transition-all;
                &:hover {
                    transform: scale(1.2);
                }
            }
        }
        .lv-notice-item-body {
            font-size: 12px;
        }
    }
</style>