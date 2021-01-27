# 请完成下面几道简答题

## 通过该项目,请简要说明 typescript 比 javascript 的优势在哪?
1. 在定义好`interface`接口或者是`type`类型后 `TypeScript` 有效的避免低级的拼写错误 
2. 在后续的业务开发时能快速的使用编辑器插件提供的`.`功能进行属性的使用
3. 更好的对全局的数据进行查看,避免重复定义数据类型

## 请简述一下支付流程
1. 触发提交流程
2. 传入 `支付宝接口`要求的必填参数
3. 传入 `服务器端`要求的必填业务参数
4. 输入账号密码等待支付宝完成支付并显示支付结果
5. 返回支付结果的`url`
6. 在项目中定义`alipay url` 对应的页面组件

## react-redux 的主要作用是什么,常用的 api 有哪些,什么作用?
1. 提供全局的 `Provider`,作为单一的状态管理
2. `useDispatch`: 触发 `action creator` 函数, 如果是异步`action`,执行`saga`里定义的函数,如果是同步直接触发`reducer`去更新状态
3. `useSelector`: 获取全局的状态`state`

## 4.redux 中的异步如何处理?
- 使用`sagaMiddleware`中间件, 根据业务需要创建不同的`saga`模块,在内部返回一个`generator`函数, 在函数内部使用`takeEvery`触发异步`action`,并执行相应的`handle function`, 一般情况下在`handle function`内部完成`api`的调用, 并使用`put`执行同步`action` 触发 `reducer`函数完成`state更新`