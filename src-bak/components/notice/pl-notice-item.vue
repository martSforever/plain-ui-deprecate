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
            <pl-icon icon="pad-close" class="pl-notice-item-close-icon" @click="close" hover/>
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