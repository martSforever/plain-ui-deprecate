<template>
    <div class="lv-radio-group" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "lv-radio-group",
        props: {
            value: {},                                                          //当前绑定至，多选的话为数组
            size: {type: String, default: 'default'},                           //大小
            color: {type: String, default: 'primary'},                          //颜色
            activeIcon: {type: String,},                                        //激活的时候的图标
            inactiveIcon: {type: String,},                                      //未激活的时候的秃笔哦啊
            activeColor: {type: String,},                                       //激活的时候的颜色
            inactiveColor: {type: String,},                                     //未激活的时候的颜色
            disabled: {type: Boolean,},                                         //是否禁用
            readonly: {type: Boolean,},                                         //是否只读

            multiple: {type: Boolean},                                          //是否多选
            vertical: {type: Boolean},                                          //是否纵向
        },
        data() {
            return {
                singleValue: this.value,
                multipleValue: this.$lv.$utils.deepCopy(this.value) || [],
                lv_radios: [],
            };
        },
        watch: {
            value(val) {
                if (!!this.multiple) {
                    if (this.multipleValue !== val) this.multipleValue = this.$lv.$utils.deepCopy(val);
                } else {
                    if (this.singleValue !== val) this.singleValue = val;
                }
                this.updateRadios();
            },
            multipleValue(val) {
                if (JSON.stringify(val) !== JSON.stringify(this.value))
                    this.$emit('input', val);
            },
            singleValue(val) {
                this.$emit('input', val);
            },
        },
        computed: {
            classes() {
                return [
                    `lv-radio-group-${!!this.vertical ? 'vertical' : 'horizontal'}`
                ];
            },
        },
        methods: {
            lv_addRadio(radio) {
                this.lv_radios.push(radio);
            },
            lv_removeRadio(radio) {
                this.$lv.$utils.removeFromArray(this.lv_radios, radio);
            },
            updateRadios() {
                this.lv_radios.forEach(radio => {
                    if (!!this.multiple) {
                        radio.currentValue = this.$lv.$utils.oneOf(radio.id, this.multipleValue);
                    } else {
                        radio.currentValue = (radio.id === this.singleValue);
                    }
                });
            },
        },
        created() {
            if (!!this.multiple && !!this.value && this.$lv.$utils.typeOf(this.value) !== 'array') {
                console.error('[radio-group] value must be instance of array when multiple is true!');
            }
        },
    }
</script>

<style lang="scss">
    .lv-radio-group {
        @include public-style;
        display: inline-flex;
        &.lv-radio-group-horizontal {
            .link-radio:not(:last-child) {
                margin-right: 1em;
            }
        }
        &.lv-radio-group-vertical {
            flex-direction: column;
            .link-radio:not(:last-child) {
                margin-bottom: 1em;
            }
        }
    }
</style>