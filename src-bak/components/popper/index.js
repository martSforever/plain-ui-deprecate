const POPOVER_TRIGGER = {
    CLICK: 'click',
    HOVER: 'hover',
}
const POPOVER_DIRECTION = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
}
const POPOVER_ALIGN = {
    START: 'start',
    CENTER: 'center',
    END: 'end',
}

const PopoverMixin = {
    props: {
        trigger: {type: String, default: POPOVER_TRIGGER.CLICK},                //触发的动作：hover|click
        disabledHideOnClickOutside: {type: Boolean},                            //禁用点击外部的时候关闭弹出框
        disabledDestroyOnHide: {type: Boolean},                                 //禁用隐藏的时候销毁内容
        disabledToggleOnClickReference: {type: Boolean},                        //点击目标的时候，切换隐藏|显示状态
        initialized: {type: Boolean},                                           //是否在初始化的时候就初始化内容
        direction: {type: String, default: POPOVER_DIRECTION.BOTTOM},           //弹出框的方向：top|bottom|left|right
        align: {type: String, default: POPOVER_ALIGN.START},                    //弹出框的对其方式
        animate: {type: String, default: 'drop'},                               //弹出框显隐动画
        arrow: {type: Boolean},                                                 //弹出框是否带小三角
        offset: {type: Number},                                                 //弹出框与载体的距离
        height: {default: 180},                                                 //弹出框的高度
        width: {default: 180},                                                  //弹出框的宽度
        disabledEqual: {type: Boolean},                                         //弹出框是否与载体在方向上大小相同
        windowBoundary: {type: Boolean, default: true},                         //边界为window
        disabled: {type: Boolean},                                              //是否禁用
        beforeOpen: {type: Function},                                           //打开前置钩子
        beforeHide: {type: Function},                                            //打开后置钩子
    },
    computed: {
        popoverBinding() {
            return {
                trigger: this.trigger,
                disabledHideOnClickOutside: this.disabledHideOnClickOutside,
                disabledDestroyOnHide: this.disabledDestroyOnHide,
                disabledToggleOnClickReference: this.disabledToggleOnClickReference,
                initialized: this.initialized,
                direction: this.direction,
                align: this.align,
                animate: this.animate,
                arrow: this.arrow,
                offset: this.offset,
                height: this.height,
                width: this.width,
                disabledEqual: this.disabledEqual,
                windowBoundary: this.windowBoundary,
                disabled: this.disabled,
                beforeOpen: this.beforeOpen,
                beforeHide: this.beforeHide,
            }
        },
    }
}

export {
    PopoverMixin,
    POPOVER_TRIGGER,
    POPOVER_DIRECTION,
    POPOVER_ALIGN,
}