<template>
    <div class="lv-message-container"
         :style="containerStyles">
        <div class="lv-message-wrapper"
             :style="wrapperStyles">
            <lv-list direction="top">
                <lv-item v-for="(item,index) in messages" :key="item.id">
                    <lv-message-item :text="item.text" :type="item.type" :time="item.time" :done="item.done" :click="item.click" @done="done(item,index)"/>
                </lv-item>
            </lv-list>
        </div>
    </div>
</template>

<script>
    import LvList from "../list/lv-list";
    import LvItem from "../list/lv-item";
    import LvMessageItem from "./lv-message-item";

    export default {
        name: "lv-message-container",
        components: {LvMessageItem, LvItem, LvList},
        props: {
            horizontal: {type: String, default: 'center'},
            vertical: {type: String, default: 'start'},
            messages: {type: Array, default: () => []},
        },
        computed: {
            position() {
                return {
                    [this.targetHorizontal === 'end' ? 'right' : 'left']: this.targetHorizontal === 'center' ? '50%' : '20px',
                    [this.targetVertical === 'end' ? 'bottom' : 'top']: this.targetVertical === 'center' ? '50%' : '20px',
                }
            },
            containerStyles() {
                const styles = {}
                styles[this.targetHorizontal === 'end' ? 'right' : 'left'] = this.targetHorizontal === 'center' ? '50%' : '20px'
                styles[this.targetVertical === 'end' ? 'bottom' : 'top'] = this.targetVertical === 'center' ? '50%' : '20px'
                return styles;
            },
            wrapperStyles() {
                const styles = {}
                styles.transform = `translate(${this.targetHorizontal === 'center' ? '-50%' : '0'},${this.targetVertical === 'center' ? '-50%' : '0'})`
                return styles;
            },
            targetVertical() {
                return this.p_vertical || this.vertical
            },
            targetHorizontal() {
                return this.p_horizontal || this.horizontal
            },
        },
        data() {
            return {
                p_vertical: null,
                p_horizontal: null,
            }
        },
        methods: {
            done(item, index) {
                this.messages.splice(index, 1)
            },
            add(message) {
                this.messages.push(message)
            },
            remove(message) {
                const index = this.messages.indexOf(message)
                if (index > -1) this.messages.splice(index, 1)
            },
        }
    }
</script>

<style lang="scss">
    $position: (
            start:flex-start,
            center:center,
            end:flex-end,
    );
    .lv-message-container {
        position: fixed;
        .lv-message-wrapper {
            .lv-item {
                &:not(:last-child) {
                    margin-bottom: 12px;
                }
            }
        }
    }
</style>