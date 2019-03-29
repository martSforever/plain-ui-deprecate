<template>
    <div class="pl-nav-tabs">
        <div class="pl-nav-tabs-wrapper">
            <div class="pl-nav-tabs-wrapper-left">
                <pl-nav-tabs-header :list="list" @close="p_remove"/>
            </div>
            <div class="pl-nav-tabs-wrapper-right pl-nav-tabs-target">
                <pl-icon icon="pad-plus"/>
            </div>
        </div>
        <div>
            <link-button @click="p_add">add</link-button>
        </div>
    </div>
</template>

<script>
    import PlNavTabsHeader from "../tabs-header/pl-nav-tabs-header";
    import PlIcon from "../../icon/pl-icon";

    export default {
        name: "pl-nav-tabs",
        components: {PlIcon, PlNavTabsHeader},
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
            p_remove({item, index}) {
                this.list.splice(index, 1)
            },


        }
    }
</script>

<style lang="scss">
    .pl-nav-tabs {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .pl-nav-tabs-wrapper {
            width: 100%;
            display: flex;
            border: solid 1px $tab-color;
            cursor: pointer;
            .pl-nav-tabs-wrapper-left {
                flex: 1;
                overflow: hidden;
            }
            .pl-nav-tabs-wrapper-right {
                width: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 13px;
            }

            .pl-nav-tabs-target {
                &:hover {
                    background-color: rgba($tab-color, 0.35);
                }
            }
        }
    }
</style>