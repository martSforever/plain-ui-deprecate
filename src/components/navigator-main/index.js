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
    _tab;
    _page;

    get main() {
        return this.context.$plain.$tab
    }

    get tab() {
        if (!this._tab) this._tab = this.context.$plain.$dom.findComponentUpward(this.context, 'pl-navigator-main-tab')
        return this._tab
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
        return await this.main.open({id, title, path, param, security, data, iframe}, refresh)
    }

    /**
     * 关闭页签
     * @author  韦胜健
     * @date    2019/3/6 11:23
     */
    async closeTab(id) {
        return await this.main.close(id)
    }

    /**
     * 刷新tab
     * @author  韦胜健
     * @date    2019/3/6 11:24
     */
    async refreshTab(id) {
        id = id || this.tab.id
        return await this.main.refresh(id)
    }

    /**
     * 更新tab的信息
     * @author  韦胜健
     * @date    2019/3/6 11:38
     */
    async updateTab(id, newTabData) {
        id = id || this.tab.id
        return await this.main.update(id, newTabData)
    }

    clearTab = clearTab

    /**
     * 获取当前显示的tab数据信息
     * @author  韦胜健
     * @date    2019/3/14 19:17
     */
    getCurrentTab() {
        return this.main.getCurrentTab()
    }

    /**
     * 获取当前所有的tabs
     * @author  韦胜健
     * @date    2019/3/14 19:34
     */
    getTabs() {
        return this.main.pageStack
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
        if (!!this.tab) return await this.tab.push(path, param, security, iframe)
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
        this.tab.redirect(path, param, security, iframe)
    }

    /**
     * 回退页面
     * @author  韦胜健
     * @date    2019/3/6 11:41
     * @param   num             回退的页面的个数，默认回退一个页面
     */
    async back(num = 1) {
        if (!!this.tab) return await this.tab.back(num)
    }

    /**
     * 某个页签内弹出所有页面
     * @author  韦胜健
     * @date    2019/2/27 15:40
     */
    async backoff() {
        if (!!this.tab) return await this.tab.backoff()
    }


    /*---------------------------------------事件-------------------------------------------*/
    /**
     * 监听事件
     * @author  韦胜健
     * @date    2019/3/19 18:50
     * @param   event       监听事件的名称
     * @param   callback    派发事件时的回调动作
     */
    $on(event, callback) {
        this.page.on(event, callback)
    }

    /**
     * 只监听一次事件
     * @author  韦胜健
     * @date    2019/3/19 18:51
     * @param   event       监听事件的名称
     * @param   callback    派发事件时的回调动作
     */
    $once(event, callback) {
        this.page.once(event, callback)
    }

    /**
     * 移除事件
     * @author  韦胜健
     * @date    2019/3/19 18:51
     * @param   event       监听事件的名称
     * @param   callback    派发事件时的回调动作
     */
    $off(event, callback) {
        this.page.off(event, callback)
    }

    /**
     * 派发事件
     * @author  韦胜健
     * @date    2019/3/19 18:51
     * @param   event       派发事件的名称
     * @param   param       派发事件传递的参数
     * @param   global      是否为全局事件，是则所有页签内注册event事件的页面都可以监听，否则只有同页签内注册事件的页面才能监听event事件
     */
    $emit(event, param, global = false) {
        if (global) {this.main.emit(event, param)}
        else {this.page.emit(event, param)}
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