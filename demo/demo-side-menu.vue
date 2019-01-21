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
                        <link-icon icon="lv-check" v-if="menu.complete"/>
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
                            {name: 'Test测试', icon: 'lv-tools', page: 'test', complete: true},
                        ],
                    },
                    {
                        name: 'Basic',
                        menus: [
                            {name: 'Color颜色', icon: 'lv-color', page: 'color', complete: true},
                            {name: 'Icon图标', icon: 'lv-fontsize', page: 'icon', complete: true},
                            {name: 'Button按钮', icon: 'lv-play', page: 'button', complete: true},
                            {name: 'Box盒子', icon: 'lv-box', page: 'box', complete: true},
                        ],
                    },
                    {
                        name: 'Form',
                        menus: [
                            {name: 'Input输入框', icon: 'lv-keyboard', page: 'input', complete: true},
                            {name: 'Radio单复选框', icon: 'lv-radio-on', page: 'radio', complete: true},
                            {name: 'InputNumber数字输入', icon: 'lv-number', page: 'number', complete: true},
                            {name: 'Loading加载', icon: 'lv-loading', page: 'loading', complete: true},
                            {name: 'Select下拉选择', icon: 'lv-arrow-down', page: 'select', complete: true},
                            {name: 'Cascade级联选择', icon: 'lv-cascade', page: 'icon', complete: false},
                            {name: 'Toggle开关切换', icon: 'lv-toggle', page: 'toggle', complete: true},
                            {name: 'Slider滑块', icon: 'lv-sliders', page: 'slider', complete: true},
                            {name: 'TimePicker时间选择', icon: 'lv-time', page: 'icon', complete: false},
                            {name: 'DatePicker日期选择', icon: 'lv-date', page: 'date-picker', complete: false},
                            {name: 'DateTimePicker时间日期', icon: 'lv-datetime', page: 'icon', complete: false},
                            {name: 'Rate评分', icon: 'lv-star', page: 'icon', complete: false},
                            {name: 'ColorPicker颜色选择', icon: 'lv-color', page: 'icon', complete: false},
                            {name: 'Transform穿梭框', icon: 'lv-exchange', page: 'icon', complete: false},
                            {name: 'Form表单', icon: 'lv-form', page: 'icon', complete: false},
                        ],
                    },
                    {
                        name: 'Data',
                        menus: [
                            {name: 'BaseTable基础表格', icon: 'lv-table', page: 'base-table', complete: true},
                            {name: 'List列表', icon: 'lv-list', page: 'list', complete: true},
                            {name: 'Tag标签', icon: 'lv-icon-tag', page: 'tag', complete: true},
                            {name: 'Progress进度条', icon: 'lv-progress', page: 'icon', complete: false},
                            {name: 'Tree树形组件', icon: 'lv-tree', page: 'icon', complete: false},
                            {name: 'Pagination分页', icon: 'lv-book2', page: 'icon', complete: false},
                            {name: 'Badge标记', icon: 'lv-badge', page: 'badge', complete: true},
                            {name: 'Mavon编辑器', icon: 'icon-code', page: 'mavon', complete: true},
                        ],
                    },
                    {
                        name: 'Service',
                        menus: [
                            {name: '$message消息服务', icon: 'lv-message3', page: 'message', complete: true},
                            {name: '$dialog对话框服务', icon: 'lv-message4', page: 'dialog-service', complete: true},
                            {name: '$notice通知', icon: 'lv-sound-4', page: 'notice', complete: true},
                        ],
                    },
                    {
                        name: 'Navigation',
                        menus: [
                            {name: 'Tabs页签', icon: 'lv-tab', page: 'navigator', complete: true},
                            {name: 'Navigator页面导航', icon: 'lv-tab', page: 'navigator', complete: true},
                            {name: 'Steps步骤条', icon: 'lv-number-list', page: 'step', complete: true},
                        ],
                    },
                    {
                        name: 'Others',
                        menus: [
                            {name: 'Scroll滚动条', icon: 'icon-scroll', page: 'scroll', complete: true},
                            {name: 'Dialog对话框', icon: 'lv-dialog', page: 'dialog', complete: true},
                            {name: 'Tooltip文字提示', icon: 'lv-message2', page: 'tooltip', complete: true},
                            {name: 'Popover弹出框', icon: 'lv-message1', page: 'popover', complete: true},
                            {name: 'Card卡片', icon: 'lv-card', page: 'card', complete: true},
                            {name: 'Carousel轮播', icon: 'lv-carousel', page: 'carousel', complete: true},
                            {name: 'Collapse折叠面板', icon: 'lv-collapse', page: 'collapse', complete: true},
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
                .lv-icon {
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