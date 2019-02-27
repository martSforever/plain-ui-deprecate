const NavigatorMixin = {
    data() {
        const that = this
        return {
            NAV: {
                /*当前组件所在的navigator-main组件实例*/
                _tab: null,
                /*当前组件所在的navigator-tab组件实例*/
                _page: null,
                get tab() {
                    return that.$plain.$tab
                },
                get page() {
                    if (!this._navigatorTab) {
                        this._navigatorTab = that.$plain.$utils.findComponentUpward(that, 'pl-navigator-main-page')
                    }
                    return this._navigatorTab
                },
            }
        }
    },
    methods: {
        $openTab(title, path, param) {
            !!this.NAV.tab && this.NAV.tab.open(title, path, param)
        },
        $pushPage(path, param) {

        },
    }
}

export {
    NavigatorMixin
}