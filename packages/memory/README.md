# memory

This package contains implementation of allocator and native arrays to allocate memory from ArrayBuffer

## Allocators
### LinearAllocator

Linear memory allocator with execution complexity log(1)
Cannot be used for GC after memory allocation. Therefore, it is necessary to perform manual memory cleanup and make sure that NativeArray is not used anywhere else, otherwise other allocated memory blocks will be overwritten

### TagBoundaryAllocator
### PoolAllocator

Pool Allocator is the fastest memory allocator with a fixed allocated block size.

It supports GC and allows to return unused block back to free memory area. It supports automatic cleanup if Native Array was not cleaned manually


## Native Arrays
### Float32NativeArray
### Int8NativeArray
### Int16NativeArray
### Int32NativeArray
### Uint8NativeArray
### Uint16NativeArray
### Uint32NativeArray
