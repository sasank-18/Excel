let rows = 100;
let cols = 26;


let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector('.address-row-cont');
let cellsContainer = document.querySelector('.cells-cont');
let addressBar = document.querySelector('.address-bar');
let formulaBar = document.querySelector('.formula-bar');
let bold = document.querySelector('.bold');


for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement('div');
    addressCol.setAttribute('class', 'address-col')
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol);
}


for (let i = 0; i < cols; i++) {
    let addressRow = document.createElement('div');
    addressRow.setAttribute('class', 'address-row');
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}


for (let i = 0; i < rows; i++) {
    let itemRowContainer = document.createElement('div');
    itemRowContainer.setAttribute('class', 'each-row');
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement('input');
        cell.setAttribute('class', 'cell');
        
        cell.setAttribute('spellcheck', false);

        // attribute for cell and storage identification
        cell.setAttribute('rowId', i);
        cell.setAttribute('colId', j )
        
        itemRowContainer.appendChild(cell);
        addListerFunctionforAddressBar(cell, i, j);

    }
    cellsContainer.appendChild(itemRowContainer);
}


function addListerFunctionforAddressBar(cell, i, j) {

    cell.addEventListener('click', () => {
        let rowIndex = i+1;
        let colIndex = String.fromCharCode(65 + j);
        addressBar.value = `${colIndex}${rowIndex}`;
    })
    
};


//By default click on first cell
firstCell= document.querySelector('.cell');
firstCell.click();







