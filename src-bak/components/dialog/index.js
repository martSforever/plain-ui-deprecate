import PlDialog from './pl-dialog'
import PlRenderFunc from '../render/pl-render-func'
import PlInput from '../input/pl-input'
import PlTextarea from '../textarea/pl-textarea'
import $utils from 'src/scripts/utils'

const DEFAULT_OPTION = {
    type: 'info',
    title: '提示',
    shape: 'none',
    shadowColor: 'rgba(0,0,0,0.25)',
    disabledHideOnClickShadow: false,
    transition: 'pl-dialog-animate-drop',
    height: null,
    minHeight: null,
    maxHeight: '600px',
    width: null,
    minWidth: null,
    maxWidth: null,
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
    footAlign: 'right',

    onConfirm: null,
    onCancel: null,
    render: null,
    content: null,
    contentReadonly: false,
    input: false,
    textarea: false,
}

class DialogService {
    Vue;
    insList = [];

    get instance() {
        let ins;
        for (let i = 0; i < this.insList.length; i++) {
            const item = this.insList[i];
            if (!item.p_show) ins = item
        }
        if (!ins) {
            ins = this.newInstance()
        }
        this.insList.push(ins)
        return ins
    }

    constructor(Vue) {
        this.Vue = Vue
    }

    newInstance() {
        const instance = new this.Vue({
            components: {PlDialog, PlRenderFunc, PlInput, PlTextarea},
            render(h) {
                return (
                    <pl-dialog
                        class="pl-dialog-service"
                        ref="dialog"
                        type={this.type}
                        title={this.title}
                        shape={this.shape}
                        shadowColor={this.shadowColor}
                        disabledHideOnClickShadow={this.disabledHideOnClickShadow}
                        transition={this.transition}
                        height={this.height}
                        width={this.width}
                        minHeight={this.minHeight}
                        minWidth={this.minWidth}
                        maxHeight={this.maxHeight}
                        maxWidth={this.maxWidth}
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
                        footAlign={this.footAlign}

                        onConfirm={e => {
                            !!this.onConfirm && this.onConfirm({content: this.content});
                        }}
                        onCancel={e => {
                            !!this.onCancel && this.onCancel()
                        }}
                        onInput={val => this.p_show = val}
                    >
                        <span>{this.message}</span>
                        {
                            (!!this.input || this.textarea) && <div class="pl-dialog-service-center">
                                {!!this.input && <pl-input value={this.content} onInput={val => this.content = val} long readonly={this.contentReadonly}/>}
                                {!!this.textarea && <pl-textarea value={this.content} onInput={val => this.content = val} readonly={this.contentReadonly}/>}
                            </div>
                        }
                        {!!this.render && <pl-render-func render-func={this.render}/>}
                    </pl-dialog>
                )
            },
            data() {
                return {
                    p_show: null,
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
            ...this.Vue.prototype._plRootOptionData
        }).$mount()
        document.body.appendChild(instance.$el)
        return instance;
    }

    show(message, option) {
        let msg, opt;
        const firstArgType = $utils.typeOf(message)
        switch (firstArgType) {
            case 'string':
                msg = message
                opt = option
                break;
            case 'object':
                msg = message.message
                opt = message
                break
        }
        Object.assign(this.instance, DEFAULT_OPTION, opt)
        this.instance.message = msg
        this.instance.show()
    }
}

export {
    DialogService
}
