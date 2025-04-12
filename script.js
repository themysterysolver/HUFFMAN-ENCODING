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
function downloadBinaryFile(file,name){
    const blob=new Blob([file],{type:"application/octect-stream"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=name;
    a.click();
    URL.revokeObjectURL(url);
}
function write_bin_file(encoded_string,codebook,fileName){
    const padding=(8-(encode_the_string.length%8))%8
    encoded_string+="0".repeat(padding);

    const byteArr=[]
    for(let i=0;i<encoded_string.length;i+=8){
        byteArr.push(parseInt(encoded_string.slice(i,i+8),2));
    }

    let codebookStr=JSON.stringify(codebook);
    // let codebookBytes=Buffer.from(codebookStr,"utf8");

    // const header=Buffer.alloc(3);
    // header.writeUInt8(padding,0); //paddingBuffer
    // header.writeUInt16LE(codebookBytes.length,1); //lengthBUffer
    //  const binaryBuffer=Buffer.concat([header,codebookBytes,Buffer.from(byteArr)]);
    //  downloadBinaryFile(binaryBuffer,fileName)
    const encoder=new TextEncoder();
    let codebookBytes=encoder.encode(codebookStr);

    const header=new Uint8Array(3);
    header[0]=padding;
    header[1]=codebookBytes.length & 0xff;
    header[2]=codebookBytes.length>>8 & 0xff;

    const totalLength=header.length+codebookBytes.length+byteArr.length;
    const binaryBuffer=new Uint8Array(totalLength);

    binaryBuffer.set(header,0);
    binaryBuffer.set(codebookBytes,header.length);
    binaryBuffer.set(byteArr,header.length+codebookBytes.length);

    downloadBinaryFile(binaryBuffer,fileName);
    console.log("Done with creating output.bin")
}

function encode(){
    console.log("I got clicked!");
    const encode_ele=document.getElementById("encode_l");
    const file=encode_ele.files[0];
    console.log(file)
    console.log("I got executed!");
    if(file){
        const reader=new FileReader();
        reader.onload=function(e){
            const fileContent=e.target.result;
            console.log(fileContent)
            let root=generate_huffman_tree(fileContent);
            let codebook=generate_codebook(root,"",{});
            let encoded_string=encode_the_string(fileContent,codebook);
            let ogfname=file.name;
            let baseName=ogfname.substring(0,ogfname.lastIndexOf("."))||ogfname;
            let newFname=baseName+".bin"
            write_bin_file(encoded_string,codebook,newFname);
        }
        reader.readAsText(file)
    }
}