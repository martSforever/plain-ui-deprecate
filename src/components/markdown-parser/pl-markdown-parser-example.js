export default {
    name: 'pl-markdown-parser-example',
    props: {
        html: {},
        js: {},
        css: {},
    },
    render(h) {
        const ret = {template: `<div class="pl-markdown-parser-example">${this.html}</div>`,}
        if (!!this.js) Object.assign(ret, eval(`(${this.js.replace('export default', '')})`))
        if (!!this.css) {
            const style = document.createElement("style")
            style.innerHTML = this.css
            document.head.appendChild(style)
        }
        return h(this.$plain.Vue.extend(ret))
    },
}