<template>
    <div class="pl-nav-blank">
        <div class="pl-nav-blank-list">
            <h5>当前浏览</h5>
            <pl-list>
                <pl-item v-for="(item) in nowTabs" :key="item.id">
                    <div class="pl-nav-blank-list-item">
                        <div class="pl-nav-blank-list-item-left" @click="pl_openTab(item)">
                            <pl-tooltip-text :content="item.title" show-overflow-tooltip/>
                        </div>
                        <div class="pl-nav-blank-list-item-right">
                            <pl-radio inactive-icon="pad-heart"
                                      active-icon="pad-heart-fill" color="error"
                                      readonly
                                      @click.native.stop="pl_toggleFavorite(item)"
                                      :value="favoriteList.some(i=>i.title === item.title)"/>
                            <pl-icon icon="pad-close-circle" class="pl-nav-blank-close" @click.stop="pl_closeTab(item)"/>
                        </div>
                    </div>
                    <pl-item v-if="nowTabs.length === 0" key="empty"><span>无</span></pl-item>
                </pl-item>
            </pl-list>
        </div>
        <div class="pl-nav-blank-list">
            <h5>我的收藏</h5>
            <pl-list>
                <pl-item v-for="(item) in favoriteList" :key="item.id">
                    <div class="pl-nav-blank-list-item">
                        <div class="pl-nav-blank-list-item-left" @click="pl_openTab(item)">
                            <pl-tooltip-text :content="item.title" show-overflow-tooltip/>
                        </div>
                        <div class="pl-nav-blank-list-item-right">
                            <pl-radio inactive-icon="pad-heart"
                                      active-icon="pad-heart-fill" color="error"
                                      readonly
                                      @click.native.stop="pl_toggleFavorite(item)"
                                      :value="favoriteList.some(i=>i.title === item.title)"/>
                        </div>
                    </div>
                </pl-item>
                <pl-item v-if="favoriteList.length === 0" key="empty"><span>无</span></pl-item>
            </pl-list>
        </div>

        <div class="pl-nav-blank-list">
            <h5>历史记录</h5>
            <pl-list>
                <pl-item v-for="(item) in storageList" :key="item.id">
                    <div class="pl-nav-blank-list-item">
                        <div class="pl-nav-blank-list-item-left" @click="pl_openTab(item)">
                            <pl-tooltip-text :content="item.title" show-overflow-tooltip/>
                        </div>
                        <div class="pl-nav-blank-list-item-right">
                            <pl-radio inactive-icon="pad-heart"
                                      active-icon="pad-heart-fill" color="error"
                                      readonly
                                      @click.native.stop="pl_toggleFavorite(item)"
                                      :value="favoriteList.some(i=>i.title === item.title)"/>
                            <pl-icon icon="pad-close-circle" class="pl-nav-blank-close" @click.stop="pl_deleteHistory(item)"/>
                        </div>
                    </div>
                    <pl-item v-if="storageList.length === 0" key="empty"><span>无</span></pl-item>
                </pl-item>
            </pl-list>
        </div>

        <!--<div class="pl-nav-blank-history  pl-nav-blank-list">
            <h5>历史记录</h5>
            <pl-list>
                <pl-item v-for="(item) in nowTabs" :key="item.id">{{item.title}}</pl-item>
            </pl-list>
        </div>
        <div class="pl-nav-blank-favorite pl-nav-blank-list">
            <h5>我的收藏</h5>
            <pl-list>
                <pl-item v-for="(item) in nowTabs" :key="item.id">{{item.title}}</pl-item>
            </pl-list>
        </div>
        <div class="pl-nav-blank-hot pl-nav-blank-list">
            <h5>热门访问</h5>
            <pl-list>
                <pl-item v-for="(item) in nowTabs" :key="item.id">{{item.title}}</pl-item>
            </pl-list>
        </div>
        <div class="pl-nav-blank-所有 pl-nav-blank-list">
            <h5>所有页面</h5>
            <pl-list>
                <pl-item v-for="(item) in nowTabs" :key="item.id">{{item.title}}</pl-item>
            </pl-list>
        </div>-->
    </div>
</template>

<script>
    import PlList from "../list/pl-list";
    import PlItem from "../list/pl-item";
    import PlIcon from "../icon/pl-icon";
    import PlTooltipText from "../tooltip/pl-tooltip-text";
    import PlRadio from "../radio/pl-radio";
    import {NAV_STORAGE_KEY} from "./index";

    export default {
        name: "pl-nav-blank",
        components: {PlRadio, PlTooltipText, PlIcon, PlItem, PlList},
        props: {
            tab: {},
        },
        data() {
            const nav = this.$plain.$dom.findComponentUpward(this, 'pl-nav')
            const componentStorage = this.$plain.$storage.get(NAV_STORAGE_KEY.BLANK) || {}
            const favoriteList = componentStorage.favoriteList || []
            const storageList = this.$plain.$storage.get(NAV_STORAGE_KEY.HISTORY) || []
            return {
                NAV_STORAGE_KEY,
                nowTabs: nav.tabs,
                nav,
                componentStorage,
                favoriteList,
                storageList,
            }
        },
        methods: {
            /**
             * 收藏|取消收藏
             * @author  韦胜健
             * @date    2019/4/1 19:53
             */
            pl_toggleFavorite(tab) {
                const index = this.$plain.$utils.indexOf(this.favoriteList, item => item.title === tab.title)
                if (index != null) {
                    this.favoriteList.splice(index, 1)
                } else {
                    this.favoriteList.unshift(tab.saveData())
                }
                this.componentStorage.favoriteList = this.favoriteList
                this.$plain.$storage.set(this.NAV_STORAGE_KEY.BLANK, this.componentStorage)
            },
            /**
             * 打开页面
             * @author  韦胜健
             * @date    2019/4/1 20:06
             */
            pl_openTab(tab) {
                this.nav.openTab(tab)
            },
            /**
             * 关闭页面
             * @author  韦胜健
             * @date    2019/4/1 20:14
             */
            pl_closeTab(tab) {
                this.nav.closeTab(tab.id)
            },
            /**
             * 删除历史
             * @author  韦胜健
             * @date    2019/4/1 20:45
             */
            pl_deleteHistory(tab) {
                this.storageList.splice(this.$plain.$utils.indexOf(this.storageList, item => item.id === tab.id), 1)
                this.$plain.$storage.set(NAV_STORAGE_KEY.HISTORY, this.storageList)
            },
        }
    }
</script>

<style lang="scss">
    .pl-nav-blank {
        padding: 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        .pl-nav-blank-close {
            color: var(--p-color-normal-sub-color);
        }
        .pl-nav-blank-list {
            height: 100%;
            width: 200px;
            display: inline-block;
            &:not(:last-child) {
                margin-right: 50px;
            }
            .pl-list {
                width: 100%;
            }
            .pl-nav-blank-list-item {
                height: 40px;
                width: 100%;
                box-sizing: border-box;
                padding: 0 20px;
                display: flex;
                justify-content: space-between;
                position: relative;
                left: -20px;
                border-radius: 40px;
                &:hover {
                    background-color: var(--p-color-primary-lighter);
                    cursor: pointer;
                }
                .pl-nav-blank-list-item-left {
                    flex: 1;
                    overflow: hidden;
                    line-height: 40px;
                }
                .pl-nav-blank-list-item-right {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>