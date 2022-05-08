# AQS

### 同步器AQS

**同步队列**

同步队列是同步器AQS内部依赖的队列（双向队列FIFO）。那些尝试获取同步状态，失败的线程会被放入队列的尾部，并被阻塞，直到节点出队，才被唤醒（由上一个释放同步状态的线程唤醒）。

队列的每一个节点，都是Node对象。而这个对象内部封装着：

节点状态、当前线程对象（thread）、前后节点、当前获取同步状态的线程引用。

![Untitled](/imgs/TheArtOfJavaConcurrentProgramming/AQS1.png)

同步器，持有队列的头/尾节点，没有获取成功的节点会被放入尾节点。但是这个过程必须保证线程安全。因为会有多个线程尝试获取同步状态，绝大部分会失败。如何保证线程安全？

native compareAndSetTail(Node expect,Node update)。基于CAS的方式

![同步器将节点加入到同步队列的过程](/imgs/TheArtOfJavaConcurrentProgramming/AQS1.png)

同步器将节点加入到同步队列的过程

同步队列的首节点是正在执行的节点（线程）。

![首节点的设置](/imgs/TheArtOfJavaConcurrentProgramming/AQS1.png)

首节点的设置

首节点在释放同步状态后会唤醒后续节点。

![节点自旋的获取同步状态](/imgs/TheArtOfJavaConcurrentProgramming/AQS1.png)

节点自旋的获取同步状态