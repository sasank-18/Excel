let sheetsContainer = [];
let sheetDB = [];
const sheetIconActionsCont = document.querySelector('.sheet-icon-actions-cont')
const sheetsFolderCont = document.querySelector('.sheets-folder-cont')

let count = 0;

sheetIconActionsCont.addEventListener('click', () => {
    let sheetFolder = document.createElement('div');
    sheetFolder.setAttribute('class', 'sheet-folder');
    sheetFolder.textContent = `Sheet${count + 1}`;
    sheetFolder.setAttribute('id', count);
    count++;
    sheetsFolderCont.appendChild(sheetFolder);
    createDbSheet(sheetFolder);
    handleSheetAdctiveness(sheetFolder);
    deleteSheet(sheetFolder, count);
})

sheetIconActionsCont.click();


function createDbSheet(sheet) {
    let sheetDB = [];
    for (let i = 0; i < rows; i++) {
        let showRow = [];
        for (let j = 0; j < cols; j++) {
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: 'left',
                fontFamily: 'monospace',
                fontSize: '14',
                fontColor: '#000000',
                BGcolor: 'WHITE',
                value: '',
                formula: '',
                dependencyArray: []
            }
            showRow.push(cellProp);
        }
        sheetDB.push(showRow);
    }
    sheetsContainer.push(sheetDB);
}



function handleSheetDb(sheetIndex) {
    sheetDB = sheetsContainer[sheetIndex]
}

function handleSheetAdctiveness(sheet) {


    sheet.addEventListener('click', (e) => {
        let sheetIndex = Number(sheet.getAttribute('id'));
        handleSheetDb(sheetIndex)
        changeUIofSheet();
        sheetColorActiveness(sheet)
    })

        sheet.click();
};

function sheetColorActiveness(sheet) {
    const totalSheet = document.querySelectorAll('.sheet-folder');
    for (let i = 0; i < totalSheet.length; i++) {
        totalSheet[i].style.backgroundColor = 'transparent';
    }
    sheet.style.backgroundColor = '#b1b1b1';

}


function changeUIofSheet() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let selector = `.cell[rowId = "${i}"][colId= "${j}"]`;
            let cell = document.querySelector(selector);
            let cellProp = sheetDB[i][j];

            cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
            cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
            cell.style.textDecoration = cellProp.underline ? 'underline' : 'none';
            cell.style.fontSize = cellProp.fontSize;
            cell.style.fontFamily = cellProp.fontFamily;
            cell.style.color = cellProp.fontColor;
            cell.style.backgroundColor = cellProp.BGcolor;
            cell.style.textAlign = cellProp.alignment;
            cell.value = cellProp.value;
            formulaBar.value = cellProp.formula;


        }
    }
}

function deleteSheet(sheet, totalNOsheet) {
    sheet.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        let deleteMenu = document.createElement('div');
        deleteMenufunction(sheet, deleteMenu);
        const [yesButton, noButton] = deleteMenuButton(deleteMenu);
        yesButtonClicked(yesButton, sheet, totalNOsheet);
        noButtonClicked(noButton);

    })
}

function yesButtonClicked(yesButton, sheet, totalNOsheet) {
    yesButton.addEventListener('click', (e) => {
        let sheetIndex = Number(sheet.getAttribute('id'));
        if (count > 1 && sheetsContainer.length > 1) {
            //db
            sheetsContainer.splice(sheetIndex, 1);

            //ui
            hideSheetContainer(sheet);
            sheetDB = sheetsContainer[0];
            changeUIofSheet();
        }
        else {
            alert("A workbook must contain at least one visible worksheet.You can't delete it");
        }
        hideDeletePopup();
    })
}

function hideDeletePopup() {
    // document.querySelector('.deleteMenu').style.visibility = 'hidden';
    document.querySelector('.deleteMenu').remove();

}

function noButtonClicked(noButton) {
    noButton.addEventListener('click', (e) => {
        hideDeletePopup();
    })
}

function hideSheetContainer(sheet) {
    sheet.remove();
    const totalSheet = document.querySelectorAll('.sheet-folder')
    count = totalSheet.length;
    for (let i = 0; i < totalSheet.length; i++) {
        totalSheet[i].setAttribute('id', i);
        totalSheet[i].textContent = `Sheet${i + 1}`;
        totalSheet[i].style.backgroundColor = 'transparent';
    }
    
    totalSheet[0].style.backgroundColor = '#b1b1b1';

}



function deleteMenufunction(sheet, deleteMenu) {
    let sheetIndex = Number(sheet.getAttribute('id'));

    deleteMenu.setAttribute('class', 'deleteMenu')
    sheet.appendChild(deleteMenu);


    let paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'paragraph');
    deleteMenu.appendChild(paragraph)
    paragraph.innerText = `Would you want to delete the sheet${sheetIndex + 1}?`;

    deleteMenu.style.textAlign = 'center';
    deleteMenu.style.color = 'white';
    deleteMenu.style.paddingTop = '2px';

}


function deleteMenuButton(deleteMenu) {
    let yesButton = document.createElement('div');
    let noButton = document.createElement('div');
    yesButton.setAttribute('class', 'yesButton');
    noButton.setAttribute('class', 'noButton');
    deleteMenu.appendChild(yesButton);
    deleteMenu.appendChild(noButton);

    yesButton.innerText = 'Yes';
    noButton.innerText = 'No';

    return [yesButton, noButton];
}
