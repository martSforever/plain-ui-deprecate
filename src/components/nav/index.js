const NAV_STORAGE_KEY = {
    TAB: 'nav-tab',
    PAGE: 'nav-page'
}

class Page {
    path = null;                //页面地址
    param = null;               //页面参数
    frame = false;              //页面是否为外部地址
    props = null;               //给页面绑定的参数

    id = null;                  //页面的id
    init = false;               //页面是否已经初始化
    component = null;           //页面组件

    constructor(page) {
        Object.assign(this, page)
    }

    saveData() {
        return {
            id: this.id,
            path: this.path,
            param: this.param,
            frame: this.frame,
            props: this.props,
        }
    }
}

class Nav {
    _pages;
    context;

}

export {
    NAV_STORAGE_KEY,
    Page,
}