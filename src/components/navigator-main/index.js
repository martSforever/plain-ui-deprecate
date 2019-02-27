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

                /**
                 * 打开新标签
                 * @author  韦胜健
                 * @date    2019/2/27 15:29
                 */
                async openTab(title, path, param) {
                    if (!!this.tab) {
                        return this.tab.open(title, path, param)
                    }
                },
                /**
                 * 在某个标签页下打开页面
                 * @author  韦胜健
                 * @date    2019/2/27 15:29
                 */
                async push(path, param) {
                    if (!!this.page) {
                        return await this.page.push(path, param)
                    }
                },
                /**
                 * 在某个标签页下关闭页面
                 * @author  韦胜健
                 * @date    2019/2/27 15:30
                 */
                async back(num = 1) {
                    if (!!this.page) {
                        return await this.page.back(num)
                    }
                },
                /**
                 * 某个页签内弹出所有页面
                 * @author  韦胜健
                 * @date    2019/2/27 15:40
                 */
                async backoff() {
                    if (!!this.page) {
                        return await this.page.backoff()
                    }
                },

                /**
                 * 某个标签页下重定向到页面
                 * @author  韦胜健
                 * @date    2019/2/27 15:30
                 */
                async redirect(path, param) {
                    this.page.redirect(path, param)
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