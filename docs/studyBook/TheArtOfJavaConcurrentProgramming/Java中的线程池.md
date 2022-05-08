# Java中的线程池

Created: March 20, 2022 4:34 PM
Tags: ThreadPoolExecutor, 框架

![线程池的主要处理流程](/imgs/TheArtOfJavaConcurrentProgramming/Java中的线程池.png)

线程池的主要处理流程

简单介绍`ThreadPoolExecutor.execute()`

1. 如果当前运行的线程少于corePoolSize，则创建新线程来执行任务（注意，执行这一步骤需要获取全局锁）。
2. 如果运行的线程等于或多于corePoolSize，则将任务加入BlockingQueue。
3. 如果无法将任务加入BlockingQueue（队列已满），则创建新的线程来处理任务（注意，执
    
    行这一步骤需要获取全局锁）。
    
4. 如果创建新线程将使当前运行的线程超出maximumPoolSize，任务将被拒绝，并调用
    
    RejectedExecutionHandler.rejectedExecution()方法。
    

## **线程池的创建**

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler);
```

⚠️ 任务队列如果是无限队列，那么非核心的线程永远不会被创建，使用这个队列也是非常危险的