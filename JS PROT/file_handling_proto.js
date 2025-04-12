const fs=require("fs")

let fileContent="ABIIIIIIIIIIII\nFirst frnddddddddd"
class Node{
    constructor(char,freq,left,right){
        this.char=char;
        this.freq=freq;
        this.left=left;
        this.right=right;
    }
}

function generate_huffman_tree(str){
    let freq={}
    Array.from(str).forEach((c)=>freq[c]=(freq[c]||0)+1);
    heap=Object.entries(freq).map(([char,val])=>new Node(char,val));
    heap.sort((a,b)=>a.freq-b.freq);
    // console.log("HEAP",heap)
    while(heap.length>1){
        let left=heap.shift()
        let right=heap.shift()
        let newNode=new Node(null,left.freq+right.freq,left,right);
        heap.push(newNode);
        heap.sort((a,b)=>a.freq-b.freq);
    }
    console.log(heap[0])
    return heap[0];
}

function generate_codebook(root,prefix,codebook){
    if(root){
        if(root.char){
            codebook[root.char]=prefix;
        }
        generate_codebook(root.left,prefix+"0",codebook);
        generate_codebook(root.right,prefix+"1",codebook);
    }
    return codebook;
}
let encode_the_string=((str,codebook)=>str.split("").map(char=>codebook[char]).join(""));
let decode_the_string=((str,codebook)=>{
    let temp=""
    let result=""
    let reverse_codebook=new Map();
    Object.entries(codebook).forEach(([key,val])=>reverse_codebook.set(val,key));
    Array.from(str).forEach(c=>{
        temp+=c;
        if(reverse_codebook.has(temp)){
            result+=reverse_codebook.get(temp);
            temp=""
        }
    });
    return result;
})
function write_bin_file(encoded_string,codebook,filepath){
    const padding=(8-(encode_the_string.length%8))%8
    encoded_string+="0".repeat(padding);

    const byteArr=[]
    for(let i=0;i<encoded_string.length;i+=8){
        byteArr.push(parseInt(encoded_string.slice(i,i+8),2));
    }

    let codebookStr=JSON.stringify(codebook);
    let codebookBytes=Buffer.from(codebookStr,"utf8");

    const header=Buffer.alloc(3);
    header.writeUInt8(padding,0); //paddingBuffer
    header.writeUInt16LE(codebookBytes.length,1); //lengthBUffer
     const binaryBuffer=Buffer.concat([header,codebookBytes,Buffer.from(byteArr)]);
     fs.writeFileSync(filepath,binaryBuffer);
     console.log("Done with creating output.bin")
}
function read_bin_file(path){
    const data=fs.readFileSync(path);
    const padding=data.readUInt8(0);
    const codebookSize=data.readUint16LE(1);
    const codebookStr=data.slice(3,3+codebookSize).toString("utf-8");
    const codebook=JSON.parse(codebookStr);
    const byteData=data.slice(3+codebookSize);

    let encodeBinStr=""
    for(let byte of byteData){
        encodeBinStr+=byte.toString(2).padStart(8,"0");
    }
    if(padding>0){
        encodeBinStr=encodeBinStr.slice(0,-padding);
    }
    let decoded_string=decode_the_string(encodeBinStr,codebook);
    return decoded_string;
}
let root=generate_huffman_tree(fileContent);
let codebook=generate_codebook(root,"",{});
let encoded_string=encode_the_string(fileContent,codebook);
let decoded_string=decode_the_string(encoded_string,codebook);

console.log(Object.entries(codebook));
console.log(encoded_string)
console.log(decoded_string);

write_bin_file(encoded_string,codebook,"C:\\Users\\DELL\\OneDrive\\Desktop\\MIT\\CODES\\FOR GIT HUB\\HUFFMAN-ENCODING\\JS PROT\\output.bin");
read_bin_file("C:\\Users\\DELL\\OneDrive\\Desktop\\MIT\\CODES\\FOR GIT HUB\\HUFFMAN-ENCODING\\JS PROT\\output.bin")

