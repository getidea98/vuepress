# AQS-独占式超时

**独占式超时获取同步状态**

通过调用同步器的doAcquireNanos(int arg,long nanosTimeout)方法可以超时获取同步状 态，即在指定的时间段内获取同步状态，如果获取到同步状态则返回true，否则，返回false

```java
private boolean doAcquireNanos(int arg, long nanosTimeout)
        throws InterruptedException {
    if (nanosTimeout <= 0L)
        return false;
    final long deadline = System.nanoTime() + nanosTimeout;
    final Node node = addWaiter(Node.EXCLUSIVE);
    boolean failed = true;
    try {
        for (;;) {
            final Node p = node.predecessor();
            if (p == head && tryAcquire(arg)) {
                setHead(node);
                p.next = null; // help GC
                failed = false;
                return true;
            }
            nanosTimeout = deadline - System.nanoTime();
            if (nanosTimeout <= 0L)
                return false;
            if (shouldParkAfterFailedAcquire(p, node) &&
                nanosTimeout >spinForTimeoutThreshold)
                LockSupport.parkNanos(this, nanosTimeout);
            if (Thread.interrupted())
                throw new InterruptedException();
        }
    } finally {
        if (failed)
            cancelAcquire(node);
    }
}
```

获取同步状态和独占式类似，但是处理获取失败不一样。获取失败，计算剩余等待时间，没有超时则，继续等待，超时则返回false

![Untitled](/imgs/TheArtOfJavaConcurrentProgramming/AQS独占式超时.png)