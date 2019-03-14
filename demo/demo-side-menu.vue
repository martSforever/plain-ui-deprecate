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
                        title: 'Table相关',
                        menus: [
                            {title: 'BaseTable基础表格', icon: 'pl-table', page: '/table/demo-base-table', complete: true},
                            {title: 'BaseTable基础表格测试', icon: 'pl-table', page: '/table/demo-base-table-test', complete: true},
                            {title: 'BaseTable基础表格列组件测试', icon: 'pl-table', page: '/table/demo-base-table-column', complete: true},
                        ],
                    },
                    {
                        title: 'Basic',
                        menus: [
                            {title: 'Test测试', icon: 'pl-tools', page: '/demo-test', complete: true},
                            {title: 'Block代码块', icon: 'pl-tools', page: '/demo-test-block', complete: true},
                        ],
                    },
                    {
                        title: 'Basic',
                        menus: [
                            {title: 'Color颜色', icon: 'pl-color', page: '/demo-color', complete: true},
                            {title: 'Icon图标', icon: 'pl-fontsize', page: '/demo-icon', complete: true},
                            {title: 'Button按钮', icon: 'pl-play', page: '/demo-button', complete: true},
                            {title: 'Box盒子', icon: 'pl-box', page: '/demo-box', complete: true},
                        ],
                    },
                    {
                        title: 'Form',
                        menus: [
                            {title: 'Input输入框', icon: 'pl-keyboard', page: '/demo-input', complete: true},
                            {title: 'Radio单复选框', icon: 'pl-radio-on', page: '/demo-radio', complete: true},
                            {title: 'InputNumber数字输入', icon: 'pl-number', page: '/demo-number', complete: true},
                            {title: 'Loading加载', icon: 'pl-loading', page: '/demo-loading', complete: true},
                            {title: 'Select下拉选择', icon: 'pl-arrow-down', page: '/demo-select', complete: true},
                            {title: 'Cascade级联选择', icon: 'pl-cascade', page: '/demo-cascade', complete: true},
                            {title: 'Toggle开关切换', icon: 'pl-toggle', page: '/demo-toggle', complete: true},
                            {title: 'Slider滑块', icon: 'pl-sliders', page: '/demo-slider', complete: true},
                            {title: 'Timer时间选择', icon: 'pl-time', page: '/demo-time', complete: true},
                            {title: 'Date日期选择', icon: 'pl-date', page: '/demo-date', complete: true},
                            {title: 'Rate评分', icon: 'pl-star', page: '/demo-rate', complete: true},
                            {title: 'ColorPicker颜色选择', icon: 'pl-color', page: '/demo-color-picker', complete: true},
                            {title: 'Transform穿梭框', icon: 'pl-exchange', page: '/demo-icon', complete: false},
                            {title: 'Form表单', icon: 'pl-form', page: '/demo-icon', complete: false},
                        ],
                    },
                    {
                        title: 'Data',
                        menus: [
                            {title: 'List列表', icon: 'pl-list', page: '/demo-list', complete: true},
                            {title: 'Tag标签', icon: 'pl-icon-tag', page: '/demo-tag', complete: true},
                            {title: 'Progress进度条', icon: 'pl-progress', page: '/demo-progress', complete: true},
                            {title: 'Tree树形组件', icon: 'pl-tree', page: '/demo-tree', complete: true},
                            {title: 'Pagination分页', icon: 'pl-book2', page: '/demo-page-bar', complete: true},
                            {title: 'Badge标记', icon: 'pl-badge', page: '/demo-badge', complete: true},
                            {title: 'ScrollOption滚动选择', icon: 'icon-scroll', page: '/demo-scroll-option', complete: true},
                            {title: 'Mavon编辑器', icon: 'icon-code', page: '/demo-mavon', complete: true},
                        ],
                    },
                    {
                        title: 'Service',
                        menus: [
                            {title: '$message消息服务', icon: 'pl-message3', page: '/demo-message', complete: true},
                            {title: '$dialog对话框服务', icon: 'pl-message4', page: '/demo-dialog-service', complete: true},
                            {title: '$notice通知', icon: 'pl-sound-4', page: '/demo-notice', complete: true},
                            {title: '$menu右击菜单', icon: 'pl-sound-4', page: '/demo-context-menu', complete: true},
                        ],
                    },
                    {
                        title: 'Navigation',
                        menus: [
                            {title: 'Tabs页签', icon: 'pl-tab', page: '/demo-tabs', complete: true},
                            {title: 'TabsHeader页签标题', icon: 'pl-tab', page: '/demo-tab-header', complete: true},
                            {title: 'NavigatorTab页签导航', icon: 'pl-tab', page: '/navigator/demo-navigator-tab', complete: true},
                            {title: 'NavigatorPage页面导航', icon: 'pl-tab', page: '/navigator/navigator-page/demo-navigator-page', complete: true},
                            {title: 'NavigatorMain系统导航', icon: 'pl-tab', page: '/navigator/navigator-main/demo-navigator-main', complete: true},
                            {title: 'Steps步骤条', icon: 'pl-number-list', page: '/demo-step', complete: true},
                        ],
                    },
                    {
                        title: 'Others',
                        menus: [
                            {title: 'Scroll滚动条', icon: 'icon-scroll', page: '/demo-scroll', complete: true},
                            {title: 'Dialog对话框', icon: 'pl-dialog', page: '/demo-dialog', complete: true},
                            {title: 'Tooltip文字提示', icon: 'pl-message2', page: '/demo-tooltip', complete: true},
                            {title: 'Popover弹出框', icon: 'pl-message1', page: '/demo-popover', complete: true},
                            {title: 'Card卡片', icon: 'pl-card', page: '/demo-card', complete: true},
                            {title: 'Carousel轮播', icon: 'pl-carousel', page: '/demo-carousel', complete: true},
                            {title: 'Collapse折叠面板', icon: 'pl-collapse', page: '/demo-collapse', complete: true},
                            {title: 'MarkdownParser', icon: 'pl-collapse', page: '/demo-markdown-parser', complete: true},
                        ],
                    },
                ],
            }
        },
    }
</script>

<style lang="scss">
    .demo-side-menu {
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: relative;
        @include public-style;
        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            box-shadow: 0 5px 20px #ddd;
        }

        .demo-menu-group-title {
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            background-color: #f2f2f2;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            color: $color-primary;
        }
        .demo-menu-list {
            padding-left: 12px;
            .demo-menu-list-item {
                font-size: 13px;
                height: 44px;
                width: 100%;
                border-bottom: solid 1px #f2f2f2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                @include transition-all;
                .pl-icon {
                    margin-right: 12px;
                    font-size: 12px;
                }
                &:hover {
                    background-color: $color-primary-light;
                }
            }
        }
    }
</style>