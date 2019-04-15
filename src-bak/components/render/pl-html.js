export default {
    name: "pl-html",
    props: {
        html: {},
        data: {},
    },
    render(h) {
        const component = this.$plain.Vue.extend({
            template: `<div class="pl-html">${this.html}</div>`,
            props: (Object.keys((this.data || {})) || []).reduce((ret, key) => {
                ret[key] = {}
                return ret
            }, {}),
        })
        return h(component, {props: {...this.data}})
    },
}
