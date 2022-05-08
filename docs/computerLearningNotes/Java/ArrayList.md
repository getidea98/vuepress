# ArrayList

tag: Java基础

特点：

- 非线程安全
- 实现 `java.io.Serializable` 接口
- 默认初始化长度 10，创建时，不指定大小长度为0；
- 扩容为1.5倍加载
1. 构造方法：有三个
    1. ArrayList()：将{}赋值给底层的elementData；相当于什么也不做
    2. ArrayList(int initialCapacity)：
        
        以  initialCapacity 作为数组大小；创建Object数组；并赋值给底层的elementData
        
        ```java
        public ArrayList(int initialCapacity) {
                if (initialCapacity > 0) {
                    this.elementData = new Object[initialCapacity];
                } else if (initialCapacity == 0) {
                    this.elementData = EMPTY_ELEMENTDATA;
                } else {
                    throw new IllegalArgumentException("Illegal Capacity: "+
                                                       initialCapacity);
                }
            }
        ```
        
    3. ArrayList(Collection<? extends E> c):
        
        一般情况下，将参数c的内容复制给底层的elementData
        
        ```java
        public ArrayList(Collection<? extends E> c) {
                Object[] a = c.toArray();
                if ((size = a.length) != 0) {
                    if (c.getClass() == ArrayList.class) {
                        elementData = a;
                    } else {
                        elementData = Arrays.copyOf(a, size, Object[].class);
                    }
                } else {
                    // replace with empty array.
                    elementData = EMPTY_ELEMENTDATA;
                }
            }
        ```
        
2. add 方法

```java
public boolean add(E e) {
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }

private void ensureCapacityInternal(int minCapacity) {
        ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
    }

private static int calculateCapacity(Object[] elementData, int minCapacity) {
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            return Math.max(DEFAULT_CAPACITY, minCapacity);
        }
        return minCapacity;
    }

private void ensureExplicitCapacity(int minCapacity) {
        modCount++;

        // overflow-conscious code
        if (minCapacity - elementData.length > 0)
            grow(minCapacity);
    }

/**

*/
private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        elementData = Arrays.copyOf(elementData, newCapacity);
    }

```

add方法核心无非是扩容：

条件：最小容量大于数组长度和第一次add时

扩容倍数：1.5倍`（int newCapacity = oldCapacity + (oldCapacity >> 1);）`

特殊扩容：第一次添加元素时，由 0 ➡️ 10，有点懒加载的意思。

当数组长度为0的时候，扩容成 `DEFAULT_CAPACITY`大小。这也就是默认大小为 10 的来源。

```
if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }

```

Arraylist没有像HashMap一样的扩容阈值。每次添加前确定容量，不够就扩容，不然不扩容。