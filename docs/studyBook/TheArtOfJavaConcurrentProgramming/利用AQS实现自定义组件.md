# 利用AQS实现自定义组件

流程：

1. 在组件类实现Lock接口
2. 构建静态内部类Sync，去继承AbstractQueuedSynchronizer
3. 根据需求重写下面方法：
    1. `protected boolean tryAcquire(int arg)`
    2. `protected boolean tryRelease(int arg)`
    3. `protected int tryAcquireShared(int arg)`
    4. `protected boolean tryReleaseShared(int arg)`
    5. `protected boolean isHeldExclusively()`