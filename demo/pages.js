const pages = [
    {
        path: 'demo-color',
        title: 'Color颜色',
        icon: 'pl-color',

    },
    {
        path: 'demo-icon',
        title: 'Icon图标',
        icon: 'pl-fontsize',
    },
    {
        path: 'demo-button',
        title: 'Button按钮',
        icon: 'pl-play',
    },
    {
        path: 'demo-box',
        title: 'Box盒子',
        icon: 'pl-box',
    },
    {
        path: 'demo-date-picker',
        title: 'DatePicker日期选择',
        icon: 'pl-date',
    },
    {
        path: 'demo-input',
        title: 'Input输入框',
        icon: 'pl-keyboard',
    },
    {
        path: 'demo-radio',
        title: 'Radio单选复选框',
        icon: 'pl-radio-on',
    },
    {
        path: 'demo-number',
        title: 'Number数字输入框',
        icon: 'pl-number',
    },
    {
        path: 'demo-toggle',
        title: 'Toggle开关按钮',
        icon: 'pl-toggle',
    },
    {
        path: 'demo-loading',
        title: 'Loading加载图标',
        icon: 'pl-loading',
    },
    {
        path: 'demo-popover',
        title: 'Popover弹出层',
        icon: 'pl-message1',
    },
    {
        path: 'demo-dialog',
        title: 'Dialog对话框',
        icon: 'pl-dialog',
    },
    {
        path: 'demo-dialog-service',
        title: '$dialog对话框服务',
        icon: 'pl-message4',
    },
    {
        path: 'demo-list',
        title: 'List列表',
        icon: 'pl-list',
    },
    {
        path: 'demo-message',
        title: '$message消息服务',
        icon: 'pl-message3',
    },
    {
        path: 'demo-notice',
        title: '$notice提示服务',
        icon: 'pl-sound-4',
    },
    {
        path: 'demo-select',
        title: 'Select下拉框',
        icon: 'pl-arrow-down',
    },
    {
        path: 'demo-collapse',
        title: 'Collapse折叠面板',
        icon: 'pl-collapse',
    },
    {
        path: 'demo-card',
        title: 'Card卡片',
        icon: 'pl-card',
    },
    {
        path: 'demo-tooltip',
        title: 'Tooltip文字提示',
        icon: 'pl-message2',
    },
    {
        path: 'demo-carousel',
        title: 'Carousel轮播',
        icon: 'pl-carousel',
    },
    {
        path: 'demo-navigator',
        title: 'Navigator页面导航',
        icon: 'pl-tab',
    },
    {
        path: 'demo-badge',
        title: 'Badge标记',
        icon: 'pl-badge',
    },
    {
        path: 'demo-mavon',
        title: 'Mavon编辑器',
        icon: 'icon-code',
    },
    {
        path: 'demo-scroll',
        title: 'Scroll滚动条',
        icon: 'pl-scroll',
    },
    {
        path: 'demo-tag',
        title: 'Tag标签',
        icon: 'pl-icon-tag',
    },
    {
        path: 'demo-step',
        title: 'Steps步骤条',
        icon: 'pl-number-list',
    },
    {
        path: 'demo-test',
        title: 'Test测试',
        icon: 'pl-tools',
    },
    {
        path: 'demo-slider',
        title: 'Slider滑块',
        icon: 'pl-sliders',
    },
    {
        path: 'demo-progress',
        title: 'Progress进度条',
        icon: 'pl-progress',
    },
    {
        path: 'demo-rate',
        title: 'Rate评分',
        icon: 'pl-star',
    },
    {
        path: 'demo-page-bar',
        title: 'Pagination分页',
        icon: 'pl-book2',
    },
    {
        path: 'demo-tree',
        title: 'Tree树形组件',
        icon: 'pl-tree',
    },
    {
        path: 'demo-color-picker',
        title: 'ColorPicker颜色选择',
        icon: 'pl-color',
    },
    {
        path: 'demo-cascade',
        title: 'Cascade级联选择',
        icon: 'pl-cascade',
    },
    {
        path: 'table/demo-base-table',
        title: 'BaseTable基础表格',
        icon: 'pl-table',
    },
    {
        path: 'table/demo-base-table-test',
        title: 'BaseTable基础表格测试',
        icon: 'pl-table',
    },
    {
        path: 'table/demo-base-table-column',
        title: 'BaseTable基础表格列组件测试',
        icon: 'pl-table',
    },
    {
        path: 'demo-tab',
        title: 'Tabs页签',
        icon: 'pl-tab',
    },
]

export default pages.reduce((ret, page) => {
    page.component = resolve => import('./components/' + page.path + '.vue').then(resolve)
    ret.push(page)
    return ret
}, [])