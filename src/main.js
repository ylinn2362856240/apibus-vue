// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import apibus, { api, Register, G } from "apibus";
//打接口被调用log=>api调用前拦截
apibus.Req("user.getInfo", (promise, apiInfo) => {
  return promise.then(res => {
    console.log("拦截成功exec-> api name:", apiInfo.name, " value:", res);
    return res;
  });
});
//打接口返回值log=>api调用后拦截
apibus.Res("user.*", (promise, apiInfo) => {
  return promise
    .then(res => {
      console.log("拦截成功res -> api name: ", apiInfo.name, " value:", res);
    })
    .catch(err => {
      console.log("拦截成功err -> api name: ", apiInfo.name, " value:", err);
    });
});
apibus.Register("login", (name, password) => {
  if (name == "admin" && password == "admin") {
    return { scode: 0, data: { name: "zhangs" } };
  }

  return Promise.reject(false);
});
apibus.Register("user", {
  getInfo: () => {
    return true;
  },
  login: (name, password) => {
    if (name == "admin" && password == "admin") {
      return true;
    }
    return Promise.reject(false);
  }
});
apibus.Register("getUser", {
  _getSex: function(value) {
    if (value == 1) {
      return "shuaige";
    }
    if (value == 2) {
      return "meinv";
    }
    return "renyao";
  },
  getInfo: function(value) {
    return "nihao" + this._getSex(value);
  }
});
api
  .login("admin", "admin")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

api.user
  .getInfo()
  .then(res => {
    console.log("getInfo:" + res);
  })
  .catch(err => {
    console.log("getInfo:" + err);
  });
api.user
  .login("admin", "admin8")
  .then(res => {
    console.log("logon:" + res);
  })
  .catch(err => {
    console.log("login:" + err);
  });

/*api.getUser.getInfo(2).then(res => {
  console.log("getUser:" + res);
});*/
//赋值
apibus.SetGlobal("funDemo", () => {
  console.log("全局方法");
});
apibus.SetGlobal("str", "string");
apibus.SetGlobal("obj", { name: "zhangshan" });
//取值
apibus.G.funDemo(); // or G.funDemo()
console.log(apibus.G.str); //or G.str
console.log(G.obj);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
