import os
import struct,json

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
        print("DECODED_STR",decoded_str)



if __name__=="__main__":
    input_file="input.txt"
    with open(input_file,"r") as file:
        lines=file.readlines()
    encoded_txt_str="0100111111111111"
    filename="input.txt"
    codebook={'B': '00', 'A': '01', 'I': '1'}

    from_bin="out.bin"
    convert_binary(encoded_txt_str,codebook)
    convert_bin_output(from_bin)
    print("LINE CONTENT",lines)
    print("LINE SIZE: {}, FILE SIZE: {}  (bytes)".format(len("".join(lines)),os.path.getsize("input.txt")))