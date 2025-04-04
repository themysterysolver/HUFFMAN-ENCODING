import os
import struct,json
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

def convert_binary(str,codebook):
    padding=(8-len(str)%8)%8
    dest="out.bin"
    new_str=str+"0"*padding
    byte_list=[int(new_str[i:i+8],2) for i in range(0,len(new_str),8)]

    codebook_json=json.dumps(codebook)
    codebook_bytes=codebook_json.encode("utf-8")
    codebook_size=len(codebook_bytes)

    with open(dest,"wb") as f:
        f.write(struct.pack("B",padding))
        f.write(struct.pack("H",codebook_size))
        f.write(codebook_bytes)
        f.write(bytes(byte_list))
    print("COMPRESSED BIN FILE IS READY FOR TRANSFER!")

def convert_bin_output(file):
    with open(file,"rb") as f:
        padding=struct.unpack("B",f.read(1))[0]
        codebook_size=struct.unpack("H",f.read(2))[0]
        codebook_json=f.read(codebook_size).decode("utf-8")
        codebook=json.loads(codebook_json)
        data_bytes=f.read()

        bin_str=""
        for byte in data_bytes:
            bin_str+=bin(byte)[2:].zfill(8)
        
        bin_removed_padding=bin_str[:-padding] if padding else bin_str
        print("THE DECODED BIN DATA:",bin_removed_padding)

        decoded_str=decode_str(bin_removed_padding,codebook)
        print("DECODED_STR FROM FILE:",decoded_str)
        return decoded_str

def create_output_file(str):
    with open("output.txt","w") as f:
        f.write(str)
    print("FILE CREATED SUCESSFULLY!")

if __name__=="__main__":
    input_file="input.txt"
    with open(input_file,"r") as file:
        lines=file.readlines()
    input_string=''.join(lines)
    root=generate_huffman_tree(input_string)
    codebook=create_codebook(root,"",{})
    encoded_text_str=encode_str(codebook,input_string)
    decoded_text_str=decode_str(encoded_text_str,codebook)


    from_bin="out.bin"
    convert_binary(encoded_text_str,codebook)
    decoded_string=convert_bin_output(from_bin)
    create_output_file(decoded_string)

    print("LINE CONTENT",lines)
    print("LINE SIZE: {}, FILE SIZE: {}  (bytes)".format(len("".join(lines)),os.path.getsize("input.txt")))
    
    print("THE INPYT STRING IS:",input_string)
    print("THE ROOT:",root)
    print("THE CODEBOOK:",codebook)
    print("ENCODED STR:",encoded_text_str)
    print("DECODED STR",decoded_text_str)
    print("FILE OUTPUTED STR:\n",decoded_text_str)