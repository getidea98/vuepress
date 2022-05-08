# AQS-独占式

## **独占式的同步状态的获取和释放**

首节点在释放同步状态后只会唤醒后续节点，由后续节点负责后面的修改。

1. 首节点释放同步状态，唤醒后续节点
2. 后续节点判断自身的前节点是不是首节点，是的话继续尝试获取同步状态，不是则继续阻塞
3. 获取同步状态成功，将首节点的后续节点置为null设置自身为新首节点

```java
for (;;) {
	final Node p = node.predecessor();
  if (p == head && tryAcquire(arg)) {
	  head = node;
    node.thread = null;
    node.prev = null;
    p.next = null; // help GC
    failed = false;
    return interrupted;
   }
   if (shouldParkAfterFailedAcquire(p, node) &&
    parkAndCheckInterrupt())
    interrupted = true;
   }
```

![Untitled](/imgs/TheArtOfJavaConcurrentProgramming/AQS独占式.png)