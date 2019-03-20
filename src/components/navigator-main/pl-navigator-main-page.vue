<template>
    <component class="pl-navigator-main-page"
               :path="page.path"
               :is="page.component"
               :src="page.path"

               :pageTabData="tabData"
               :pageSecurity="page.security || tab.security"
               :pageParam="page.param || {}"/>
</template>

<script>
    export default {
        name: "pl-navigator-main-page",
        props: {
            page: {},
            tab: {},
        },
        data() {
            return {
                parent: null,
                id: this.page.id,
                listenEvents: [],
            }
        },
        created() {
            this.parent = this.$plain.$dom.findComponentUpward(this, 'pl-navigator-main-tab')
        },
        methods: {
            /**
             * 监听事件
             * @author  韦胜健
             * @date    2019/3/19 18:50
             */
            on(event, callback) {
                this.listenEvents.push({event, callback})
                this.parent.on(event, callback)
            },

            /**
             * 只监听一次事件
             * @author  韦胜健
             * @date    2019/3/19 18:51
             */
            once(event, callback) {
                this.listenEvents.push({event, callback})
                this.parent.once(event, callback)
            },

            /**
             * 移除事件
             * @author  韦胜健
             * @date    2019/3/19 18:51
             */
            off(event, callback) {
                for (let i = 0; i < this.listenEvents.length; i++) {
                    const {event: e, callback: c} = this.listenEvents[i];
                    if (event !== e) continue
                    if (callback == null || callback === c) {
                        this.listenEvents.splice(i, 1)
                        this.parent.off(event, callback)
                        i--
                        return true
                    }
                }
                return false
            },

            /**
             * 派发事件
             * @author  韦胜健
             * @date    2019/3/19 18:51
             */
            emit(event, param, global) {
                this.parent.emit(event, param, global)
            },
        },
        beforeDestroy() {
            /*页面销毁*/
            this.listenEvents.forEach(({event, callback, global}) => this.parent.off(event, callback, global))
        },
    }
</script>

<style lang="scss">

</style>