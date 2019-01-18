<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## 描述

[Nest](https://github.com/nestjs/nest)的cli

## 应用结构

- 入口

  * `main.ts`：引入配置，启动主程序，引入各种全局服务
  * `app.module.ts`：主程序根模块，负责各业务模块的聚合
  * `app.controller.ts`：主程序根控制器
  * `app.config.ts`：主程序配置，数据库、程序、第三方，一切可配置项
  * `app.environment.ts：`全局环境变量

- 请求处理流程

  1. `request`：收到请求
  2. `middleware`：中间件过滤（跨域、来源校验等处理）
  3. `guard`：守卫过滤（鉴权）
  4. `interceptor:before`：数据流拦截器（本应用为空，即：无处理）
  5. `pipe`：参数提取（校验）器
  6. `controller`：业务控制器
  7. `service`：业务服务
  8. `interceptor:after`：数据流拦截器（格式化数据、错误）
  9. `filter`：捕获以上所有流程中出现的异常，如果任何一个环节抛出异常，则返回错误

- 鉴权处理流程
  1. `guard`：守卫 分析请求
  2. `guard.canActivate`：继承处理
  3. `JwtStrategy.validate`：调用鉴权服务

- 鉴权级别
  * 任何敏感高级操作（CUD）都会校验必须的 Token

- 守卫 guard
  * 关键敏感信息请求会使用Role守卫鉴权

- 中间件 middlewares
  * Logger 中间件，用于打印请求

## 安装依赖

```bash
$ npm install
```

## 启动项目

```bash
# 开发环境
$ npm run start

# 观察模式
$ npm run start:dev

# webpack构建
$ npm run webpack
$ npm run start:hmr

# 生产环境
$ npm run start:prod
```

## 测试

```bash
# 单元测试
$ npm run test

# e2e测试
$ npm run test:e2e

# 测试覆盖
$ npm run test:cov
```

## License

  Nest is [MIT licensed](LICENSE).
