<template>
    <div class="pl-column-text" :class="[`pl-column-text-${align}`,{'pl-column-text-link':link}]" v-tooltip="{content:showValue,tooltip}">
        <slot :row="row" :rowIndex="rowIndex" :align="align" :field="field" :editable="editable">
            <span class="pl-column-text-default-text">{{label!=null?label:showValue}}</span>
        </slot>
    </div>
</template>

<script>
    import tooltip from '../../directives/tooltip'

    export default {
        name: "pl-column-text",
        directives: {tooltip},
        props: {
            align: {type: String, default: 'left'},                     //内容对其方式
            row: {},                                                    //数据行对象
            rowIndex: {},                                               //数据行索引
            field: {},                                                  //列绑定字段
            editable: {},                                               //当前是否可编辑
            label: {},                                                  //显示的文本，当改值存在时，不显示默认的字段绑定文本
            dataType: {type: String},                                   //数据格式化方式:tel,cny,money,percent
            tooltip: {type: Boolean},                                   //是否tooltip显示文本
            link: {type: Boolean},                                      //是否以超链接的形式展示文本，并且点击的时候回派发事件
        },
        computed: {
            showValue() {
                if (this.label != null) return this.label
                const text = !!this.row ? this.row[this.field] : null
                if (text == null) return null
                if (this.dataType == null) return text
                let data;
                switch (this.dataType) {
                    case 'tel':
                        data = this.$plain.$utils.telFormat(text);
                        break;
                    case 'cny':
                        data = this.$plain.$utils.cnyFormat(text);
                        break;
                    case 'money':
                        data = this.$plain.$utils.moneyFormat(text);
                        break;
                    case 'percent':
                        data = this.$plain.$utils.percentNumFormat(text);
                        break;
                }
                return data || text;
            },
        },
    }
</script>

<style lang="scss">
    .pl-column-text {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow-x: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
        outline: none;
        &.pl-column-text-link {
            color: $color-primary;
            cursor: pointer;
        }
        &.pl-column-text-left {
            justify-content: flex-start;
            .pl-column-text-default-text {
                text-align: left;
            }
        }
        &.pl-column-text-center {
            justify-content: center;
            .pl-column-text-default-text {
                text-align: center;
            }
        }
        &.pl-column-text-right {
            justify-content: flex-end;
            .pl-column-text-default-text {
                text-align: right;
            }
        }
    }
</style>
