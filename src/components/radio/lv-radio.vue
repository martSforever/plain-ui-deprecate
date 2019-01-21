<template>
    <div class="lv-radio"
         @click="lv_click"
         :class="classes"
         :style="styles">
        <lv-icon :icon="lv_activeIcon" class="lv-radio-icon-active"/>
        <lv-icon :icon="lv_inactiveIcon" class="lv-radio-icon-inactive"/>
        <span v-if="!!label">{{label}}</span>
    </div>
</template>

<script>
    import LvIcon from "../icon/lv-icon";

    export default {
        name: "lv-radio",
        components: {LvIcon},
        props: {
            value: {},                                          //当前值
            id: {},                                             //当前id，只有与radioGroup一起使用才有效
            color: {type: String,},                             //颜色：primary|success|warn|error|info
            size: {type: String,},                              //大小：large|default|small
            label: {type: String},                              //文本
            disabled: {type: Boolean,},                         //是否禁用
            readonly: {type: Boolean},                          //是否只读
            activeIcon: {type: String,},                        //激活的时候的图标
            inactiveIcon: {type: String,},                      //未激活的时候的秃笔哦啊
            activeColor: {type: String,},                       //激活的时候的颜色
            inactiveColor: {type: String},                      //未激活的时候的颜色
            trueValue: {default: true},                         //激活的时候的实际值
            falseValue: {default: false},                       //未激活的时候的实际值
        },
        data() {
            return {
                lv_group: null,
                currentValue: this.value,
            }
        },
        watch: {
            value(val) {
                const v = !!this.currentValue ? this.trueValue : this.falseValue
                val !== v && (this.currentValue = val === this.trueValue)
            },
            currentValue(val) {
                this.$emit('input', !!val ? this.trueValue : this.falseValue)
            },
        },
        computed: {
            lv_size() {
                return !!this.size ? this.size : (!!this.lv_group && !!this.lv_group.size) ? this.lv_group.size : 'default';
            },
            lv_color() {
                return !!this.color ? this.color : (!!this.lv_group && !!this.lv_group.color) ? this.lv_group.color : 'primary';
            },
            lv_activeIcon() {
                return !this.lv_group ? !!this.activeIcon ? this.activeIcon : 'lv-check-square' : !!this.lv_group.activeIcon ? this.lv_group.activeIcon : !!this.lv_group.multiple ? 'lv-check-square' : 'lv-radio-on'
            },
            lv_inactiveIcon() {
                return !this.lv_group ? !!this.inactiveIcon ? this.inactiveIcon : 'lv-square' : !!this.lv_group.inactiveIcon ? this.lv_group.inactiveIcon : !!this.lv_group.multiple ? 'lv-square' : 'lv-radio-off'
            },
            lv_activeColor() {
                return !!this.activeColor ? this.activeColor : (!!this.lv_group && !!this.lv_group.activeColor) ? this.lv_group.activeColor : 'primary';
            },
            lv_inactiveColor() {
                return !!this.inactiveColor ? this.inactiveColor : (!!this.lv_group && !!this.lv_group.inactiveColor) ? this.lv_group.inactiveColor : 'primary';
            },
            classes() {
                return [
                    `lv-radio-${!!this.currentValue ? 'active' : 'inactive'}`,
                    `lv-radio-color-${!!this.disabled ? 'disabled' : this.lv_color}`,
                    `lv-radio-size-${this.lv_size}`,
                ]
            },
            styles() {
                let styles = {};
                !!this.lv_activeColor && (!!this.currentValue) && (styles.color = `${this.lv_activeColor} !important`);
                !!this.lv_inactiveColor && (!this.currentValue) && (styles.color = `${this.lv_inactiveColor} !important`);
                return styles;
            },
        },
        mounted() {
            this.lv_group = this.$plain.$dom.findComponentUpward(this, 'lv-radio-group');
            if (!!this.lv_group) {
                this.lv_group.lv_addRadio(this)
                if (this.lv_group.multiple) {
                    if (!this.id) {
                        console.error(`radio must have id when radio-lv_group's multiple is true!`);
                        return;
                    }
                    this.currentValue = this.$plain.$utils.oneOf(this.id, this.lv_group.multipleValue);
                } else {
                    this.currentValue = this.lv_group.singleValue === this.id;
                }
            }
        },
        beforeDestroy() {
            !!this.lv_group && (this.lv_group.lv_removeRadio(this))
        },
        methods: {
            lv_click(e) {
                if (!!this.disabled || !!this.readonly) return;
                this.currentValue = !this.currentValue;
                this.$emit('click', e);
                this.$emit('change', this.currentValue);
                if (!!this.lv_group) {
                    if (!this.lv_group.multiple) {
                        this.lv_group.lv_radios.forEach(radio => radio !== this && (radio.currentValue = false))
                        this.lv_group.singleValue = !!this.currentValue ? this.id : null;
                    } else {
                        if (!!this.currentValue) this.lv_group.multipleValue.push(this.id);
                        else this.$plain.$utils.removeFromArray(this.lv_group.multipleValue, this.id);
                    }
                }
            },
        }
    }
</script>

<style lang="scss">
    .lv-radio {
        @include public-style;
        min-width: $icon-size;
        height: $icon-size;
        position: relative;
        cursor: pointer;
        user-select: none;
        padding-left: $icon-size;
        display: inline-flex;
        align-items: center;
        .lv-icon {
            position: absolute;
            left: 0;
            top: 0;
            @include transition-all;
        }
        &.lv-radio-active {
            .lv-radio-icon-active {
                transform: scale(1);
            }
            .lv-radio-icon-inactive {
                transform: scale(0.5);
                opacity: 0;
            }
        }
        &.lv-radio-inactive {
            .lv-radio-icon-active {
                transform: scale(0.5);
                opacity: 0;
            }
            .lv-radio-icon-inactive {
                transform: scale(1);
            }
        }

        @each $key, $value in $list-color {
            &.lv-radio-color-#{$key} {
                color: $value;
                &:active {
                    color: mix(#000, $value, 30%);
                }
            }
        }
        @each $key, $value in $list-size {
            &.lv-radio-size-#{$key} {
                font-size: $value/1.7;
            }
        }

        &.lv-radio-color-disabled {
            cursor: not-allowed;
        }

    }
</style>