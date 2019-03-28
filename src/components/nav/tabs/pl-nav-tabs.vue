<template>
    <div class="pl-nav-tabs">
        <transition-group name="pl-nav-tabs-header"
                          tag="div"
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
        }
    }
</script>

<style lang="scss">
    .pl-nav-tabs {
        width: 100%;
        height: 100%;
        border: solid 1px $tab-color;
        box-sizing: border-box;

        .pl-nav-tabs-header {
            .pl-nav-tabs-header-item {
                display: inline-block;

                @include transition-all;
            }
        }
    }

    .pl-nav-tabs-header-enter, .pl-nav-tabs-header-leave-to {
        opacity: 0;
        transform: translateY(10px);
    }

    .pl-nav-tabs-header-leave-active {
        position: absolute;
    }
</style>