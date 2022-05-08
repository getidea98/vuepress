# 重入锁ReentrantLock

**可重入：**

重进入是指任意线程在获取到锁之后能够再次获取该锁而不会被锁所阻塞

**公平锁和非公平锁**

在绝对时间上，先对锁进行获取的请求一定先 被满足，那么这个锁是公平的，反之，是不公平的。往往非公平锁的效率更高

## 底层逻辑

**非公平获取锁：**

该方法增加了再次获取同步状态的处理逻辑：通过判断当前线程是否为获取锁的线程来 决定获取操作是否成功，如果是获取锁的线程再次请求，则将同步状态值进行增加并返回 true，表示获取同步状态成功。
成功获取锁的线程再次获取锁，只是增加了同步状态值，这也就要求ReentrantLock在释放 同步状态时减少同步状态值

```java
final boolean nonfairTryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        if (compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0) // overflow
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```

**非公平的释放锁：**

如果该锁被获取了n次，那么前(n-1)次tryRelease(int releases)方法必须返回false，而只有同 步状态完全释放了，才能返回true。

```java
protected final boolean tryRelease(int releases) {
    int c = getState() - releases;
    if (Thread.currentThread() != getExclusiveOwnerThread())
        throw new IllegalMonitorStateException();
    boolean free = false;
    if (c == 0) {
        free = true;
        setExclusiveOwnerThread(null);
    }
    setState(c);
    return free;
}
```

**公平的获取锁**

公平锁，在尝试获取同步状态的时候，会判断自身节点在队列中的位置hasQueuedPredecessors()，

而对于非公平锁，只需要CAS的获取状态既可以了。

```java
@ReservedStackAccess
protected final boolean tryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        if (!hasQueuedPredecessors() &&
            compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0)
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```