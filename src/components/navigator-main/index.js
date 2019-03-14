import $storage from '../../utils/storage'

const NAVIGATOR_CONSTANT = {
    TAB: 'navigator-main',
    PAGE: 'navigator-page',
}

/**
 * 清除tab导航缓存
 * @author  韦胜健
 * @date    2019/3/6 14:03
 */
async function clearTab() {
    $storage.set(NAVIGATOR_CONSTANT.TAB, null)
    /*const storage = JSON.parse(localStorage.getItem('LinkUI')) || {}
    storage['navigator-main'] = null
    localStorage.setItem('LinkUI', JSON.stringify(storage))*/
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
     * @param   id          tab的id
     * @param   title       tab的标题
     * @param   path        tab根页面路径
     * @param   param       tab根页面参数
     * @param   data        tab页签额外的数据
     * @param   security    tab的安全性
     * @param   refresh     如果页面已经打开，是否刷新页面
     * @param   iframe      页签是否显示的是一个外部网页地址
     */
    async openTab({id, title, path, param, security, data, iframe}, refresh = false) {
        return await this.tab.open({id, title, path, param, security, data, iframe}, refresh)
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

    clearTab = clearTab

    /**
     * 获取当前显示的tab数据信息
     * @author  韦胜健
     * @date    2019/3/14 19:17
     */
    getCurrentTab() {
        return this.tab.getCurrentTab()
    }

    /**
     * 获取当前所有的tabs
     * @author  韦胜健
     * @date    2019/3/14 19:34
     */
    getTabs() {
        return this.tab.pageStack
    }

    /**
     * 打开页面
     * @author  韦胜健
     * @date    2019/3/6 11:41
     * @param   path            打开的页面的路径
     * @param   param           打开页面传递的参数
     * @param   security        打开页面时给的安全性，如果为null或者undefined，则会传入tab的安全性，想要设置该页面没有安全性，则设置空对象{}
     * @param   iframe          打开的页面是否为一个外部地址，使用iframe窗口打开
     */
    async push(path, param, security, iframe) {
        if (!!this.page) return await this.page.push(path, param, security, iframe)
    }

    /**
     * 重定向到页面
     * @author  韦胜健
     * @date    2019/3/6 11:41
     * @param   path            同push的path参数
     * @param   param           同push的param参数
     * @param   security        同push的security参数
     * @param   iframe          同push的iframe参数
     */
    async redirect(path, param, security, iframe) {
        this.page.redirect(path, param, security, iframe)
    }

    /**
     * 回退页面
     * @author  韦胜健
     * @date    2019/3/6 11:41
     * @param   num             回退的页面的个数，默认回退一个页面
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