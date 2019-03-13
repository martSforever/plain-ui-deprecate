export default {
    name: 'demo-block-item',
    props: {
        html: {},
        js: {},
        css: {},
    },
    render(h) {
        const ret = {template: `<div class="demo-block-item">${this.html}</div>`,}
        const component = this.$plain.Vue.extend(ret)
        return h(component)
    },
}