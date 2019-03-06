const NAVIGATOR_CONSTANT = {
    TAB: 'navigator-main',
    PAGE: 'navigator-page',
}

class NavigatorService {

    context;
    _page;

    get tab() {
        return this.context.$plain.$tab
    }

    get page() {
        if (!this._page) this._page = this.context.$plain.$dom.findComponentUpward(this.context, 'pl-navigator-main-page')
        return this._page
    }

    constructor(context) {
        this.context = context
    }

    /**
     * 打开页签
     * @author  韦胜健
     * @date    2019/3/6 11:23
     */
    async openTab({id, title, path, param, security, data}) {
        return await this.tab.open({id, title, path, param, security, data})
    }

    /**
     * 关闭页签
     * @author  韦胜健
     * @date    2019/3/6 11:23
     */
    async closeTab(id) {
        return await this.tab.close(id)
    }

    /**
     * 刷新tab
     * @author  韦胜健
     * @date    2019/3/6 11:24
     */
    async refreshTab(id) {
        return await this.tab.refresh(id)
    }

    /**
     * 更新tab的信息
     * @author  韦胜健
     * @date    2019/3/6 11:38
     */
    async updateTab(id, newTabData) {
        return await this.tab.update(id, newTabData)
    }

    /**
     * 清除tab导航缓存
     * @author  韦胜健
     * @date    2019/3/6 14:03
     */
    async clearTab() {
        this.context.$plain.$storage.set(NAVIGATOR_CONSTANT.TAB, null)
    }

    /**
     * 在某个标签页下打开页面
     * @author  韦胜健
     * @date    2019/2/27 15:29
     */
    async push(path, param, security) {
        if (!!this.page) return await this.page.push(path, param, security)
    }

    /**
     * 某个标签页下重定向到页面
     * @author  韦胜健
     * @date    2019/2/27 15:30
     */
    async redirect(path, param, security) {
        this.page.redirect(path, param, security)
    }

    /**
     * 在某个标签页下关闭页面
     * @author  韦胜健
     * @date    2019/2/27 15:30
     */
    async back(num = 1) {
        if (!!this.page) return await this.page.back(num)
    }

    /**
     * 某个页签内弹出所有页面
     * @author  韦胜健
     * @date    2019/2/27 15:40
     */
    async backoff() {
        if (!!this.page) return await this.page.backoff()
    }
}

const NavigatorMixin = {
    props: {
        pageTabData: {},
        pageSecurity: {},
        pageParam: {},
    },
    data() {
        const p_ns = new NavigatorService(this)
        return {
            p_ns,
        }
    },
    computed: {
        $nav() {
            return this.p_ns
        },
    },
}

export {
    NavigatorMixin,
    NAVIGATOR_CONSTANT
}