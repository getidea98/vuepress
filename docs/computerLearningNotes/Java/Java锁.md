# Java锁

tag: Java基础

## 悲观锁与乐观锁

**悲观锁：读写都会加锁。因此适合在写数据多的情况。**

**乐观锁：读数据不会加锁，写数据才会加锁。因此适合读多写少的情况。**

### 悲观锁：

Java的synchronized和Lock就是悲观锁。

### 乐观锁：

乐观锁在Java中是通过无锁编程实现的。原子类的递增操作就是通过CAS自旋实现的。

**CAS:**

```java
public static void main(String[] args) {
        AtomicInteger atomicInteger = new AtomicInteger();
        atomicInteger.incrementAndGet();
    }

// AtomicInteger
public final int incrementAndGet() {
        return unsafe.getAndAddInt(this, valueOffset, 1) + 1;
    }

// Unsafe
public final int getAndAddInt(Object o, long offset, int delta) {
        int v;
        do {
            v = getIntVolatile(o, offset);
        } while (!compareAndSwapInt(o, offset, v, v + delta));
        return v;
    }
```

CAS在实现有问题，那就是ABA问题。解决办法是变量前面加版本号。

### 自旋锁与自适应自旋锁

线程获取不到锁有两种处理方式：1. 线程阻塞 2.线程自旋

自旋锁：线程获取不到锁的时候，循环的执行空代码。

自适应自旋锁：循环次数不是固定的，而是由上次循环情况和锁的拥有者的状态决定。

线程一旦被阻塞，再次被唤醒时代价较大。因此适当的采用自旋锁可以提高效率。

### 独享锁与共享锁

独享锁也叫排他锁、互斥锁，是指该锁一次只能被一个线程所持有。如果线程T对数据A加上排它锁后，则其他线程不能再对A加任何类型的锁。

共享锁是指该锁可被多个线程所持有。如果线程T对数据A加上共享锁后，则其他线程只能对A再加共享锁，不能加排它锁。获得共享锁的线程只能读数据，不能修改数据。

### 可重入锁 VS 非可重入锁

### 公平锁 VS 非公平锁

## 锁升级

### 无锁 VS 偏向锁 VS 轻量级锁 VS 重量级锁

针对synchronized锁的四种状态。

**偏向锁**

通过对比Mark Word中的信息，判断当前线程是否拥有当前对象锁，避免通过CAS原子操作。

拥有偏向锁的线程只需要和MarkWord里的信息对比下，然后执行。

**轻量级锁**

是指当锁是偏向锁的时候，被另外的线程所访问，偏向锁就会升级为轻量级锁，其他线程会通过自旋的形式尝试获取锁，不会阻塞，从而提高性能。

**重量级锁**

若当前只有一个等待线程，则该线程通过自旋进行等待。但是当自旋超过一定的次数，或者一个线程在持有锁，一个在自旋，又有第三个来访时，轻量级锁升级为重量级锁。