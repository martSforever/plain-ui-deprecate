<template>
    <keep-alive>
        <pl-input v-model="editRow[field]"
                  v-if="p_editable"

                  :required="p_required"
                  :rules="rules"
                  :valid-on-init="validOnInit"/>
        <template v-else>
            <pl-scope-slot :scope-slot-func="scopeSlotFunc" :data="{row,rowIndex,editRow,field,editable}" v-if="!!scopeSlotFunc"/>
            <pl-column-text v-else
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
    import PlColumnText from "../pl-column-text";
    import PlInput from "../../input/pl-input";
    import PlScopeSlot from "../../render/pl-scope-slot";

    export default {
        name: "pl-column-input-item",
        components: {PlScopeSlot, PlInput, PlColumnText},
        mixins: [ColumnItemMixin]
    }
</script>