<template>
    <div class="demo-side-menu">
        <link-scroll>
            <div class="demo-menu-group" v-for="(group,groupIndex) in menuGroups" :key="groupIndex">
                <div class="demo-menu-group-title">{{group.name}}</div>
                <div class="demo-menu-list">
                    <div class="demo-menu-list-item" v-for="(menu,menuIndex) in group.menus" :key="menuIndex" @click="$emit('clickMenu',menu)">
                        <div>
                            <link-icon :icon="menu.icon"/>
                            {{menu.name}}
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
                        name: 'Basic',
                        menus: [
                            {name: 'Test测试', icon: 'pl-tools', page: 'test', complete: true},
                        ],
                    },
                    {
                        name: 'Basic',
                        menus: [
                            {name: 'Color颜色', icon: 'pl-color', page: 'color', complete: true},
                            {name: 'Icon图标', icon: 'pl-fontsize', page: 'icon', complete: true},
                            {name: 'Button按钮', icon: 'pl-play', page: 'button', complete: true},
                            {name: 'Box盒子', icon: 'pl-box', page: 'box', complete: true},
                        ],
                    },
                    {
                        name: 'Form',
                        menus: [
                            {name: 'Input输入框', icon: 'pl-keyboard', page: 'input', complete: true},
                            {name: 'Radio单复选框', icon: 'pl-radio-on', page: 'radio', complete: true},
                            {name: 'InputNumber数字输入', icon: 'pl-number', page: 'number', complete: true},
                            {name: 'Loading加载', icon: 'pl-loading', page: 'loading', complete: true},
                            {name: 'Select下拉选择', icon: 'pl-arrow-down', page: 'select', complete: true},
                            {name: 'Cascade级联选择', icon: 'pl-cascade', page: 'icon', complete: false},
                            {name: 'Toggle开关切换', icon: 'pl-toggle', page: 'toggle', complete: true},
                            {name: 'Slider滑块', icon: 'pl-sliders', page: 'slider', complete: true},
                            {name: 'TimePicker时间选择', icon: 'pl-time', page: 'icon', complete: false},
                            {name: 'DatePicker日期选择', icon: 'pl-date', page: 'date-picker', complete: false},
                            {name: 'DateTimePicker时间日期', icon: 'pl-datetime', page: 'icon', complete: false},
                            {name: 'Rate评分', icon: 'pl-star', page: 'icon', complete: false},
                            {name: 'ColorPicker颜色选择', icon: 'pl-color', page: 'icon', complete: false},
                            {name: 'Transform穿梭框', icon: 'pl-exchange', page: 'icon', complete: false},
                            {name: 'Form表单', icon: 'pl-form', page: 'icon', complete: false},
                        ],
                    },
                    {
                        name: 'Data',
                        menus: [
                            {name: 'BaseTable基础表格', icon: 'pl-table', page: 'base-table', complete: true},
                            {name: 'List列表', icon: 'pl-list', page: 'list', complete: true},
                            {name: 'Tag标签', icon: 'pl-icon-tag', page: 'tag', complete: true},
                            {name: 'Progress进度条', icon: 'pl-progress', page: 'icon', complete: false},
                            {name: 'Tree树形组件', icon: 'pl-tree', page: 'icon', complete: false},
                            {name: 'Pagination分页', icon: 'pl-book2', page: 'icon', complete: false},
                            {name: 'Badge标记', icon: 'pl-badge', page: 'badge', complete: true},
                            {name: 'Mavon编辑器', icon: 'icon-code', page: 'mavon', complete: true},
                        ],
                    },
                    {
                        name: 'Service',
                        menus: [
                            {name: '$message消息服务', icon: 'pl-message3', page: 'message', complete: true},
                            {name: '$dialog对话框服务', icon: 'pl-message4', page: 'dialog-service', complete: true},
                            {name: '$notice通知', icon: 'pl-sound-4', page: 'notice', complete: true},
                        ],
                    },
                    {
                        name: 'Navigation',
                        menus: [
                            {name: 'Tabs页签', icon: 'pl-tab', page: 'navigator', complete: true},
                            {name: 'Navigator页面导航', icon: 'pl-tab', page: 'navigator', complete: true},
                            {name: 'Steps步骤条', icon: 'pl-number-list', page: 'step', complete: true},
                        ],
                    },
                    {
                        name: 'Others',
                        menus: [
                            {name: 'Scroll滚动条', icon: 'icon-scroll', page: 'scroll', complete: true},
                            {name: 'Dialog对话框', icon: 'pl-dialog', page: 'dialog', complete: true},
                            {name: 'Tooltip文字提示', icon: 'pl-message2', page: 'tooltip', complete: true},
                            {name: 'Popover弹出框', icon: 'pl-message1', page: 'popover', complete: true},
                            {name: 'Card卡片', icon: 'pl-card', page: 'card', complete: true},
                            {name: 'Carousel轮播', icon: 'pl-carousel', page: 'carousel', complete: true},
                            {name: 'Collapse折叠面板', icon: 'pl-collapse', page: 'collapse', complete: true},
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