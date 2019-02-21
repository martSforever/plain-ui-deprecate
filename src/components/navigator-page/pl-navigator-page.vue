<template>
    <div class="pl-navigator-page">
        <div class="pl-navigator-page-content">
            <div class="pl-navigator-page-item">
                <slot></slot>
            </div>
            <component v-for="(page,index) in pageStack"
                       class="pl-navigator-page-item"
                       :key="page.id"
                       :param="page.param || {}"
                       :is="page.component"
                       v-if="index===pageStack.length-1"
                       v-show="index === pageStack.length-1"/>
        </div>
    </div>
</template>

<script>

    const STORAGE_KEY = 'navigator-page';

    export default {
        name: "pl-navigator-page",
        props: {
            id: {},
        },
        data() {

            let pageStack = []
            let tabsStorage, selfStorage;

            if (!!this.id) {
                tabsStorage = this.$plain.$storage.get(STORAGE_KEY) || {}
                selfStorage = tabsStorage[this.id] || {}
                if (!!selfStorage.pageStack && selfStorage.pageStack.length > 0) {
                    pageStack = selfStorage.pageStack.map((item) => Object.assign({id: this.$plain.$utils.uuid()}, item))
                }
            }

            return {
                pageStack,
                tabsStorage,
                selfStorage,
            }
        },
        created() {
            if (this.pageStack.length > 0) {
                const {path, param} = this.pageStack.pop()
                this.push(path, param)
            }
        },
        methods: {
            async push(path, param) {
                const component = await this.$plain.pageRegistry(path)
                this.pageStack.push({
                    id: this.$plain.$utils.uuid(),
                    path,
                    param,
                    component
                })
                this.p_save()
            },
            async back() {
                this.pageStack.pop()
                this.p_save()
            },
            p_save() {
                if (!this.id) return
                this.selfStorage.pageStack = this.pageStack.map(({path, param}) => ({path, param}))
                this.tabsStorage[this.id] = this.selfStorage
                this.$plain.$storage.set(STORAGE_KEY, this.tabsStorage)
            },
        }

    }
</script>

<style lang="scss">
    .pl-navigator-page {
        @include public-style;
        &, & .pl-navigator-page-content {
            height: 100%;
            width: 100%;
        }
        .pl-navigator-page-content {
            position: relative;
            .pl-navigator-page-item {
                top: 0;
                left: 0;
                position: absolute;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: white;
                padding: 12px;
                box-sizing: border-box;
            }
        }
    }
</style>