<template>
    <div class="pl-column-edit-item" @click="$emit('click',{row,editRow,rowIndex,field,editable:p_editable})">
        <pl-scope-slot :scope-slot-func="scopeSlotFunc" :data="{row,rowIndex,editRow,field,editable}" v-if="!!scopeSlotFunc"/>
        <pl-column-text v-else
                        :align="align"
                        :link="link"
                        :row="showRow"
                        :row-index="rowIndex"
                        :field="field"
                        :editable="p_editable"
                        :data-type="dataType"
                        :tooltip="tooltip"/>
    </div>
</template>

<script>
    import {ColumnItemMixin} from "../mixins";
    import PlColumnText from "../pl-column-text";
    import PlScopeSlot from "../../render/pl-scope-slot";

    export default {
        name: "pl-column-item",
        components: {PlScopeSlot, PlColumnText},
        mixins: [ColumnItemMixin]
    }
</script>
