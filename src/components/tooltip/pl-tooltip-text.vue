<template>
    <div class="pl-tooltip-text" @mouseenter="p_mouseenter">
        <div class="pl-tooltip-text-content" ref="content" v-tooltip="tooltipOption">
            <span ref="text">{{content}}</span>
        </div>
    </div>
</template>

<script>

    import tooltip from 'src/directives/tooltip'

    export default {
        name: "pl-tooltip-text",
        directives: {tooltip},
        props: {
            content: {required: true},                                      //显示以及tooltip悬浮显示的文本
            arrow: {type: Boolean, default: true},                          //是否显示箭头
            placement: {type: String, default: 'top'},                      //悬浮位置
            trigger: {type: String, default: 'mouseenter'},                 //悬浮触发方式
            theme: {type: String, default: 'dark'},                         //悬浮的主题色
            disabled: {type: Boolean},                                      //是否禁用
        },
        computed: {
            tooltipOption() {
                return {
                    content: this.content,
                    arrow: this.arrow,
                    placement: this.placement,
                    trigger: this.trigger,
                    theme: this.theme,
                    disabled: this.disabled || !(this.textWidth != null && this.hostWidth != null && this.textWidth > this.hostWidth)
                }
            },
        },
        data() {
            return {
                hostWidth: null,
                textWidth: null,
            }
        },
        mounted() {
            this.p_resetWidth()
        },
        methods: {
            p_resetWidth() {
                this.hostWidth = this.$refs.content.offsetWidth
                this.textWidth = this.$refs.text.offsetWidth
            },
            p_mouseenter() {
                this.p_resetWidth()
            },
        },
    }
</script>

<style lang="scss">
    .pl-tooltip-text {
        display: block;
        height: fit-content;
        padding: 3px 0;
        .pl-tooltip-text-content {
            outline: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
        }
    }

    .pl-tooltip-target {
        outline: none;
    }
</style>