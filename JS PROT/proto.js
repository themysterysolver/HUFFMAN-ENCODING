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

let root=generate_huffman_tree(fileContent);
let codebook=generate_codebook(root,"",{});
let encoded_string=encode_the_string(fileContent,codebook);
let decoded_string=decode_the_string(encoded_string,codebook);

console.log(Object.entries(codebook));
console.log(encoded_string)
console.log(decoded_string);