# 动态代理

tag: Java基础

## jdk 动态代理

jdk动态代理的步骤

1. 通过实现 InvocationHandler 接口创建自己的调用处理器；
2. 通过为 Proxy 类指定 ClassLoader 对象和一组 interface 来创建动态代理类；
3. 通过反射机制获得动态代理类的构造函数，其唯一参数类型是调用处理器接口类型；
4. 通过构造函数创建动态代理类实例，构造时调用处理器对象作为参数被传入。

## gclib动态代理

1. 调用代理类方法。
2. 代理类方法中触发拦截器方法。
3. 拦截器中触发MethodProxy.invokeSuper方法，并获取需要调用的代理类方法索引。
4. 执行Fast索引类方法，根据代理类方法索引，获得代理类方法。
5. 执行代理类中代理方法，通过super()方法完成真实逻辑调用。

[https://my.oschina.net/itblog/blog/4715745](https://my.oschina.net/itblog/blog/4715745)