<template>
    <keep-alive>
        <lv-input v-model="editRow[field]"
                  v-if="p_editable"

                  :required="p_required"
                  :rules="rules"
                  :valid-on-init="validOnInit"/>
        <template v-else>
            <lv-scope-slot :scope-slot-func="scopeSlotFunc" :data="{row,rowIndex,editRow,field,editable}" v-if="!!scopeSlotFunc"/>
            <lv-column-text v-else
                            :align="align"
                            :row="row"
                            :row-index="rowIndex"
                            :edit-row="editRow"
                            :field="field"
                            :editable="p_editable"
                            :data-type="dataType"
                            :tooltip="tooltip"/>
        </template>
    </keep-alive>
</template>

<script>
    import {ColumnItemMixin} from "../mixins";
    import LvColumnText from "../lv-column-text";
    import LvInput from "../../input/lv-input";
    import LvScopeSlot from "../../render/lv-scope-slot";

    export default {
        name: "lv-column-input-item",
        components: {LvScopeSlot, LvInput, LvColumnText},
        mixins: [ColumnItemMixin]
    }
</script>