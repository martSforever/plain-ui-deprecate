<template>
    <div class="demo-list">
        <demo-row title="基本用法：设置动画">
            <link-button-group>
                <link-button @click="add">add</link-button>
                <link-button @click="remove">remove</link-button>
                <link-button @click="shuffle">shuffle</link-button>
            </link-button-group>
            <link-button-group>
                <link-button @click="direction = 'top'" :active="direction === 'top'">top</link-button>
                <link-button @click="direction = 'left'" :active="direction === 'left'">left</link-button>
                <link-button @click="direction = 'right'" :active="direction === 'right'">right</link-button>
                <link-button @click="direction = 'bottom'" :active="direction === 'bottom'">bottom</link-button>
                <link-button @click="direction = 'top-left'" :active="direction === 'top-left'">top-left</link-button>
                <link-button @click="direction = 'top-right'" :active="direction === 'top-right'">top-right
                </link-button>
                <link-button @click="direction = 'bottom-left'" :active="direction === 'bottom-left'">bottom-left
                </link-button>
                <link-button @click="direction = 'bottom-right'" :active="direction === 'bottom-right'">bottom-right
                </link-button>
            </link-button-group>
        </demo-row>
        <demo-row>
            <link-list :direction="direction">
                <link-item v-for="(item,index) in cities" :key="item.name" class="test-item"
                           @click="handleClick(item,index)">{{item.name}}
                </link-item>
            </link-list>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-list",
        data() {
            return {
                direction: 'top',
                cities: [
                    {name: '广州市'},
                    {name: '上海市'},
                    {name: '北京市'},
                    {name: '深圳市'},
                    {name: '长沙市'},
                    {name: '南京市'},
                ]
            }
        },
        methods: {
            randomIndex: function () {
                return Math.floor(Math.random() * this.cities.length);
            },
            handleClick(item, index) {
                this.cities.splice(index, 1);
            },
            add() {
                this.cities.splice(this.randomIndex(), 0, {name: new Date().getTime()});
            },
            remove() {
                this.cities.splice(this.randomIndex(), 1);
            },
            shuffle() {
                this.cities = this.$plain.$utils.shuffle(this.cities);
            },
        }
    }
</script>

<style lang="scss">
    @include themeify {
        .test-item {
            height: 120px;
            width: 200px;
            margin-bottom: 12px;
            margin-right: 12px;
            border-radius: $p-shape-fillet;
            padding: 12px;
            color: white;
            background-color: $p-color-primary;
            display: inline-block !important;
        }
    }

</style>