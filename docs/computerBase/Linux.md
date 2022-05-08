# Linux

## vmstat

Created: March 9, 2022 8:14 PM

vmstat是linux的系统级监控程序，用来查看系统CPU和内存情况

结果字段解析

1. **procs**
    
    r：正在执行和等待执行的进程数量
    
    b：等待IO的进程的数量
    
2. **Memory**
    
    swpd：正在使用虚拟内存的大小
    
    free：空闲内存的大小
    
    buff：已用的buff大小，对块设备的读写进行缓冲
    
    cache：已用的cache大小
    
    inact：非活跃内存大小，当使用-a选项时显示
    
    active：活跃的内存大小，当使用-a选项时显示
    
3. **Swap**
    
    si：从交换去读取数据的速度
    
    so：内存到交换区写数据的速度
    
4. **IO**
    
    bi：每秒读取的块数，块设备每秒接收的块数量，单位是block，这里的块设备是指系统上所有的磁盘和其他块设备，现在的Linux版本块的大小为1024bytes
    
    bo：每秒写入的块数，块设备每秒发送的块数量，单位是bloc
    
5. **system**
    
    in：每秒中断数，包括时钟中断
    
    cs：每秒上下文切换数，线程的切换，也要进程上下文切换，这个值要越小越好
    
    这两个数，越大，会看到内核消耗CPU的sy会越多
    
6. **CPU**
    
    us：用户进程执行消耗cpu时间，user time
    
    sy：系统进程消耗cpu时间，system time
    
    Id：空闲时间（包括IO等待时间），一般来说 us+sy+id=100
    
    wa：等待IO时间