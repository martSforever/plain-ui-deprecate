<template>
    <div class="pl-box" :class="classes" :style="{width:!!width&&!long&&!iconOnly?`${width}px`:null}"
         @click="e=>!readonly && !disabled && $emit('click',e)"
    >
        <pl-icon v-if="!!prefixIcon" :icon="prefixIcon" class="pl-box-prefix-icon"/>
        <div class="pl-box-content" v-if="!iconOnly">
            <slot></slot>
        </div>
        <template v-else>
            <pl-icon v-if="!!suffixIcon" :icon="suffixIcon" class="pl-box-suffix-icon"/>
            <pl-icon v-if="!!clearIcon && clearable" :hover="clearable&&hovering&&value!=null" :icon="clearable&&hovering&&value!=null&&value!='' ?'pad-close-circle-fill':clearIcon"
                     @click.stop.prevent="e=>clearable && $emit('clear',e)" class="pl-box-clear-icon"/>
        </template>
        <pl-loading v-if="!!loading" :type="loadingType" :color="loadingColor" class="pl-box-loading-icon"/>
        <div class="pl-box-tooltip" v-if="!!passValidMsg && passValidMsg!=='必填'">
            <span>{{passValidMsg}}</span>
        </div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";
    import {BoxMixin} from "../../mixin/component-mixin";
    import PlLoading from "../loading/pl-loading";

    export default {
        name: "pl-box",
        components: {PlLoading, PlIcon},
        mixins: [BoxMixin],
        watch: {
            value() {
                this.validate()
            },
            required() {
                this.validate()
            },
        },
        data() {
            return {
                passValid: null,
                passValidMsg: null,
                hovering: false,
            }
        },
        computed: {
            classes() {
                return [
                    {
                        'pl-box-icon-only': this.iconOnly,
                        'pl-box-readonly': this.readonly,
                        'pl-box-disabled': this.disabled,
                        'pl-box-padding': this.padding,
                        'pl-box-long': this.long,
                        'pl-box-invalid': this.passValid === false,
                        'pl-box-fix-width': this.width != null,
                    },
                    `pl-box-type-${this.boxType}`,
                    `pl-box-color-${this.boxColor}`,
                    `pl-box-shape-${this.boxShape}`,
                    `pl-box-size-${this.boxSize}`,
                ]
            },
            /*
             *  rules和required的结合校验规则数组
             *  @author     martsforever
             *  @datetime   2018/12/15 22:52
             */
            _rules() {
                let ret = []
                !!this.required && ret.push('required')
                !!this.rules && (ret = ret.concat(this.rules))
                return ret.length === 0 ? null : ret
            },
        },
        methods: {
            /*
             *  调用校验服务，触发校验规则
             *  @author     martsforever
             *  @datetime   2018/12/15 22:53
             */
            validate() {
                this.passValid = true
                this.passValidMsg = null
                if (!this._rules) return true;
                const result = this.$plain.$validate.validate(this.value, this._rules)
                if (!!result) {
                    this.passValid = false
                    this.passValidMsg = result.msg
                    return false
                } else {
                    this.passValid = true
                    this.passValidMsg = null
                    return true
                }
            },
            /*
             *  鼠标进入dom元素事件
             *  @author     martsforever
             *  @datetime   2018/12/15 22:53
             */
            _mouseenter() {
                this.hovering = true
                this.$emit('enter')
            },
            /*
             *  鼠标离开dom元素事件
             *  @author     martsforever
             *  @datetime   2018/12/15 22:53
             */
            _mouseleave() {
                this.hovering = false
                this.$emit('leave')
            },
        },
        created() {
            /*---------------------------------------初始化的时候校验-------------------------------------------*/
            !!this.validOnInit && !!this._rules && this.validate()
        },
        mounted() {
            /*---------------------------------------添加监听事件-------------------------------------------*/
            if (!!this.hover || !!this.clearIcon) {
                this.$el.addEventListener('mouseenter', this._mouseenter)
                this.$el.addEventListener('mouseleave', this._mouseleave)
            }
        },
        beforeDestroy() {
            /*---------------------------------------移除监听事件-------------------------------------------*/
            if (!!this.hover || !!this.clearIcon) {
                this.$el.removeEventListener('mouseenter', this._mouseenter)
                this.$el.removeEventListener('mouseleave', this._mouseleave)
            }
        },
    }
</script>