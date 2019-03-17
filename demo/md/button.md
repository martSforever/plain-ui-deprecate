## Button按钮

**Plain 的按钮功能比较单一，主要是提供快速设置按钮样式的功能**

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


