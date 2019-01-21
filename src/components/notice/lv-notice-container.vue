<template>
    <div class="lv-notice-container"
         :style="containerStyles">
        <div class="lv-notice-wrapper"
             :style="wrapperStyles">
            <lv-list direction="right">
                <lv-item v-for="(item,index) in notices" :key="item.id">
                    <lv-notice-item :text="item.text"
                                    :type="item.type"
                                    :time="item.time"
                                    :done="item.done"
                                    :click="item.click"
                                    @done="done(item,index)"
                                    :title="item.title"
                                    :no-header="item.noHeader"
                                    :render-func="item.renderFunc"/>
                </lv-item>
            </lv-list>
        </div>
    </div>
</template>

<script>
    import LvList from "../list/lv-list";
    import LvItem from "../list/lv-item";
    import LvNoticeItem from "./lv-notice-item";

    export default {
        name: "lv-notice-container",
        components: {LvNoticeItem, LvItem, LvList},
        props: {
            horizontal: {type: String, default: 'end'},
            vertical: {type: String, default: 'end'},
            notices: {type: Array, default: () => []},
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
                return this.lv_vertical || this.vertical
            },
            targetHorizontal() {
                return this.lv_horizontal || this.horizontal
            },
        },
        data() {
            return {
                lv_vertical: null,
                lv_horizontal: null,
            }
        },
        methods: {
            done(item, index) {
                this.notices.splice(index, 1)
            },
            add(notice) {
                this.notices.push(notice)
            },
            remove(notice) {
                const index = this.notices.indexOf(notice)
                if (index > -1) this.notices.splice(index, 1)
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
    .lv-notice-container {
        position: fixed;
        .lv-notice-wrapper {
            .lv-item {
                &:not(:last-child) {
                    margin-bottom: 12px;
                }
            }
        }
    }
</style>