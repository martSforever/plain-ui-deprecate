import PlDialog from './pl-dialog'
import PlRenderFunc from '../render/pl-render-func'
import Vue from 'vue'

const DEFAULT_OPTION = {
    type: 'info',
    title: '提示',
    shape: 'none',
    shadowColor: 'rgba(0,0,0,0.25)',
    disabledHideOnClickShadow: false,
    transition: 'pl-dialog-animate-drop',
    height: 88,
    width: 336,
    full: false,
    confirmButton: false,
    cancelButton: false,
    noClose: false,
    dialogClass: null,
    vertical: null,
    horizontal: null,
    initialized: true,
    destroyOnHide: false,
    transferDom: false,
    max: false,
    noHeader: false,
    noFooter: false,
    noPadding: false,
    top: null,
    bottom: 0,
    left: 0,
    right: 0,

    onConfirm: null,
    onCancel: null,
    render: null,
}

const $dialog = {
    _ins: null,
    get instance() {
        if (!this._ins) {
            this._ins = this.newInstance()
        }
        return this._ins;
    },
    newInstance() {
        const instance = new Vue({
            components: {PlDialog, PlRenderFunc},
            render(h) {
                return (
                    <pl-dialog
                        ref="dialog"
                        type={this.type}
                        title={this.title}
                        shape={this.shape}
                        shadowColor={this.shadowColor}
                        disabledHideOnClickShadow={this.disabledHideOnClickShadow}
                        transition={this.transition}
                        height={this.height}
                        width={this.width}
                        full={this.full}
                        confirmButton={this.confirmButton}
                        cancelButton={this.cancelButton}
                        noClose={this.noClose}
                        dialogClass={this.dialogClass}
                        vertical={this.vertical}
                        horizontal={this.horizontal}
                        initialized={this.initialized}
                        destroyOnHide={this.destroyOnHide}
                        transferDom={this.transferDom}
                        noHeader={this.noHeader}
                        noFooter={this.noFooter}
                        noPadding={this.noPadding}
                        max={this.max}
                        top={this.top}
                        bottom={this.bottom}
                        left={this.left}
                        right={this.right}

                        onConfirm={e => {
                            !!this.onConfirm && this.onConfirm();
                            this.hide()
                        }}
                        onCancel={e => {
                            !!this.onCancel && this.onCancel()
                            this.hide()
                        }}
                    >
                        {this.message}
                        {!!this.render && <pl-render-func render-func={this.render}/>}
                    </pl-dialog>
                )
            },
            data() {
                return {
                    message: null,
                    ...DEFAULT_OPTION,
                }
            },
            methods: {
                show() {
                    this.$refs.dialog.show(arguments)
                },
                hide() {
                    this.$refs.dialog.hide(arguments)
                },
            },
        }).$mount()
        document.body.appendChild(instance.$el)
        return instance;
    },
    show(message, option) {
        Object.assign(this.instance, DEFAULT_OPTION, option)
        this.instance.message = message
        this.instance.show()
    },
}

export {
    $dialog
}
