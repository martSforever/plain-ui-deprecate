<template>
    <div class="demo-scroll">
        <demo-row title="父元素大小固定，宽高为父容器大小，内容滚动">
            <div class="demo-scroll-wrapper">
                <link-scroll :scroll-x="true" :scroll-y="true">
                    <div class="demo-scroll-box">
                        <h3>Hello world!</h3>
                    </div>
                </link-scroll>
            </div>
        </demo-row>

        <demo-row title="父元素宽固定，内容横向可滚动，纵向内容自动增大">
            <div class="demo-scroll-wrapper" style="height: initial">
                <link-scroll :scroll-x="true" :scroll-y="false" fit-height>
                    <div class="demo-scroll-box">
                        <h3>Hello world!</h3>
                    </div>
                </link-scroll>
            </div>
        </demo-row>

        <demo-row title="父元素宽固定，内容宽度适应父元素">
            <div class="demo-scroll-wrapper">
                <link-scroll :scroll-x="false" :scroll-y="true" fit-host-width>
                    <div class="demo-scroll-box" style="width:  100%">
                        <h3>Hello world!</h3>
                    </div>
                </link-scroll>
            </div>
        </demo-row>

        <demo-row title="父元素高固定，内容纵向可滚动，横向内容自动增大">
            <div class="demo-scroll-wrapper" style="width: initial">
                <link-scroll :scroll-x="false" :scroll-y="true" fit-width>
                    <div class="demo-scroll-box">
                        <h3>Hello world!</h3>
                    </div>
                </link-scroll>
            </div>
        </demo-row>

        <demo-row title="父元素高固定，内容高度适应父元素">
            <div class="demo-scroll-wrapper">
                <link-scroll :scroll-x="true" :scroll-y="false" fit-host-height>
                    <div class="demo-scroll-box" style="height: 100%">
                        <h3>Hello world!</h3>
                    </div>
                </link-scroll>
            </div>
        </demo-row>

        <demo-row title="内容变化检测">
            <div class="demo-scroll-wrapper">
                <link-scroll :scroll-x="true" :scroll-y="true">
                    <div style="background-color: #7f8694">
                        <div class="demo-scroll-box-item" v-for="(item,index) in list" :key="index">{{item+1}}、测试</div>
                    </div>
                </link-scroll>
            </div>
            <demo-row-item title="操作按钮">
                <link-button @click="list.push(list.length)" label="add"/>
                <link-button @click="list.unshift()" label="remove"/>
            </demo-row-item>
        </demo-row>

    </div>
</template>

<script>
    export default {
        name: "demo-scroll",
        data() {
            return {
                list: []
            }
        },
        created() {
            let i = 0
            while (i < 10) {
                this.list.push(i)
                i++
            }
        },
    }
</script>

<style lang="scss">
    .demo-scroll {
        .demo-scroll-wrapper {
            background-color: #f2f2f2;
            width: 100px;
            height: 100px;
            display: inline-block;
        }
        .demo-scroll-box {
            display: inline-block;
            width: 200px;
            height: 200px;
            background-color: #7f8694;
        }
        .demo-scroll-box-item {
            background-color: #1076ca;
            color: white;
            height: 44px;
            line-height: 44px;
            margin-bottom: 12px;
        }
    }
</style>