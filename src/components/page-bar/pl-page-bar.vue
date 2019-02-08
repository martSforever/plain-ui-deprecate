<template>
    <div class="pl-page-bar">
        <pl-select
                class="pl-page-bar-select"
                :data="sizeData"
                v-model="p_size"
                :box-size="boxSize"
                :input-width="80"/>
        <div class="pl-page-bar-operation">
            <pl-icon icon="pl-arrow-left-light" class="pl-page-bar-operate-icon"/>
            <div class="pl-page-bar-operate-num-wrapper">
                <div v-for="(item,index) in pages" :key="index"
                     class="pl-page-bar-operate-num"
                     :class="{'pl-page-bar-operate-num-active':item === p_page}"
                     @click="p_clickPage(item)">
                    {{item}}
                </div>
            </div>
            <pl-icon icon="pl-arrow-right-light" class="pl-page-bar-operate-icon"/>
            <pl-icon icon="pl-refresh" class="pl-page-bar-operate-icon pl-page-bar-operate-refresh-icon"/>
        </div>

        <div class="pl-page-bar-jump-wrapper">
            <span>前往</span>
            <pl-input :width="40" v-model="page" :placeholder="null" class="pl-page-bar-jump-input" :clear-icon="null"/>
            <span>页</span>
        </div>
    </div>
</template>

<script>
    import PlSelect from "../select/pl-select";
    import PlIcon from "../icon/pl-icon";
    import PlInput from "../input/pl-input";

    export default {
        name: "pl-page-bar",
        components: {PlInput, PlIcon, PlSelect},
        props: {
            size: {type: Number, default: 10},
            page: {type: Number, default: 1},
            total: {type: Number, default: 0},
            sizeData: {type: Array, default: () => [10, 20, 50]},
            availablePage: {type: Number, default: 3},

            boxSize: {type: String, default: 'default'},
        },
        data() {
            return {
                p_size: this.size || this.sizeData[0],
                p_page: this.page,
            }
        },
        computed: {
            totalPage() {
                return Math.ceil(this.total / this.size);
            },
            pages() {
                if (!this.size) return [0];
                const ret = []

                let begin = this.page - this.availablePage
                let end = this.page + this.availablePage
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
        },
        methods: {
            p_clickPage(page) {

            },
        }
    }
</script>

<style lang="scss">
    .pl-page-bar {
        @include public-style;
        display: inline-flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        .pl-page-bar-operation {
            padding: 0 2em;
            display: flex;
            align-items: center;
            .pl-page-bar-operate-num-wrapper {
                display: flex;
                align-items: center;
                padding: 0 1em;
                .pl-page-bar-operate-num {
                    width: 30px;
                    text-align: center;
                }
            }
        }
        .pl-page-bar-operate-icon, .pl-page-bar-operate-num {
            cursor: pointer;
            color: $color-info;
            &:hover {
                color: $color-primary;
            }
            &.pl-page-bar-operate-num-active {
                color: $color-primary;
            }
            &.pl-page-bar-operate-refresh-icon {
                margin-left: 2em;
            }
        }

        .pl-page-bar-jump-wrapper {
            .pl-page-bar-jump-input {
                .pl-input-el {
                    text-align: center;
                }
            }
        }
    }
</style>