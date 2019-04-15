<template>
    <div class="pl-page-bar">
        <div class="pl-page-bar-left">
            <pl-select
                    class="pl-page-bar-select"
                    :data="p_sizeData"
                    label-key="label"
                    value-key="value"
                    v-model="p_size"
                    :box-size="boxSize"
                    :clearable="false"
                    :input-width="100"
                    :height="120"/>
            <div class="pl-page-bar-operation">
                <pl-icon icon="pad-left" class="pl-page-bar-operate-icon"/>
                <div class="pl-page-bar-operate-num-wrapper">
                    <template v-if="p_page-availablePage-1>0">
                        <div class="pl-page-bar-operate-num" @click="p_clickPage(1)">1</div>
                        <pl-icon icon="pl-more-solid"/>
                    </template>
                    <div v-for="(item,index) in pages" :key="index"
                         class="pl-page-bar-operate-num"
                         :class="{'pl-page-bar-operate-num-active':item === p_page}"
                         @click="p_clickPage(item)">
                        {{item}}
                    </div>
                    <template v-if="p_page+availablePage+1<=totalPage">
                        <pl-icon icon="pl-more-solid"/>
                        <div class="pl-page-bar-operate-num" @click="p_clickPage(totalPage)">{{totalPage}}</div>
                    </template>
                </div>
                <pl-icon icon="pad-right" class="pl-page-bar-operate-icon"/>
                <pl-icon icon="pl-refresh" class="pl-page-bar-operate-icon pl-page-bar-operate-refresh-icon" :loading="loading"/>
            </div>

            <div class="pl-page-bar-jump-wrapper">
                <span>前往</span>
                <pl-input :width="40" :value="p_page" :placeholder="null" class="pl-page-bar-jump-input" :clear-icon="null"/>
                <span>页</span>
            </div>
        </div>

        <div class="pl-page-bar-right">
            <pl-box box-type="none">
                当前显示:{{(p_page-1)*p_size+1}}-{{(p_page)*p_size}}，总共{{total}}条记录
            </pl-box>
        </div>
    </div>
</template>

<script>
    import PlSelect from "../select/pl-select";
    import PlIcon from "../icon/pl-icon";
    import PlInput from "../input/pl-input";
    import PlBox from "../box/pl-box";

    export default {
        name: "pl-page-bar",
        components: {PlBox, PlInput, PlIcon, PlSelect},
        props: {
            size: {type: Number, default: 10},
            page: {type: Number, default: 1},
            total: {type: Number, default: 0},
            sizeData: {type: Array, default: () => [10, 20, 50]},
            availablePage: {type: Number, default: 3},
            loading: {type: Boolean},

            boxSize: {type: String, default: 'default'},
        },
        data() {
            return {
                p_size: this.size || this.sizeData[0],
                p_page: this.page,
            }
        },
        watch: {
            size(val) {
                if (this.p_size !== val) this.p_size = val
            },
            p_size(val) {
                this.$emit('update:size', val)
            },
            page(val) {
                if (this.p_page !== val) this.p_page = val
            },
            p_page(val) {
                this.$emit('update:page', val)
            },
        },
        computed: {
            totalPage() {
                return Math.ceil(this.total / this.p_size);
            },
            pages() {
                if (!this.p_size) return [];
                const ret = []

                let begin = this.p_page - this.availablePage
                let end = this.p_page + this.availablePage
                if (begin < 1) {
                    end += (1 - begin + 1)
                    begin = 1
                }
                if (end > this.totalPage) {
                    end = this.totalPage
                }
                this.begin = begin
                this.end = end

                while (begin <= end) {
                    ret.push(begin)
                    begin++
                }

                return ret
            },
            p_sizeData() {
                return this.sizeData.map(item => ({
                    label: `${item}条/页`,
                    value: item
                }))
            },
        },
        methods: {
            p_clickPage(page) {
                this.p_page = page
            },
        }
    }
</script>