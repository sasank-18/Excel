
// selectors for cell properties

// let bold= document.querySelector('.bold')
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let fontSize = document.querySelector('.font-size-prop');
let fontFamily = document.querySelector('.font-family-prop');
let fontColor = document.querySelector('.font-color-prop');
let BGcolor = document.querySelector('.BGcolor-prop');
let leftAlign = document.querySelector('.left');
let centerAlign = document.querySelector('.center');
let rightAlign = document.querySelector('.right');
// let addressBar= document.querySelector('.address-bar');

// attach properties listener

bold.addEventListener('click', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
    bold.style.backgroundColor = cellProp.bold ? '#cfd0d1' : '#ecf0f1';
})
italic.addEventListener('click', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
    italic.style.backgroundColor = cellProp.italic ? '#cfd0d1' : '#ecf0f1';
})
underline.addEventListener('click', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? 'underline' : 'none';
    underline.style.backgroundColor = cellProp.underline ? '#cfd0d1' : '#ecf0f1';
})
fontSize.addEventListener('change', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);

    cellProp.fontSize = fontSize.value;

    cell.style.fontSize = `${fontSize.value}px`
})

fontFamily.addEventListener('change', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = fontFamily.value;
    fontFamily.value= cellProp.fontFamily;
})

fontColor.addEventListener('change', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);

    cellProp.fontColor = fontColor.value;
    cell.style.color = fontColor.value;
})

BGcolor.addEventListener('change', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);

    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = BGcolor.value;
})


leftAlign.addEventListener('click', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);
    cellProp.alignment = leftAlign.classList[1];
    cell.style.textAlign =  'left';
   
    leftAlign.style.backgroundColor =  '#cfd0d1' ;
    rightAlign.style.backgroundColor = '#ecf0f1';
    centerAlign.style.backgroundColor= '#ecf0f1';
    
})
rightAlign.addEventListener('click', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);
    cellProp.alignment = rightAlign.classList[1];
    cell.style.textAlign =  'right' ;
    
        leftAlign.style.backgroundColor =  '#ecf0f1';
        rightAlign.style.backgroundColor ='#cfd0d1';
        centerAlign.style.backgroundColor= '#ecf0f1';
        
})
centerAlign.addEventListener('click', (e) => {

    let [cell, cellProp] = activeCell(addressBar.value);
    cellProp.alignment = centerAlign.classList[1];
    cell.style.textAlign = 'center';

    leftAlign.style.backgroundColor =  '#ecf0f1';
    rightAlign.style.backgroundColor ='#ecf0f1';
    centerAlign.style.backgroundColor= '#cfd0d1';
})

function activeCell(address) {
    [i, j] = decodeAddress(address);
    let selector = `.cell[rowId = "${i}"][colId= "${j}"]`
    let singleCell = document.querySelector(selector);
    let cellProp = sheetDB[i][j];
    return [singleCell, cellProp];
}

function decodeAddress(address) {
    // laddress -> A1
    let str = address;
    let iSTR = str.slice(1);
    let i = parseInt(iSTR);
    let jSTR = str.charAt(0);
    let j = jSTR.charCodeAt(0) - 65;
    return [i - 1, j];
}

let allcell = document.querySelectorAll('.cell');
for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let selector = `.cell[rowId = "${i}"][colId= "${j}"]`
        let singleCell = document.querySelector(selector);
        singleCell.addEventListener('click', ()=>{
            
            let cellProp = sheetDB[i][j];
            // let cellProp = sheetsContainer[0].sheetDB[i][j];
           
            bold.style.backgroundColor = cellProp.bold ? '#cfd0d1' : '#ecf0f1';
            italic.style.backgroundColor = cellProp.italic ? '#cfd0d1' : '#ecf0f1';
            underline.style.backgroundColor = cellProp.underline ? '#cfd0d1' : '#ecf0f1';
            fontSize.value= cellProp.fontSize;
            fontFamily.value= cellProp.fontFamily;
            formulaBar.value= cellProp.formula;
        
            if(cellProp.alignment=== 'left'){
                leftAlign.style.backgroundColor =  '#cfd0d1' ;
                rightAlign.style.backgroundColor = '#ecf0f1';
                centerAlign.style.backgroundColor= '#ecf0f1';   
             }
           else if( cellProp.alignment==='center'){
                leftAlign.style.backgroundColor =  '#ecf0f1';
                rightAlign.style.backgroundColor ='#ecf0f1';
                centerAlign.style.backgroundColor= '#cfd0d1';
             }
           else{
            leftAlign.style.backgroundColor =  '#ecf0f1';
            rightAlign.style.backgroundColor ='#cfd0d1';
            centerAlign.style.backgroundColor= '#ecf0f1';                
            }
            

        })
    }
}

