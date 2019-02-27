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
                    if (!this._page) {
                        this._page = that.$plain.$dom.findComponentUpward(that, 'pl-navigator-main-page')
                    }
                    return this._page
                },

                async openTab(title, path, param) {
                    if (!!this.tab) {
                        return this.tab.open(title, path, param)
                    }
                },
                async pushPage(path, param) {
                    if (!!this.page) {
                        return await this.page.push(path, param)
                    }
                },
                async back(num = 1) {
                    if (!!this.page) {
                        return await this.page.back(num)
                    }
                },
            }
        }
    },
    computed: {
        $nav() {
            return this.NAV
        },
    },
}

export {
    NavigatorMixin
}