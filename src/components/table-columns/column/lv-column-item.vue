<template>
    <lv-scope-slot :scope-slot-func="scopeSlotFunc" :data="{row,rowIndex,editRow,field,editable}" v-if="!!scopeSlotFunc"/>
    <lv-column-text v-else
                    :align="align"
                    :link="link"
                    :row="showRow"
                    :row-index="rowIndex"
                    :field="field"
                    :editable="lv_editable"
                    :data-type="dataType"
                    :tooltip="tooltip"/>
</template>

<script>
    import {ColumnItemMixin} from "../mixins";
    import LvColumnText from "../lv-column-text";
    import LvScopeSlot from "../../render/lv-scope-slot";

    export default {
        name: "lv-column-item",
        components: {LvScopeSlot, LvColumnText},
        mixins: [ColumnItemMixin]
    }
</script>
