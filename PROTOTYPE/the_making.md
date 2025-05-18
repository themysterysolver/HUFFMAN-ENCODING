### HUFFMAN CODING
- It's a *greedy* algorithm.
- Here we will compress the given string reducing the cost of transmission.

<br>

- During transmission we will transfer it in  `ASCII` and ASCII is represnted in  bytes. ie. **8bits** == `1bit`
- A string `s` of length `n` then the **cost** will be ***n\*8***
- `ASCII` is used when we have *128 characters* when we have fewer than them,then we can use *huffman coding* to reduce the encoded string making it variable size encoding/fixed size encoding.
<br>

##### FIXED SIZE ENCODING
- The table is created wth `char` mapped to new encoded string `code` of bit length `<8` let's say `m`.
- Then the new cost is `m*n` ***+***
    noOf `chars`\*(8 ***+*** m)
- This is fixes size encoding.
> **NOTE:** While calculating *encoded data size* always include the `table`/`tree`'s size too along with `encoded string`.
##### HUFFMAN CODING
- Greedy,***optimal merge pattern***
- Find frequency,then do optimal merge
- `LHS branch` is assigned `0`
- `RHS branch` is assigned `1`
---

### NOTES
- `namedtuple` is a *leight weigth immutable obj*
-  `1byte` is a character,each **ASCII** contribute to `1byte`.This is the file size in a `.txt` file.
-  
