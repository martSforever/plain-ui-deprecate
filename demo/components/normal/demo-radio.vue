<template>
    <div class="demo-radio">
        <!--<demo-row title="基本用法">
            <link-radio v-model="val1"/>
            <link-button @click="val1=!val1" label="button"/>
        </demo-row>
        <demo-row title="设置真假值">
            <link-button>val4:{{val4}}</link-button>
            <link-radio v-model="val4" true-value="Y" false-value="N"/>
        </demo-row>
        <demo-row title="颜色">
            <link-radio v-for="(color,index) in colors" :key="index" :color="color" v-model="val1"/>
        </demo-row>
        <demo-row title="大小">
            <demo-row-item title="large">
                <link-radio v-for="(color,index) in colors" :key="index" :color="color" v-model="val1" size="large"/>
            </demo-row-item>
            <demo-row-item title="default">
                <link-radio v-for="(color,index) in colors" :key="index" :color="color" v-model="val1" size="default"/>
            </demo-row-item>
            <demo-row-item title="small">
                <link-radio v-for="(color,index) in colors" :key="index" :color="color" v-model="val1" size="small"/>
            </demo-row-item>
        </demo-row>
        <demo-row title="设置文本">
            <link-radio v-for="(color,index) in colors" :key="index" :color="color" v-model="val1" :label="color"/>
        </demo-row>
        <demo-row title="禁用">
            <link-radio v-for="(color,index) in colors" :key="index" :color="color" v-model="val1" disabled/>
        </demo-row>
        <demo-row title="只读">
            <link-radio v-for="(color,index) in colors" :key="index" :color="color" v-model="val1" readonly/>
        </demo-row>
        <demo-row title="设置激活icon与未激活icon">
            <link-radio v-for="(color,index) in colors" :key="index" :color="color" v-model="val1" active-icon="pl-star-fill" inactive-icon="pl-star"/>
        </demo-row>
        <demo-row title="设置激活颜色与未激活颜色">
            <link-radio active-color="#7109AA" inactive-color="#009999"/>
        </demo-row>-->
        <demo-row title="组">
            <demo-row-item title="默认单选">
                <link-radio-group v-model="val2">
                    <link-radio v-for="(color,index) in colors" :key="index" :color="color" :id="color" :label="color"/>
                </link-radio-group>
                <link-button>val2:{{val2}}</link-button>
            </demo-row-item>
            <demo-row-item title="多选">
                <link-radio-group v-model="val3" multiple
                                  @select-all="$message.show('select-all')"
                                  @select-some="$message.show('select-some')"
                                  @select-none="$message.show('select-none')">
                    <link-radio v-for="(color,index) in colors" :key="index" :color="color" :id="color" :label="color"/>
                </link-radio-group>
                <link-button>val3:{{val3}}</link-button>
            </demo-row-item>
            <demo-row-item title="纵向多选">
                <link-radio-group v-model="val3" multiple vertical>
                    <link-radio v-for="(color,index) in colors" :key="index" :color="color" :id="color" :label="color"/>
                </link-radio-group>
                <link-button>val3:{{val3}}</link-button>
            </demo-row-item>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-radio",
        data() {
            return {
                colors: ['primary', 'success', 'warn', 'error', 'info'],
                val1: true,
                val2: 'error',
                val3: ['primary'],
                val4: 'Y',
            }
        },
        mounted() {
            console.log('demo radio mounted')
        },
        destroyed() {
            console.log('demo radio destroyed')
        },
    }
</script>

<style lang="scss">

</style>