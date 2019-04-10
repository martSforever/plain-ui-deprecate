<template>
    <div class="pl-cascade-option" :style="{width:`${cascadeWidth}px`}" v-if="!!data && data.length>0">
        <pl-scroll>
            <pl-cascade-option-item v-for="(item,index) in data"
                                    :key="item[valueKey]+index"

                                    :data="item"
                                    :label-key="labelKey"
                                    :children-key="childrenKey"
                                    :value-key="valueKey"
                                    :disabled-key="disabledKey"
                                    :current="current"
                                    :load-data-func="loadDataFunc"

                                    @click="component=>p_click(item,component)"/>
        </pl-scroll>
    </div>
</template>

<script>
    import PlScroll from "../scroll/pl-scroll";
    import PlIcon from "../icon/pl-icon";
    import PlCascadeOptionItem from "./pl-cascade-option-item";
    import {CascadeMixin} from "./index";

    export default {
        name: "pl-cascade-option",
        components: {PlCascadeOptionItem, PlIcon, PlScroll},
        mixins: [CascadeMixin],
        methods: {
            p_click(itemData, component) {
                if (!!this.disabledKey && !!itemData[this.disabledKey]) return
                this.$emit('select', itemData)
                if (!component.p_hasChildren) this.$emit('done', itemData)
            },
        },

    }
</script>