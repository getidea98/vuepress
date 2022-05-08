# 线程间通讯-等待通知机制、thread.join()

**volatile和synchronize关键字**

如果线程想要执行同步代码块，必须先获取锁对象的监视器的所有权。如果获取失败则会进入同步队列，并且线程的状态调整成BLOCKED状态。

![对象、监视器、同步队列和执行线程之间的关系](/imgs/TheArtOfJavaConcurrentProgramming/线程间通讯1.png)

对象、监视器、同步队列和执行线程之间的关系

---

**等待通知机制**

通过Object的notify和wait系列方法实现

<aside>
💡 等待/通知机制，是指一个线程A调用了对象O的wait()方法进入等待状态，而另一个线程B 调用了对象O的notify()或者notifyAll()方法，线程A收到通知后从对象O的wait()方法返回，进而执行后续操作。上述两个线程通过对象O来完成交互，而对象上的wait()和notify/notifyAll()的关系就如同开关信号一样，用来完成等待方和通知方之间的交互工作。

</aside>

1. 使用wait()、notify()和notifyAll()时需要先对调用对象加锁，但是，使用wait()后释放锁。
2. 调用wait()方法后，线程状态由RUNNING变为WAITING，并将当前线程放置到对象的 等待队列。
3. notify()或notifyAll()方法调用后，等待线程依旧不会从wait()返回，需要调用notify()或 notifAll()的线程释放锁之后，等待线程才有机会从wait()返回。
4. notify()/notifAll()方法，是从等待队列中取一个/全部线程放入同步队列，随后线程的状态是BLOCKED，而不再是WAITING
5. wait()调用前需要获取锁，调用后就释放锁
    
    ```java
    // 经典范式
    synchronized(对象) { 
    	while(条件不满足) { 
    		对象.wait(); 
    	}
    	对应的处理逻辑 
    }
    ```
    
    ![图片1.png](/imgs/TheArtOfJavaConcurrentProgramming/线程间通讯-等待通知机制、thread.join()2.png)
    

---

**thread.join()**

当thread线程完成生命周期时，调用的线程才会继续执行。join()其本质还是调用wait()方法。线程执行完毕后，会调用自身的notifAll(native方法实现)。

其内在的模型仍然是，Java的等待通知机制。

```java
public final synchronized void join(long millis) throws InterruptedException {
        long base = System.currentTimeMillis();
        long now = 0;

        if (millis < 0) {
            throw new IllegalArgumentException("timeout value is negative");
        }

        if (millis == 0) {
            while (isAlive()) {
                wait(0);
            }
        } else {
            while (isAlive()) {
                long delay = millis - now;
                if (delay <= 0) {
                    break;
                }
                wait(delay);
                now = System.currentTimeMillis() - base;
            }
        }
    }
```

---

**等待超时模式**

是wait(long time)的灵活使用，相比较，等待通知，在等待时间上面做了控制。

```java
// 对当前对象加锁 
public synchronized Object get(long mills) throws InterruptedException { 
	long future = System.currentTimeMillis() + mills;
	long remaining = mills; // 当超时大于0并且result返回值不满足要求 
	while ((result == null) && remaining > 0) { 
		wait(remaining);
		remaining = future - System.currentTimeMillis();
	}
	return result;
}
```