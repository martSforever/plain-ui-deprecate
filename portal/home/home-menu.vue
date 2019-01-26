<template>
    <div class="home-menu">
        <div class="home-menu-content">
            <div class="home-menu-item" :class="[`home-menu-item-${item.cls || 'normal'}`,{'home-menu-item-link':!!item.path}]" v-for="(item,index) in menus" :key="index">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home-menu",
        data() {
            return {
                menus: [
                    {name: '开发指南', icon: '', cls: 'big-title'},
                    {name: '安装', path: 'd', icon: '',},
                    {name: '快速上手', path: 'd', icon: '',},
                    {name: '组件', path: '', icon: '', cls: 'big-title'},
                    {name: '基础组件', path: '', icon: '', cls: 'title'},
                    {name: 'Icon图标', path: 'icon', icon: '',},
                    {name: 'Button按钮', path: 'button', icon: '',},
                    {name: 'Color颜色', path: 'color', icon: '',},
                ]
            }
        },
    }
</script>

<style lang="scss">
    .home-menu {
        width: 200px;
        height: 100%;
        padding: 12px 0;
        .home-menu-content {
            width: 100%;
            height: 100%;
            border-right: solid 1px #f2f2f2;
            .home-menu-item {
                font-size: 14px;
                height: 40px;
                display: flex;
                align-items: center;
                padding: 0 12px;
                color: #5c677b;
                border-right: 3px solid transparent;
                &.home-menu-item-normal {

                }
                &.home-menu-item-link {
                    padding-left: 24px;
                    &:hover {
                        background-color: #f0faff;
                        cursor: pointer;
                        color: #1076ca;
                        border-color: #1076ca;
                    }
                }
                &.home-menu-item-big-title {
                    font-weight: 600;
                    font-size: 16px;
                }
                &.home-menu-item-title {
                    font-size: 12px;
                    color: black;
                }
            }
        }
    }
</style>