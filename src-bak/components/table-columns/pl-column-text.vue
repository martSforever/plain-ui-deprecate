<template>
    <div class="pl-column-text" :class="[`pl-column-text-${align}`,{'pl-column-text-link':link}]">
        <slot :row="row" :rowIndex="rowIndex" :align="align" :field="field" :editable="editable">
            <div class="pl-column-text-default-text">
                <pl-tooltip-text :content="label!=null?label:showValue" v-if="tooltip" show-overflow-tooltip/>
                <span v-else>{{label!=null?label:showValue}}</span>
            </div>
        </slot>
    </div>
</template>

<script>
    import tooltip from '../../directives/tooltip'
    import PlTooltipText from "../tooltip/pl-tooltip-text";

    export default {
        name: "pl-column-text",
        components: {PlTooltipText},
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