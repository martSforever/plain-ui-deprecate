<template>
    <div class="pl-notice-container"
         :style="containerStyles">
        <div class="pl-notice-wrapper"
             :style="wrapperStyles">
            <pl-list direction="right">
                <pl-item v-for="(item,index) in notices" :key="item.id">
                    <pl-notice-item :text="item.text"
                                    :type="item.type"
                                    :time="item.time"
                                    :done="item.done"
                                    :click="item.click"
                                    @done="done(item,index)"
                                    :title="item.title"
                                    :no-header="item.noHeader"
                                    :render-func="item.renderFunc"/>
                </pl-item>
            </pl-list>
        </div>
    </div>
</template>

<script>
    import PlList from "../list/pl-list";
    import PlItem from "../list/pl-item";
    import PlNoticeItem from "./pl-notice-item";

    export default {
        name: "pl-notice-container",
        components: {PlNoticeItem, PlItem, PlList},
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