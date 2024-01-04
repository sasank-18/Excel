let tempDB = [];
let copy = document.querySelector('.copy')
let paste = document.querySelector('.paste')
let cut = document.querySelector('.cut');
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let selector = `.cell[rowId = "${i}"][colId= "${j}"]`
        let cell = document.querySelector(selector);
        cellSelectorHelper(cell)
        removeRangeSelectorBorder(cell)
    }
}


let rangeStorage = [];
function cellSelectorHelper(cell) {
    cell.addEventListener('mousedown', (e) => {
        if (!e.altKey) return;
        if (rangeStorage.length >= 2) return;
        let cellRowID = Number(cell.getAttribute('rowid'));
        let cellColID = Number(cell.getAttribute('colid'));
        rangeStorage.push([cellRowID, cellColID]);

        // console.log(rangeStorage)
        cell.style.border = "2px dashed #40005c";



    })
}




copy.addEventListener('click', handleCopyFunction);
document.addEventListener('keydown', handleCopyFunction);
cut.addEventListener('click', handleCutFunction);

let tempRangeStorage = [];

function handleCutFunction(event) {

    handleCopyFunction(event);

    for (let i = 0; i < rangeStorage.length; i++) {
        let range = rangeStorage[i]
        let rid = range[0];
        let cid = range[1];
        tempRangeStorage.push([rid, cid]);
    }
}




function handleCopyFunction(event) {
    if (event.type === 'keydown') {
        if (!event.ctrlKey) return;
        if (event.key != 'c') return;
    }

    tempDB.splice(0, tempDB.length)

    if (rangeStorage.length === 1) {
        let datapoint = rangeStorage[0];
        let rowDB = [];
        let rid = datapoint[0] + 1;
        let cid = String.fromCharCode(65 + datapoint[1]);
        let rangeAddress = `${cid}${rid}`;
        let [rangeCell, cellProp] = activeCell(rangeAddress);
        rowDB.push([rangeAddress, cellProp]);
        tempDB.push(rowDB);
        return;
    }

    if (rangeStorage.length === 0) {
        alert("Select at least one Cell")
        return;
    }

    let datapoint1 = rangeStorage[0];
    let datapoint2 = rangeStorage[1];
    console.log(datapoint1);
    console.log(datapoint2);
    for (let i = datapoint1[0]; i <= datapoint2[0]; i++) {
        let rowDB = [];
        for (let j = datapoint1[1]; j <= datapoint2[1]; j++) {
            let rid = i + 1;
            let cid = String.fromCharCode(65 + j);
            let rangeAddress = `${cid}${rid}`;
            let [rangeCell, cellProp] = activeCell(rangeAddress);
            rowDB.push([rangeAddress, cellProp]);
        }
        tempDB.push(rowDB);
    }
    console.log(tempDB)
}



paste.addEventListener('click', handlePasteFunction);
document.addEventListener('keydown', handlePasteFunction);

function handlePasteFunction(event) {
    if (event.type === 'keydown') {
        if (!event.ctrlKey) return;
        if (event.key != 'v') return;
    }



    if (!tempDB.length) return;


    let addressbarValue = addressBar.value;
    const [r, c] = decodeAddress(addressbarValue);
    console.log(r, c);
    let count = 0;
    console.log(tempDB.length);
    for (let i = 0; i < tempDB.length; i++) {
        let rowDB = tempDB[count];
        for (let j = 0; j < rowDB.length; j++) {

            let cellArray = rowDB[j];
            let CellAddress = cellArray[0];
            let cellProp = cellArray[1];
            // let [Cell, cellProp] = activeCell(data);

            //    copying to 
            let rowid = r + i + 1;
            let colid = String.fromCharCode(65 + c + j);
            let CopyingrangeAddress = `${colid}${rowid}`;
            let [copyingCell, copyingCellProp] = activeCell(CopyingrangeAddress);
            copypastefuncton(CellAddress, cellProp, copyingCell, copyingCellProp, CopyingrangeAddress)

        }
        count++;
    }

    CutDataForCutPaste();


}

function CutDataForCutPaste() {
    if (tempRangeStorage.length > 1) {
        let datapoint1 = tempRangeStorage[0];
        let datapoint2 = tempRangeStorage[1];
        for (let i = datapoint1[0]; i <= datapoint2[0]; i++) {
            for (let j = datapoint1[1]; j <= datapoint2[1]; j++) {
                let rid = i + 1;
                let cid = String.fromCharCode(65 + j);
                let rangeAddress = `${cid}${rid}`;
                let [cell, cellProp] = activeCell(rangeAddress);
                deleteCellProp(cell, cellProp, rid, cid);
            }
        }
        tempRangeStorage.splice(0, tempRangeStorage.length);
    }
    else if (tempRangeStorage.length === 1) {
        let datapoint = tempRangeStorage[0];
        let rid = datapoint[0] + 1;
        let cid = String.fromCharCode(65 + datapoint[1]);
        let rangeAddress = `${cid}${rid}`;
        let [cell, cellProp] = activeCell(rangeAddress);
        deleteCellProp(cell, cellProp, rid, cid);
        tempRangeStorage.splice(0, tempRangeStorage.length);
    }
}

function deleteCellProp(cell, cellProp, rid, cid) {
    cell.value = "";
    cellProp.value = "";

    cell.style.backgroundColor = 'white';
    cellProp.BGcolor = "white";

    cell.style.fontWeight = 'normal';
    cellProp.bold = '';

    cell.style.fontStyle = 'normal';
    cellProp.italic = "";

    cell.style.textDecoration = 'none';
    cellProp.underline = 'none';

    cell.style.fontSize = '14px'
    cellProp.fontSize = '14px';

    cell.style.fontFamily = 'monospace';
    cellProp.fontFamily = 'monospace';

    cell.style.color = 'black'
    cellProp.fontColor = 'black';

    cell.style.backgroundColor = 'white'
    cellProp.BGcolor = 'white'

    cell.style.textAlign = 'left'
    cellProp.alignment = 'left'

    cellProp.formula = '';
    formulaBar.value = "";

    cellProp.dependencyArray.splice(0, cellProp.dependencyArray.length);
}

function copypastefuncton(CellAddress, cellProp, copyingCell, copyingCellProp, CopyingrangeAddress) {

    copyingCell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
    copyingCellProp.bold = cellProp.bold;

    copyingCell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
    copyingCellProp.italic = cellProp.italic;

    copyingCell.style.textDecoration = cellProp.underline ? 'underline' : 'none';
    copyingCellProp.underline = cellProp.underline;

    copyingCell.style.fontSize = cellProp.fontSize;
    copyingCellProp.fontSize = cellProp.fontSize;

    copyingCell.style.fontFamily = cellProp.fontFamily;
    copyingCellProp.fontFamily = cellProp.fontFamily;

    copyingCell.style.color = cellProp.fontColor;
    copyingCellProp.fontColor = cellProp.fontColor;

    copyingCell.style.backgroundColor = cellProp.BGcolor;
    copyingCellProp.BGcolor = cellProp.BGcolor;

    copyingCell.style.textAlign = cellProp.alignment;
    copyingCellProp.alignment = cellProp.alignment;

    copyingCell.value = cellProp.value;
    copyingCellProp.value = cellProp.value;


    // only for cut paste not for copy paste;
    //for dependencyArray


    if (tempRangeStorage.length > 0) {

        if (copyingCellProp.dependencyArray.length > 0) {
            copyingCellProp.dependencyArray.splice(0, copyingCellProp.dependencyArray.length);
        };

        // for child elmenet -- when cutting the child element of any parent element
        manageChildCellofPerviousCell(cellProp, copyingCellProp, CellAddress, CopyingrangeAddress)


        //for parent element-- when cut the parent element 
        manageParentCellofCuttingCell(cellProp, copyingCellProp, CellAddress, CopyingrangeAddress)

    }




}

function manageParentCellofCuttingCell(cellProp, copyingCellProp, CellAddress, CopyingrangeAddress) {
    for (let i = 0; i < cellProp.dependencyArray.length; i++) {
        let data = cellProp.dependencyArray[i];
        let [chidcell, chidcellProp] = activeCell(data);
        let chidformula = chidcellProp.formula;
        let FormulaInArray = extractingA1_A2_IN_Array(chidformula);
        for (let i = 0; i < FormulaInArray.length; i++) {
            if (FormulaInArray[i] === CellAddress) {
                FormulaInArray[i] = CopyingrangeAddress;
            }
        }
        let resultString = FormulaInArray.join("");
        chidcellProp.formula = resultString;

        copyingCellProp.dependencyArray.push(data);
    };
}


function manageChildCellofPerviousCell(cellProp, copyingCellProp, CellAddress, CopyingrangeAddress) {
    copyingCellProp.formula = cellProp.formula;
    //  formulaBar.value = copyingCellProp.formula;
    let FormulaArray = extractingA1_A2_IN_Array(copyingCellProp.formula);
    let arryofA1_A2 = Fetch_A1_A2_fromFormula(copyingCellProp.formula);
    console.log(arryofA1_A2);

    if (arryofA1_A2) {

        for (let i = 0; i < arryofA1_A2.length; i++) {
            let [celll, ceellprop] = activeCell(arryofA1_A2[i]);
            for (let i = 0; i < ceellprop.dependencyArray.length; i++) {
                if (ceellprop.dependencyArray[i] === CellAddress) {
                    ceellprop.dependencyArray[i] = CopyingrangeAddress;
                }
            }
        }
    }

}






function removeRangeSelectorBorder(cell) {
    cell.addEventListener('click', (e) => {
        if (cell.style.border) return;
        if (!rangeStorage.length) return;

        for (let i = 0; i < rangeStorage.length; i++) {
            let range = rangeStorage[i]
            let rid = range[0] + 1;
            let cid = String.fromCharCode(65 + range[1]);
            let rangeAddress = `${cid}${rid}`;
            let [rangeCell, cellProp] = activeCell(rangeAddress);
            rangeCell.style.border = "1px solid #dfe4ea";

        }
        rangeStorage.splice(0, 2);

    })
}
