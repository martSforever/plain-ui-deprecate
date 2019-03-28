<template>
    <div class="pl-nav-tabs">
        <transition-group
                ref="header"
                tag="div"
                @before-enter="beforeEnter"
                @enter="enter"
                @afterEnter="afterEnter"
                @before-leave="beforeLeave"
                @leave="leave"
                class="pl-nav-tabs-header">
            <div class="pl-nav-tabs-header-item"
                 @click="p_remove(item)"
                 v-for="(item) in list"
                 :key="item">
                {{item}}
            </div>
        </transition-group>
        <div>
            <link-button @click="p_add">add</link-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pl-nav-tabs",
        data() {
            const list = []
            for (let i = 0; i < 5; i++) {
                list.push(this.$plain.$utils.uuid())
            }
            return {
                list
            }
        },
        methods: {
            p_add() {
                this.list.push(this.$plain.$utils.uuid())
            },
            p_remove(item) {
                this.list.splice(this.list.indexOf(item), 1)
            },

            beforeEnter(el) {
                el.style.flex = 'initial'
                el.style.width = 0
            },
            enter(el) {
                el.style.width = `${Math.floor(this.$refs.header.offsetWidth / this.list.length)}px`
            },
            afterEnter(el) {
                el.style.width = null
                el.style.flex = 1
            },
            beforeLeave(el) {
                el.style.width = `${el.offsetWidth}px`
                el.style.flex = 'initial'
            },
            leave(el) {
                el.style.width = 0
            },
        }
    }
</script>

<style lang="scss">
    .pl-nav-tabs {
        width: 100%;
        height: 100%;
        border: solid 1px $tab-color;
        box-sizing: border-box;
        padding: 12px;
        .pl-nav-tabs-header {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            .pl-nav-tabs-header-item {
                display: inline-block;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-sizing: border-box;
                border: solid 1px #ddd;
                flex: 1;
                @include transition-all;
            }
        }
    }
</style>