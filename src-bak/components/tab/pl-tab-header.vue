<template>
    <pl-list class="pl-tab-header" direction="top">
        <pl-item v-if="!data || data.length === 0" key="empty" class="pl-tab-header-item-active">
            <div class="pl-tab-header-item">
                <span>无</span>
            </div>
        </pl-item>
        <pl-item v-for="(item,index) in data"
                 :key="!!ids&&ids[index]?ids[index]:item"
                 :class="{'pl-tab-header-item-active':index === currentValue}">
            <div class="pl-tab-header-item"
                 @click="p_click(item,index)"
                 @contextmenu.prevent.stop="p_contextmenu(item,index)">
                <div class="pl-tab-header-item-content">
                    <div class="pl-tab-header-item-text">
                        <pl-tooltip-text :content="item" show-overflow-tooltip/>
                    </div>
                    <div class="pl-tab-header-item-close" @click.stop="p_close(item,index)" v-if="clearIcon">
                        <pl-icon icon="pad-close" hover/>
                    </div>
                </div>
            </div>
        </pl-item>
    </pl-list>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";
    import PlIcon from "../icon/pl-icon";
    import PlList from "../list/pl-list";
    import PlItem from "../list/pl-item";
    import PlTooltipText from "../tooltip/pl-tooltip-text";

    export default {
        name: "pl-tab-header",
        components: {PlTooltipText, PlItem, PlList, PlIcon},
        mixins: [ValueMixin],
        props: {
            value: {type: Number, default: 0},
            data: {type: Array, default: () => []},
            ids: {type: Array, default: () => []},
            clearIcon: {type: Boolean,},
        },
        methods: {
            p_click(item, index) {
                this.currentValue = index
                this.$emit('click', {item, index})
            },
            p_close(item, index) {
                this.$emit('close', {item, index})
            },
            p_contextmenu(item, index) {
                this.$emit('contextmenu', {item, index})
            },
        }
    }
</script>