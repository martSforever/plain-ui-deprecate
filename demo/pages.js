const pages = [
    {
        path: 'color',
        title: 'Color颜色',
        icon: 'pl-color',

    },
    {
        path: 'icon',
        title: 'Icon图标',
        icon: 'pl-fontsize',
    },
    {
        path: 'button',
        title: 'Button按钮',
        icon: 'pl-play',
    },
    {
        path: 'box',
        title: 'Box盒子',
        icon: 'pl-box',
    },
    {
        path: 'date-picker',
        title: 'DatePicker日期选择',
        icon: 'pl-date',
    },
    {
        path: 'input',
        title: 'Input输入框',
        icon: 'pl-keyboard',
    },
    {
        path: 'radio',
        title: 'Radio单选复选框',
        icon: 'pl-radio-on',
    },
    {
        path: 'number',
        title: 'Number数字输入框',
        icon: 'pl-number',
    },
    {
        path: 'toggle',
        title: 'Toggle开关按钮',
        icon: 'pl-toggle',
    },
    {
        path: 'loading',
        title: 'Loading加载图标',
        icon: 'pl-loading',
    },
    {
        path: 'popover',
        title: 'Popover弹出层',
        icon: 'pl-message1',
    },
    {
        path: 'dialog',
        title: 'Dialog对话框',
        icon: 'pl-dialog',
    },
    {
        path: 'dialog-service',
        title: '$dialog对话框服务',
        icon: 'pl-message4',
    },
    {
        path: 'list',
        title: 'List列表',
        icon: 'pl-list',
    },
    {
        path: 'message',
        title: '$message消息服务',
        icon: 'pl-message3',
    },
    {
        path: 'notice',
        title: '$notice提示服务',
        icon: 'pl-sound-4',
    },
    {
        path: 'select',
        title: 'Select下拉框',
        icon: 'pl-arrow-down',
    },
    {
        path: 'tabs',
        title: 'Tabs页签',
        icon: 'pl-tab',
    },
    {
        path: 'collapse',
        title: 'Collapse折叠面板',
        icon: 'pl-collapse',
    },
    {
        path: 'card',
        title: 'Card卡片',
        icon: 'pl-card',
    },
    {
        path: 'tooltip',
        title: 'Tooltip文字提示',
        icon: 'pl-message2',
    },
    {
        path: 'carousel',
        title: 'Carousel轮播',
        icon: 'pl-carousel',
    },
    {
        path: 'navigator',
        title: 'Navigator页面导航',
        icon: 'pl-carousel',
    },
    {
        path: 'badge',
        title: 'Badge标记',
        icon: 'pl-badge',
    },
    {
        path: 'mavon',
        title: 'Mavon编辑器',
        icon: 'icon-code',
    },
    {
        path: 'base-table',
        title: 'BaseTable基础表格',
        icon: 'pl-table',
    },
    {
        path: 'scroll',
        title: 'Scroll滚动条',
        icon: 'pl-scroll',
    },
    {
        path: 'tag',
        title: 'Tag标签',
        icon: 'pl-icon-tag',
    },
    {
        path: 'step',
        title: 'Steps步骤条',
        icon: 'pl-number-list',
    },
    {
        path: 'test',
        title: 'Test测试',
        icon: 'pl-tools',
    },
    {
        path: 'slider',
        title: 'Slider滑块',
        icon: 'pl-sliders',
    },
    {
        path: 'rate',
        title: 'Rate评分',
        icon: 'pl-star',
    },
]

export default pages.reduce((ret, page) => {
    page.component = resolve => import('./components/demo-' + page.path + '.vue').then(resolve)
    ret.push(page)
    return ret
}, [])