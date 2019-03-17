## Button按钮

Plain 的按钮功能比较单一，主要是提供快速设置按钮样式的功能

:::block-start
:::setting-start
title:'按钮的基本用法'
collect:['desc'] 
nav:true
minHeight:200
:::setting-end

:::desc-start
默认情况下，可以通过label属性设置按钮文本，可以通过插槽设置文本内容，当设置插槽时，label属性将不可用
:::desc-end

```html
<link-button label="简单按钮1"/>
<link-button>
    <span>简单按钮2</span>
    <link-icon icon="pl-search"/>
</link-button>
```
```js
export default{
    data(){
        return {}
    },
}
```
```css
.demo-start{
    color:blue
}
```
:::block-end

:::block-start

:::setting-start
title:'按钮的颜色:color'
:::setting-end

```html
<link-button label="primary" box-color="primary"/>
<link-button label="success" box-color="success"/>
<link-button label="warn" box-color="warn"/>
<link-button label="error" box-color="error"/>
<link-button label="info" box-color="info"/>
```
```js
export default{
    data(){
        return {}
    },
}
```
:::block-end

:::block-start
:::setting-start
title:'加载状态的按钮:loading'
:::setting-end
```html
<link-button label="加载中" loading/>
```
```js
export default{
    data(){
        return {}
    },
}
```
:::block-end

:::block-start
:::setting-start
title:'左右图标:prefixIcon, suffixIcon'
:::setting-end
```html
<link-button label="搜索日期"  prefix-icon="pl-date" suffix-icon="pl-search"/>
```
```js
export default{
    data(){
        return {}
    },
}
```
:::block-end

:::block-start
:::setting-start
title:'只有图标:iconOnly'
:::setting-end
```html
<link-button label="primary" 
             prefix-icon="pl-search" 
             icon-only/>
```
:::block-end
:::block-start
:::setting-start
title:'禁用:disabled'
:::setting-end
```html
<div class="demo-button-disabled">
<link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" disabled/>
</div>
<div class="demo-button-disabled">
<link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index+10" disabled box-type="line"/>
</div>
<div class="demo-button-disabled">
<link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index+20" disabled box-type="none"/>
</div>
```
```js
export default{
    data(){
        return {
            colors:['primary','success','warn','error','info']
        }
    },
}
```
```css
.demo-button-disabled .pl-button{
    margin-right: 12px;
    margin-bottom: 12px;
}
```
:::block-end

:::block-start
:::setting-start
title:'只读:readonly'
:::setting-end
```html
<link-button label="只读" readonly @click="p_click"/>
<link-button label="不只读" @click="p_click"/>
```
```js
export default{
    methods:{
        p_click(){
            this.$message.show('click')
        },
    }
    
}
```
:::block-end

:::block-start
:::setting-start
title:'大小尺寸:boxSize'
:::setting-end
```html
<link-button label="large" boxSize="large"/>
<link-button label="default" boxSize="default"/>
<link-button label="small" boxSize="small"/>
```
:::block-end

:::block-start
:::setting-start
title:'大小形状:boxShape'
:::setting-end
```html
<link-button label="none" boxShape="none"/>
<link-button label="fillet" boxShape="fillet"/>
<link-button label="round" boxShape="round"/>
```
:::block-end

:::block-start
:::setting-start
title:'按钮类型:boxType'
minHeight:400
leftWidth:500
collect:['desc'] 
:::setting-end
:::desc-start
可以观察到，第一行类型为fill的按钮之间是有间隙的，但是下面几行没有，是因为第一行按钮之间有换行符，而下面几行按钮是使用
for循环渲染的，按钮之间没有换行符，所以没有间隙，这算是与按钮组之间比较显著的区别，在按钮组中，即使有换行符，按钮之间也不必出现间隙
:::desc-end
```html
<div>
    <link-button label="primary" box-color="primary" box-type="fill"/>
    <link-button label="success" box-color="success" box-type="fill"/>
    <link-button label="warn" box-color="warn" box-type="fill"/>
    <link-button label="error" box-color="error" box-type="fill"/>
    <link-button label="info" box-color="info" box-type="fill"/>
</div>
<div>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="line"/>
</div>
<div>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="none"/>
</div>
<div>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="dashed"/>
</div>
```
```js
export default{
    data(){
        return {
            colors:['primary','success','warn','error','info']
        }
    },
}
```
:::block-end

:::block-start
:::setting-start
title:'按钮组:buttonGroup'
leftWidth:400
:::setting-end
```html
<link-button-group>
    <link-button label="primary" box-color="primary" box-type="fill"/>
    <link-button label="success" box-color="success" box-type="fill"/>
    <link-button label="warn" box-color="warn" box-type="fill"/>
    <link-button label="error" box-color="error" box-type="fill"/>
    <link-button label="info" box-color="info" box-type="fill"/>
</link-button-group>
 <link-button-group>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="line"/>
</link-button-group>
 <link-button-group>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="none"/>
</link-button-group>
 <link-button-group>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="dashed"/>
</link-button-group>
```
```js
export default{
    data(){
        return {
            colors:['primary','success','warn','error','info']
        }
    },
}
```
:::block-end

:::block-start
:::setting-start
title:'纵向按钮组:buttonGroup'
leftWidth:400
:::setting-end
```html
<link-button-group vertical>
    <link-button label="primary" box-color="primary" box-type="fill"/>
    <link-button label="success" box-color="success" box-type="fill"/>
    <link-button label="warn" box-color="warn" box-type="fill"/>
    <link-button label="error" box-color="error" box-type="fill"/>
    <link-button label="info" box-color="info" box-type="fill"/>
</link-button-group>
 <link-button-group vertical>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="line"/>
</link-button-group>
 <link-button-group vertical>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="none"/>
</link-button-group>
 <link-button-group vertical>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="dashed"/>
</link-button-group>
```
```js
export default{
    data(){
        return {
            colors:['primary','success','warn','error','info']
        }
    },
}
```
:::block-end

:::block-start
:::setting-start
title:'按钮的激活状态:buttonGroup'
leftWidth:400
:::setting-end
```html
<link-button-group>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="fill" :active="item === current" @click="current = item"/>
</link-button-group>
<link-button-group>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="line" :active="item === current" @click="current = item"/>
</link-button-group>
<link-button-group>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="dashed" :active="item === current" @click="current = item"/>
</link-button-group>
<link-button-group>
    <link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index" box-type="none" :active="item === current" @click="current = item"/>
</link-button-group>
<link-button-group>
    <link-button v-for="(item,index) in colors" :label="item" :key="index" box-type="fill" :active="item === current"
                 @click="current = item"/>
</link-button-group>
```
```js
export default{
    data(){
        return {
            current:null,
            colors:['primary','success','warn','error','info']
        }
    },
}
```
:::block-end


| 一个普通标题 | 一个普通标题 | 一个普通标题 |
| ------ | ------ | ------ |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |

