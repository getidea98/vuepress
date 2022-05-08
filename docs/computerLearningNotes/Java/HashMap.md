# HashMap

tag: Java基础

特点：

- 非线程安全
- 底层是数组➕链表、数组➕红黑树
- 扩容存在数组扩容、链表树化
1. 构造方法有三个
    1. HashMap()：提供默认的扩容因子（0.75)
        
        ```java
        public HashMap() {
                this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
            }
        ```
        
    2. HashMap(int initialCapacity): initialCapacity 作为默认的数组大小。详细看构造方法3
        
        ```java
        public HashMap(int initialCapacity) {
                this(initialCapacity, DEFAULT_LOAD_FACTOR);
            }
        ```
        
    3. HashMap(int initialCapacity, float loadFactor): 与2相比，提供的更为全面。并且是2的底层。
        
        initialCapacity: 
        
        参数范围是 0<initialCapacity≤MAXIMUM_CAPACITY。
        
        方法tableSizeFor，目的是寻找不大于给定参数（initialCapacity）最小的2的幂。
        
        initialCapacity = 15 - threshold = 16
        
        initialCapacity = 32 - threshold = 32
        
        ```java
        public HashMap(int initialCapacity, float loadFactor) {
                if (initialCapacity < 0)
                    throw new IllegalArgumentException("Illegal initial capacity: " +
                                                       initialCapacity);
                if (initialCapacity > MAXIMUM_CAPACITY)
                    initialCapacity = MAXIMUM_CAPACITY;
                if (loadFactor <= 0 || Float.isNaN(loadFactor))
                    throw new IllegalArgumentException("Illegal load factor: " +
                                                       loadFactor);
                this.loadFactor = loadFactor;
                this.threshold = tableSizeFor(initialCapacity);
            }
        ```
        
2. 当链表长度到达8，数组长度到达64时，链表才会转换成红黑树。否则优先扩容。
3. 当链表的长度到6，这个链表由红黑树变成链表。
4. 数组长度是2的幂，为了更高效率的计算下表。

## ConcurrentHashMap

1. key和value是不支持null，为什么？
    
    关键点：这是一个支持多线程的Map。
    
    假如支持的话，如果map.get(key)返回一个null。我们没办法判断这个key和 value（null）有没有映射关系。因为，没有映射关系返回null，有映射关系返回了value（null）。
    
    同样的问题在Hashmap中可以通过，map.`containsKey(key)`来进一步判断是否有过这个key的映射。
    
    但是因为这个map是支持多线程的，就导致在map上的验证方法，没办法放在ConcurrentHashMap上面。