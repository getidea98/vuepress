# Lock接口

### Lock接口的使用规范

```java
Lock lock = new ReentrantLock();
 lock.lock();
 try {
   // access the resource protected by this lock
 } finally {
   lock.unlock();
 }

// unlock的底层
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

如果，lock.lock()在try块内，如果获取锁失败的话，是会进入到finally的代码执行解锁操作。

解锁的底层会判断当前线程是不是，获取锁的线程。不是的话，会抛出一个运行时一场IllegalMonitorStateException

因此，将lock()方法放在外面，避免了没获取锁，却去尝试解锁的矛盾操作。