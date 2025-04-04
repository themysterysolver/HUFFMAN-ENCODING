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
            // let root=create_huffman_tree(fileContent);
        }
        reader.readAsText(file)
    }
}