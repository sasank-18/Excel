
for (let i = 0; i < rows; i++) { 
    for (let j = 0; j < cols; j++) {
        let selector = `.cell[rowId = "${i}"][colId= "${j}"]`
        let singleCell = document.querySelector(selector);
        singleCell.addEventListener('blur', () => {
            let [cell, cellProp] = activeCell(addressBar.value);
        //  cell.style.backgroundColor ='red';
        //  singleCell.value='hello'
            previousValue = cellProp.value;
            cellProp.value = cell.value;

            if (cellProp.dependencyArray.length>0 && previousValue != cell.value) {
                let childArray = cellProp.dependencyArray;
                recursiveCallForDependencyArray(childArray);
      
            }
        })
    }
}

function recursiveCallForDependencyArray(childArray){

    for(let i=0;i<childArray.length;i++){
        let [cell, cellProp] = activeCell(childArray[i]);
          childrenCellValueChanges(childArray[i]);
         let childArrayOfChildren = cellProp.dependencyArray;
          recursiveCallForDependencyArray(childArrayOfChildren);
          
    }
    return ;
}


function childrenCellValueChanges(childArray) {

        let [cell, cellProp] = activeCell(childArray);
        let formula = cellProp.formula;
        let FormulaInArray = extractingA1_A2_IN_Array(formula);
        let finalformula = resultforumula_Evaluate(FormulaInArray);
        let result = eval(finalformula);
        cell.value = result;
        cellProp.value = result;
}


formulaBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && formulaBar.value) {
        let str = formulaBar.value;
        let pattern = /[A-Za-z]/;


        if (pattern.test(str)) {
            // dependency expression (A1+A2+10)

            let FormulaInArray = extractingA1_A2_IN_Array(formulaBar.value);
            let finalformula = resultforumula_Evaluate(FormulaInArray)



            let [cell, cellProp] = activeCell(addressBar.value);
            //remove child form parent if formula is changed by user
            if (cellProp.formula) {
               let FormulaOfChild = cellProp.formula;
               console.log(FormulaOfChild)
              let FormulaCells= Fetch_A1_A2_fromFormula(FormulaOfChild);
              console.log(FormulaCells)
            
                removeChildFromParent(FormulaCells);
            }
            let result = eval(finalformula);
            cell.value = result;
            cellProp.value = result;
            cellProp.formula = formulaBar.value;
            // to add child to a parent 
            FormulaInArray = extractingA1_A2_IN_Array(formulaBar.value);
            addChidToParent(FormulaInArray)

            // console.log(sheetDB);/*  */
        }
        else {
            // normal expression (10+2) 
            let [cell, cellProp] = activeCell(addressBar.value);
            let result = eval(formulaBar.value);
            cell.value = result;
            cellProp.value = result;
            cellProp.formula = formulaBar.value;
        }
    }

})

function Fetch_A1_A2_fromFormula(FormulaOfChild){
    var expression = "(A1+A2+10)";
    var pattern = /[A-Z]\d+/g; // Regular expression to match uppercase letters followed by digits
    
    var matches = FormulaOfChild.match(pattern);
    return matches;
}


function removeChildFromParent(formula){
    // let FormulaInArray = extractingA1_A2_IN_Array(formula);
    for(let i =0 ;i<formula.length;i++){
        console.log('hello',formula[i])
        let [Parentcell, ParentcellProp] = activeCell(formula[i]);
        console.log('dude',ParentcellProp.dependencyArray);
        
        let elementToRemove= addressBar.value;
        let indexToRemove= ParentcellProp.dependencyArray.indexOf(elementToRemove);
        if(indexToRemove!==-1){
            ParentcellProp.dependencyArray.splice(indexToRemove, 1);
        }
        console.log(ParentcellProp.dependencyArray);
    }
}

function extractingA1_A2_IN_Array(Bar_formula) {
    var expression = Bar_formula;
    // Use regular expression to split the expression into elements
    var elements = expression.split(/([A-Za-z0-9]+|[+\-*/])/);
    // Remove any empty or whitespace elements from the array
    elements = elements.filter(function (element) {
        return element.trim() !== "";
    });
    return elements;
}

function addChidToParent(formula) {
    for (let i = 0; i < formula.length; i++) {
        let asciValue = formula[i].charCodeAt(0);
        if (asciValue >= 65 && asciValue <= 90) {
            let [cell, cellProp] = activeCell(formula[i]);
            let childCellValue = addressBar.value;
            if (!cellProp.dependencyArray.includes(childCellValue)) {
                cellProp.dependencyArray.push(childCellValue);
            }
        }
    }
}



function resultforumula_Evaluate(formula) {
    for (let i = 0; i < formula.length; i++) {
        let asciValue = formula[i].charCodeAt(0);
        if (asciValue >= 65 && asciValue <= 90) {
            let [cell, cellProp] = activeCell(formula[i]);
            formula[i] = cellProp.value;
            // let childCellValue = addressBar.value;
            // if (!cellProp.dependencyArray.includes(childCellValue)) {
            //     cellProp.dependencyArray.push(childCellValue);
            // } 
        }
    }
    return formula.join("");
}




