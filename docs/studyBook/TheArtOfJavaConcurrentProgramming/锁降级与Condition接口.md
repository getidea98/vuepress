# 锁降级与Condition接口

锁降级

当前线程拥有写锁，随后在拥有读锁，然后释放写锁。至此完成锁降级，此线程只拥有读锁，完成锁降级

## **Condition**

![Object的监视器方法与Condition接口的对比](/imgs/TheArtOfJavaConcurrentProgramming/锁降级与Condition接口1.png)

Object的监视器方法与Condition接口的对比

线程从await()方法返回，需要重新竞争锁资源。

### **Condition的内部实现**

**等待队列**

等待队列是一个FIFO的队列，在队列中的每个节点都包含了一个线程引用，该线程就是在Condition对象上等待的线程。如果一个线程调用了Condition.await()方法，那么该线程将会释放锁、构造成节点加入等待队列并进入等待状态。

![等待队列的基本结构](/imgs/TheArtOfJavaConcurrentProgramming/锁降级与Condition接口2.png)

等待队列的基本结构

在Object的拥有一个同步队列和一个等待队列。但是Lock接口，拥有一个同步队列和多个等待队列

![Untitled](/imgs/TheArtOfJavaConcurrentProgramming/锁降级与Condition接口3.png)

**等待**

调用Condition的await()方法（或者以await开头的方法），会使当前线程进入等待队列并释 放锁，同时线程状态变为等待状态。

当从await()方法返回时，当前线程一定获取了Condition相 关联的锁。

调用await()方法时，将自己添加到等待队列，随后唤醒后续节点。

**通知**

调用Condition的signal()方法，会将队列的首节点放到同步队列的末尾。随后唤醒节点，是指自己加入到同步队列。

![Untitled](/imgs/TheArtOfJavaConcurrentProgramming/锁降级与Condition接口4.png)