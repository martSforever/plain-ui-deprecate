<template>
    <div class="demo-side-menu">
        <link-scroll>
            <div class="demo-menu-group" v-for="(group,groupIndex) in menuGroups" :key="groupIndex">
                <div class="demo-menu-group-title">{{group.title}}</div>
                <div class="demo-menu-list">
                    <div class="demo-menu-list-item" v-for="(menu,menuIndex) in group.menus" :key="menuIndex" @click="$emit('clickMenu',menu)">
                        <div>
                            <link-icon :icon="menu.icon"/>
                            {{menu.title}}
                        </div>
                        <link-icon icon="pl-check" v-if="menu.complete"/>
                    </div>
                </div>
            </div>
        </link-scroll>
    </div>
</template>

<script>
    export default {
        name: "demo-side-menu",
        data() {
            return {
                menuGroups: [
                    {
                        title: 'BasicTable',
                        menus: [
                            {title: 'BaseTable基础表格', icon: 'pl-table-solid', page: '/base-table/demo-base-table', complete: true},
                            {title: 'BaseTable基础表格列', icon: 'pl-table-solid', page: '/base-table/demo-base-table-column', complete: true},
                        ],
                    },
                    {
                        title: 'BaseTable',
                        menus: [
                            {title: 'BaseTable基础表格', icon: 'pl-table-solid', page: '/table/demo-base-table', complete: true},
                            {title: 'BaseTable基础表格编辑', icon: 'pl-table-solid', page: '/table/demo-base-table-edit', complete: true},
                            {title: 'BaseTable基础表格测试', icon: 'pl-table-solid', page: '/table/demo-base-table-test', complete: true},
                            {title: 'BaseTable列基本属性测试', icon: 'pl-table-solid', page: '/table/demo-base-table-column-prop', complete: true},
                            {title: 'BaseTable基础表格列测试', icon: 'pl-table-solid', page: '/table/demo-base-table-column', complete: true},
                        ],
                    },
                    {
                        title: 'Basic',
                        menus: [
                            {title: 'Test测试', icon: 'pl-tools', page: '/normal/demo-test', complete: true},
                            {title: 'Test测试2', icon: 'pl-tools', page: '/normal/demo-test2', complete: true},
                        ],
                    },
                    {
                        title: 'Basic',
                        menus: [
                            {title: 'Color颜色', icon: 'pl-color', page: '/normal/demo-color', complete: true},
                            {title: 'Icon图标', icon: 'pad-font-colors', page: '/normal/demo-icon', complete: true},
                            {title: 'Button按钮', icon: 'pad-play-circle', page: '/normal/demo-button', complete: true},
                            {title: 'Box盒子', icon: 'pl-box', page: '/normal/demo-box', complete: true},
                        ],
                    },
                    {
                        title: 'Form',
                        menus: [
                            {title: 'Input输入框', icon: 'pl-edit-square-light', page: '/normal/demo-input', complete: true},
                            {title: 'Textarea文本域', icon: 'pl-textarea', page: '/normal/demo-textarea', complete: true},
                            {title: 'Radio单复选框', icon: 'pl-circle-radio', page: '/normal/demo-radio', complete: true},
                            {title: 'InputNumber数字输入', icon: 'pl-number', page: '/normal/demo-number', complete: true},
                            {title: 'Loading加载', icon: 'pl-loading-section-three', page: '/normal/demo-loading', complete: true},
                            {title: 'Select下拉选择', icon: 'pad-down', page: '/normal/demo-select', complete: true},
                            {title: 'Cascade级联选择', icon: 'pad-doubledown', page: '/normal/demo-cascade', complete: true},
                            {title: 'Toggle开关切换', icon: 'pl-toggle', page: '/normal/demo-toggle', complete: true},
                            {title: 'Slider滑块', icon: 'pl-slider', page: '/normal/demo-slider', complete: true},
                            {title: 'Timer时间选择', icon: 'pl-time-circle-light', page: '/normal/demo-time', complete: true},
                            {title: 'Date日期选择', icon: 'pl-date-fill', page: '/normal/demo-date', complete: true},
                            {title: 'Rate评分', icon: 'pad-star', page: '/normal/demo-rate', complete: true},
                            {title: 'ColorPicker颜色选择', icon: 'pl-color', page: '/normal/demo-color-picker', complete: true},
                            {title: 'Transform穿梭框', icon: 'pl-exchange', page: '/normal/demo-icon', complete: false},
                            {title: 'Form表单', icon: 'pl-form', page: '/normal/demo-icon', complete: false},
                        ],
                    },
                    {
                        title: 'Data',
                        menus: [
                            {title: 'List列表', icon: 'pl-list', page: '/normal/demo-list', complete: true},
                            {title: 'Tag标签', icon: 'pl-icon-tag', page: '/normal/demo-tag', complete: true},
                            {title: 'Progress进度条', icon: 'pl-progress', page: '/normal/demo-progress', complete: true},
                            {title: 'Tree树形组件', icon: 'pl-tree', page: '/normal/demo-tree', complete: true},
                            {title: 'Pagination分页', icon: 'pl-book2', page: '/normal/demo-page-bar', complete: true},
                            {title: 'Badge标记', icon: 'pl-badge', page: '/normal/demo-badge', complete: true},
                            {title: 'ScrollOption滚动选择', icon: 'icon-scroll', page: '/normal/demo-scroll-option', complete: true},
                            {title: 'Mavon编辑器', icon: 'icon-code', page: '/normal/demo-mavon', complete: true},
                            {title: 'Steps步骤条', icon: 'pl-step', page: '/normal/demo-step', complete: true},
                        ],
                    },
                    {
                        title: 'Service',
                        menus: [
                            {title: '$message消息服务', icon: 'pad-message', page: '/normal/demo-message', complete: true},
                            {title: '$dialog对话框服务', icon: 'pl-window', page: '/normal/demo-dialog-service', complete: true},
                            {title: '$notice通知', icon: 'pad-bell', page: '/normal/demo-notice', complete: true},
                            {title: '$menu右击菜单', icon: 'pl-menu', page: '/normal/demo-context-menu', complete: true},
                        ],
                    },
                    {
                        title: 'Navigation',
                        menus: [
                            {title: 'Tabs页签', icon: 'pl-tabs', page: '/normal/demo-tabs', complete: true},
                            {title: 'TabsHeader页签标题', icon: 'pl-tabs', page: '/normal/demo-tab-header', complete: true},
                            {title: 'NavigatorTab页签导航', icon: 'pl-tabs', page: '/navigator/demo-navigator-tab', complete: true},
                            {title: 'NavigatorPage页面导航', icon: 'pl-page', page: '/navigator/navigator-page/demo-navigator-page', complete: true},
                            {title: 'NavigatorMain系统导航', icon: 'pl-tabs-main', page: '/navigator/navigator-main/demo-navigator-main', complete: true},
                            {title: 'NavTabs页签导航', icon: 'pl-tabs', page: '/nav/tabs/demo-nav-tabs', complete: true},
                            {title: 'NavPages页面导航', icon: 'pl-page', page: '/nav/demo-nav-page', complete: true},

                        ],
                    },
                    {
                        title: 'Others',
                        menus: [
                            {title: 'Scroll滚动条', icon: 'icon-scroll', page: '/normal/demo-scroll', complete: true},
                            {title: 'Dialog对话框', icon: 'pl-window', page: '/normal/demo-dialog', complete: true},
                            {title: 'Tooltip文字提示', icon: 'pl-tooltip', page: '/normal/demo-tooltip', complete: true},
                            {title: 'Popover弹出框', icon: 'pl-popper', page: '/normal/demo-popover', complete: true},
                            {title: 'Popper悬浮框', icon: 'pl-popper', page: '/normal/demo-popper', complete: true},
                            {title: 'Card卡片', icon: 'pl-card', page: '/normal/demo-card', complete: true},
                            {title: 'Carousel轮播', icon: 'pl-carousel', page: '/normal/demo-carousel', complete: true},
                            {title: 'Collapse折叠面板', icon: 'pl-collapse', page: '/normal/demo-collapse', complete: true},
                        ],
                    },
                ],
            }
        },
    }
</script>

<style lang="scss">
    @include themeify {
        .demo-side-menu {
            height: 100%;
            width: 100%;
            cursor: pointer;
            position: relative;
            background-color: $p-color-normal-background;
            z-index: 2;
            @include public-style;

            .demo-menu-group-title {
                font-size: 12px;
                height: 20px;
                line-height: 20px;
                background-color: $p-color-normal-background-light;
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                color: $p-color-primary;
            }
            .demo-menu-list {
                background-color: $p-color-normal-background;
                .demo-menu-list-item {
                    padding-left: 12px;
                    font-size: 13px;
                    height: 44px;
                    width: 100%;
                    border-bottom: solid 1px $p-color-normal-background-light;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: $p-color-normal-content;
                    box-sizing: border-box;
                    @include transition-all;
                    .pl-icon {
                        margin-right: 12px;
                        font-size: 12px;
                    }
                    &:hover {
                        background-color: $p-color-primary-lighter;
                        color: $p-color-primary-deep;
                    }
                }
            }
        }

    }
</style>