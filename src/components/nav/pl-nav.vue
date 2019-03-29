<template>
    <div class="pl-nav">
        <div class="pl-nav-header-wrapper">
            <div class="pl-nav-header-wrapper-left">
                <pl-nav-header :list="list" @close="p_remove" @click="({index})=>p_index = index" :value="p_index"/>
            </div>
            <div class="pl-nav-header-wrapper-right pl-nav-target">
                <pl-icon icon="pad-plus"/>
            </div>
        </div>
        <div class="pl-nav-body">
            <link-button @click="p_add">add</link-button>
        </div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";
    import PlNavHeader from "./pl-nav-header";

    export default {
        name: "pl-nav",
        components: {PlNavHeader, PlIcon},
        props: {
            noHeader: {type: Boolean},                                          //不显示页签标题
            default: {type: Object},                                            //默认页面
            maxTabs: {type: Number},                                            //最大可以打开的tabs数目

            beforeOpenTab: {type: Function},                                    //打开页签之前的钩子函数
            afterOpenTab: {type: Function},                                     //打开页签之后的钩子函数
            beforePush: {type: Function},                                       //打开页面之前的钩子函数
            afterPush: {type: Function},                                        //跳转页面之后的钩子函数

            pageRegistryErrorHandler: {type: Function},                         //请求页面js文件出错处理
            page404: {type: String},                                            //找不到页面时，显示的404页面
            storageKey: {type: String},                                         //多页面应用同时使用这个导航组件的话，缓存可能会冲突，这里未设置缓存的关键字，不同单页面应用的key应该不同
            showPathInUrl: {type: Boolean, default: true},                      //是否在地址栏显示页面路径
            disabledStorage: {type: Boolean},                                   //是否缓存页面历史
        },
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
    .pl-nav {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        .pl-nav-header-wrapper {
            display: flex;
            border: solid 1px $tab-color;
            box-sizing: border-box;
            cursor: pointer;
            position: absolute;
            left: 0;
            right: 0;
            height: 40px;
            .pl-nav-header-wrapper-left {
                flex: 1;
                overflow: hidden;
            }
            .pl-nav-header-wrapper-right {
                width: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 13px;
            }
            .pl-nav-target {
                &:hover {
                    background-color: rgba($tab-color, 0.35);
                }
            }
        }

        .pl-nav-body {
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