## HUFFMAN ENCODING
### HISTORY
- Huffman encoding, a lossless data compression technique, was developed by `David Huffman` in **1952** as part of his MIT thesis.
- The professor, Robert M. Fano, assigned a term paper on the problem of ***finding the most efficient binary code***.
- Huffman, unable to prove any codes were the most efficient, was about to give up and start studying for the final when he hit upon the idea of using a `frequency-sorted binary tree` and quickly proved this method the most efficient
- In doing so, Huffman outdid Fano, who had worked with Claude Shannon to develop a similar code. *Building the tree from the bottom up guaranteed optimality, unlike the top-down approach of `Shannon–Fano` coding*.

## ABOUT THIS PROJECT
- I wanted to recreate this beautifull compression technique for text files.
- I did this first using py as a prototype to check my working of the algorithm and expaned my work in js to give it as a mvp.
- There are 2 fields in the web
  - `Encoder` which enocdes a text file
  - `Decoder` which decodes the encrypted text file
- This reduces the data sent via network since the data is compressed from sender and can be decrypted by the recieving party.

## Why I did this?
- I wanna recreated what huffman did.
- I want to refresh py,js

## REPO STRUCTURE
- `JS PROT` contains prototype of encryption and decrytion with and without file handling in **js**
- `PROTOTYPE` contains prototype of encryption and decrytion with and without file handling in **py**
```
.
├── JS PROT
│   ├── file_handling_proto.js
│   ├── output.bin
│   └── proto.js
├── PROTOTYPE
│   ├── file_management_huff.py
│   ├── huffman.py
│   └── the_making.md
├── index.html
├── script.js
├── style.css
└── the_making.md
```
