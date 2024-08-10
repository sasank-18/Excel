let donwloadBtn= document.querySelector('.download')
let uploadBtn= document.querySelector('.upload')
//download task
donwloadBtn.addEventListener('click', (e)=>{

    let response =  confirm("Do you want to downlaod the files")
    if(response === false) return ;
    let jsonData = JSON.stringify(sheetDB);
    let file= new Blob([jsonData], {type: "application/json"})

    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    console.log(URL.createObjectURL(file))
    a.download = 'SheetData.json';
    a.click();
})

uploadBtn.addEventListener('click', (e)=>{
    // file.click;
    console.log('hle')
    let input = document.createElement('input')
    input.setAttribute('type','file');
    input.click();

    input.addEventListener('change', (e)=>{

    let reader = new FileReader();
    let files = input.files;
    console.log(files[0].type)
    if(files[0].type !=='application/json'){
        alert('Only accept JSON format');
        return
    }
    let fileObj= files[0]; // taking 1 file
    reader.readAsText(fileObj)
      
    reader.addEventListener('load',(e)=>{
         let SheetData = JSON.parse(reader.result); 
         console.log(SheetData);
         displayingDataIntoSheet(SheetData)  ;       
    })
           
})

})

function displayingDataIntoSheet(SheetData){
    sheetIconActionsCont.click();
    

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) { 
           sheetDB[i][j] = SheetData[i][j];
}}
        const totalSheet = document.querySelectorAll('.sheet-folder');
        const SheetSelected = document.querySelector(`.sheet-folder[id = "${totalSheet.length-1}"]`);
        SheetSelected.click();
}