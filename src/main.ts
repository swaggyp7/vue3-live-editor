import * as Vue from "vue";
import App from "./App.vue";

Vue.createApp(App).mount("#app");

const _window: any = window;
// 首次加载将所有vue提供的方法绑定到全局
// 因为new Function()生成的函数只能够拿到全局和局部变量，不存在闭包
// 还是存在问题，修改数据视图不更新，应该是匿名函数作用域内的Vue实例与项目中的Vue实例不是同一个,或者说匿名函数中根本没有Vue实例
if (!_window.isImportVueFunction) {
  (() => {
    _window.isImportVueFunction = true;
    Object.entries(Vue).forEach(([key, value]) => {
      if (typeof value === "function") {
        _window[key] = value;
      }
    });
  })();
}
