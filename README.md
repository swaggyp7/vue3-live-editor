**#** **vue3-live-editor**

使用 Vue3 语法在线编辑运行

### 功能不完善且不稳定，仅供学习参考！！

当前仅支持 vue3 defineComponent options 写法

例：

```js
import { defineComponent } from "vue";

const MyComponent = defineComponent({
  data() {
    return { count: 1 };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
});
```

后续更新 setup function 的支持
