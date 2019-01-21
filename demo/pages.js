const pages = [
    {
        path: 'color',
        title: 'Color颜色',
        icon: 'lv-color',

    },
    {
        path: 'icon',
        title: 'Icon图标',
        icon: 'lv-fontsize',
    },
    {
        path: 'button',
        title: 'Button按钮',
        icon: 'lv-play',
    },
    {
        path: 'box',
        title: 'Box盒子',
        icon: 'lv-box',
    },
    {
        path: 'date-picker',
        title: 'DatePicker日期选择',
        icon: 'lv-date',
    },
    {
        path: 'input',
        title: 'Input输入框',
        icon: 'lv-keyboard',
    },
    {
        path: 'radio',
        title: 'Radio单选复选框',
        icon: 'lv-radio-on',
    },
    {
        path: 'number',
        title: 'Number数字输入框',
        icon: 'lv-number',
    },
    {
        path: 'toggle',
        title: 'Toggle开关按钮',
        icon: 'lv-toggle',
    },
    {
        path: 'loading',
        title: 'Loading加载图标',
        icon: 'lv-loading',
    },
    {
        path: 'popover',
        title: 'Popover弹出层',
        icon: 'lv-message1',
    },
    {
        path: 'dialog',
        title: 'Dialog对话框',
        icon: 'lv-dialog',
    },
    {
        path: 'dialog-service',
        title: '$dialog对话框服务',
        icon: 'lv-message4',
    },
    {
        path: 'list',
        title: 'List列表',
        icon: 'lv-list',
    },
    {
        path: 'message',
        title: '$message消息服务',
        icon: 'lv-message3',
    },
    {
        path: 'notice',
        title: '$notice提示服务',
        icon: 'lv-sound-4',
    },
    {
        path: 'select',
        title: 'Select下拉框',
        icon: 'lv-arrow-down',
    },
    {
        path: 'tabs',
        title: 'Tabs页签',
        icon: 'lv-tab',
    },
    {
        path: 'collapse',
        title: 'Collapse折叠面板',
        icon: 'lv-collapse',
    },
    {
        path: 'card',
        title: 'Card卡片',
        icon: 'lv-card',
    },
    {
        path: 'tooltip',
        title: 'Tooltip文字提示',
        icon: 'lv-message2',
    },
    {
        path: 'carousel',
        title: 'Carousel轮播',
        icon: 'lv-carousel',
    },
    {
        path: 'navigator',
        title: 'Navigator页面导航',
        icon: 'lv-carousel',
    },
    {
        path: 'badge',
        title: 'Badge标记',
        icon: 'lv-badge',
    },
    {
        path: 'mavon',
        title: 'Mavon编辑器',
        icon: 'icon-code',
    },
    {
        path: 'base-table',
        title: 'BaseTable基础表格',
        icon: 'lv-table',
    },
    {
        path: 'scroll',
        title: 'Scroll滚动条',
        icon: 'lv-scroll',
    },
    {
        path: 'tag',
        title: 'Tag标签',
        icon: 'lv-icon-tag',
    },
    {
        path: 'step',
        title: 'Steps步骤条',
        icon: 'lv-number-list',
    },
    {
        path: 'test',
        title: 'Test测试',
        icon: 'lv-tools',
    },
    {
        path: 'slider',
        title: 'Slider滑块',
        icon: 'lv-sliders',
    },
]

export default pages.reduce((ret, page) => {
    page.component = resolve => import('./components/demo-' + page.path + '.vue').then(resolve)
    ret.push(page)
    return ret
}, [])