### 基本用法
```html
<link-button label="基本用法"/>
<link-button label="基本用法"/>
<link-button label="基本用法"/>
```
```js
export default{
    methods: {
        _click() {
            console.log("click");
        },
    }
}
```
```scss
.demo-button {
    .link-button {
        background-color: white;
    }
}
```
---
### 颜色
```html
<link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index"/>
```
```js
export default{
    data(){
        return{
            colors:['primary','success','warn','error','info']
        }
    },
    methods: {
        _click() {
            console.log("color");
        },
    }
}
```
```css
.demo-test-block {
}
```

