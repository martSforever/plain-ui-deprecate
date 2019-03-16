<template>
    <div class="pl-notice-item"
         :class="[`pl-notice-item-color-${TYPE[type].color}`]" @click="()=>!!click && click()"
         @mouseenter="clearTimer"
         @mouseleave="resetTimer"
    >
        <div class="pl-notice-item-head" v-if="!noHeader">
            <div class="pl-notice-item-title">
                <pl-icon :icon="TYPE[type].icon"/>
                {{title}}
            </div>
            <pl-icon icon="pl-close" class="pl-notice-item-close-icon" @click="close" hover/>
        </div>
        <div class="pl-notice-item-body">
            <span v-if="!!text">{{text}}</span>
            <pl-render-func :render-func="renderFunc" v-if="!!renderFunc"/>
        </div>
    </div>
</template>

<script>

    import {TYPE} from "../../index";
    import PlIcon from "../icon/pl-icon";
    import PlRenderFunc from "../render/pl-render-func";

    export default {
        name: "pl-notice-item",
        components: {PlRenderFunc, PlIcon},
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
    .pl-notice-item {
        @include public-style;
        padding: $padding;
        white-space: nowrap;
        background-color: white;
        min-width: 300px;
        box-shadow: $box-shadow;

        @each $key, $value in $list-color {
            &.pl-notice-item-color-#{$key} {
                .pl-notice-item-head {
                    .pl-notice-item-title {
                        color: $value;
                    }
                }
            }
        }

        .pl-notice-item-head {
            font-size: 14px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: $padding;
            .pl-notice-item-title {
                flex: 1;
                overflow-x: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .pl-notice-item-close-icon {
                @include transition-all;
                &:hover {
                    transform: scale(1.2);
                }
            }
        }
        .pl-notice-item-body {
            font-size: 12px;
        }
    }
</style>