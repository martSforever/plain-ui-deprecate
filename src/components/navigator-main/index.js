const NavigatorMixin = {
    data() {
        const that = this
        return {
            NAV: {
                _navigatorMain: null,
                _navigatorTab: null,
                get navigatorMain() {
                    if (!this._navigatorMain) {
                        this._navigatorMain = that.$plain.$dom.findComponentUpward(that, 'pl-navigator-main')
                    }
                    return this._navigatorMain
                },
                get navigatorTab() {
                    if (!this._navigatorTab) {
                        this._navigatorTab = that.$plain.$utils.findComponentUpward(that, 'pl-navigator-main-tab')
                    }
                    return this._navigatorTab
                },
            }
        }
    },
    methods: {
        $openTab(title, path, param) {
            !!this.NAV.navigatorMain && this.NAV.navigatorMain.open(title, path, param)
        },
        $openPage(path, param) {

        },
    }
}

export {
    NavigatorMixin
}