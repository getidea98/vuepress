# AQS-共享式

## 共享式的获取同步状态和释放

**获取同步状态**

通过调用acquireShared方法，同步器调用tryAcquireShared(int arg)方法，tryAcquireShared(int arg)方法返回值为int类型，当返回值大于等于0时，表示能够获取到同 步状态。

doAcquireShared(int arg)方法的自 旋过程中，如果当前节点的前驱为头节点时，尝试获取同步状态，如果返回值大于等于0，表示 该次获取同步状态成功并从自旋过程中退出。

```java
public final void acquireShared(int arg) {
    if (tryAcquireShared(arg) < 0)
        doAcquireShared(arg);
}
```

**释放同步状态**

releaseShared(int arg)方法可以释放同步状态，但是这个方法回出现多线程一起释放， 所以使用CAS的方式