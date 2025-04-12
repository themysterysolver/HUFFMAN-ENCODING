## NOTES
- `.files` is an attribute
- `row`,`col` *containers* are used for breakpoints 

### WORKFLOW
- String--->Encoded string(completely binary)----->binary array to store bytes
    - that is each 8 bits is conidered and a n byte is made between 0-255
    - parlelly we need to store these info in `.bin`
        - paddingBuffer
        - lengthBuffer of codebook
        - codeBokBUffer
        - binaryBuffer
---
```
| Padding (1 byte) | Codebook length (2 bytes) | Codebook bytes | Encoded binary bytes |
```
---
## Blob
- It is an API that holds data
- It is like virtual file object in memory
- `const url = URL.createObjectURL(blob);` generates local URL 
- we cretate a link for it and then click it
----