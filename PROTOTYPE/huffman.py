import heapq
from collections import namedtuple,Counter

class Node(namedtuple("Node",("char","freq","left","right"))):
    def __lt__(self,other):
        return self.freq<other.freq

def generate_huffman_tree(str):
    frequency=Counter(str)
    heap=[Node(key,val,None,None) for key,val in frequency.items()]
    heapq.heapify(heap)
    while len(heap)>1:
        left_sub_tree=heapq.heappop(heap)
        right_sub_tree=heapq.heappop(heap)
        heapq.heappush(heap,Node(None,left_sub_tree.freq+right_sub_tree.freq,left_sub_tree,right_sub_tree))
    return heap[0]

def create_codebook(root,prefix,cb):
    if root:
        if root.char is not None:
            cb[root.char]=prefix
        create_codebook(root.left,prefix+"0",cb)
        create_codebook(root.right,prefix+"1",cb)
    return cb

def encode_str(codebook,str):
    return "".join([codebook[c] for c in str])

def decode_str(encode_str,codebook):
    reverse_codebook={val:key for key,val in codebook.items()}
    temp=""
    result=""
    for c in encode_str:
        temp+=c
        if temp in reverse_codebook:
            result+=reverse_codebook[temp]
            temp=""
    return result

if __name__=="__main__":
    print("HUFFMAN ENCODING:")
    input_string="ABIIIIIIIIIIII"
    root=generate_huffman_tree(input_string)
    codebook=create_codebook(root,"",{})
    encoded_text_str=encode_str(codebook,input_string)
    decoded_text_str=decode_str(encoded_text_str,codebook)

    print("THE INPYT STRING IS:",input_string)
    print("THE ROOT:",root)
    print("THE CODEBOOK:",codebook)
    print("ENCODED STR:",encoded_text_str)
    print("DECODED STR",decoded_text_str)

    
