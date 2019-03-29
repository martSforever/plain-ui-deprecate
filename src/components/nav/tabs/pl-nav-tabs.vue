<template>
    <div class="pl-nav-tabs">
        <div class="pl-nav-tabs-header-wrapper">
            <div class="pl-nav-tabs-header-wrapper-left">
                <pl-nav-tabs-header :list="list" @close="p_remove" @click="({index})=>p_index = index" :value="p_index"/>
            </div>
            <div class="pl-nav-tabs-header-wrapper-right pl-nav-tabs-target">
                <pl-icon icon="pad-plus"/>
            </div>
        </div>
        <div class="pl-nav-tabs-body">
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
                list,
                p_index: 0,
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
        position: relative;
        .pl-nav-tabs-header-wrapper {
            display: flex;
            border: solid 1px $tab-color;
            box-sizing: border-box;
            cursor: pointer;
            position: absolute;
            left: 0;
            right: 0;
            height: 40px;
            .pl-nav-tabs-header-wrapper-left {
                flex: 1;
                overflow: hidden;
            }
            .pl-nav-tabs-header-wrapper-right {
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

        .pl-nav-tabs-body {
            position: absolute;
            top: 56px;
            bottom: 0;
            left: 0;
            right: 0;
            border: solid 1px $tab-color;
            box-sizing: border-box;
        }
    }
</style>