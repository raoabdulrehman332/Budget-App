let totalAmount = document.getElementById("total-amount-input");
let userAmount = document.getElementById("product-cost");
const CheckAmountBtn = document.getElementById("check-submit");
const totalAmountBtn = document.getElementById("total-amount");
const productTitle = document.getElementById("product-title");
const productCost = document.getElementById("product-cost");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expendiTureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

//  set Badget part 
totalAmountBtn.addEventListener("click",()=>{
    tempAmount = totalAmount.value
    //  empty or negative input
    if(tempAmount === "" || tempAmount < 0){
        errorMessage.classList.remove("hide");
        errorMessage.classList.add("error");
        
    }else{
        errorMessage.classList.add("hide");
        // Set Budget 
        amount.innerHTML = tempAmount;
        // Set balance 
        balanceValue.innerHTML = tempAmount - expendiTureValue.innerText;
        // clear input box
        totalAmount.value = "";
    }
})

// function to disabe edit and delet button
const disableButton = (bool)=>{
    let editButton = document.getElementsByClassName("edit")
    Array.from(editButton).forEach(element =>{
        element.disabled = bool
    })
}

// Function to Modify list Elements
const modifyElement = (element, edit = false)=>{
    let parentDiv = element.parentElement;
    let currenttBalance = balanceValue.innerText;
    let currenttExpense = expendiTureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;

    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButton(true);
    }

  balanceValue.innerText = parseInt(parentAmount);
  expendiTureValue.innerText = parseInt(currenttExpense) - parseInt(parentAmount);
  parentDiv.remove();
}

// Function to creat Expenses list

const listCreat = (expenseName, expenseValue)=>{
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content","flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid","fa-pen-to-square","edit")
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click",()=>{
        modifyElement(editButton, true);

    })
// <i class="fa-solid fa-trash-can"></i>
    let deletButton = document.createElement("button");
    deletButton.classList.add("fa-solid","fa-trash-can","delete")
    deletButton.style.fontSize = "24px";
    deletButton.addEventListener("click",()=>{
        modifyElement(deletButton);
    })

    subListContent.appendChild(editButton)
    subListContent.appendChild(deletButton)
    document.getElementById("list").appendChild(subListContent)

   
};

// Function to calculate Expenses and balance
CheckAmountBtn.addEventListener("click",()=>{

    // empty check
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hide");
        return false;

    }

    // Enable buttons 
    disableButton(false);

    // Expense
    let expenditure  = parseInt(userAmount.value);

    // Total Expense (existing + new)
    let sum = parseInt(expendiTureValue.innerText) + expenditure ;
    expendiTureValue.innerText = sum;

    // Total balance (budget - total expense)
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    // creat list
    listCreat(productTitle.value,userAmount.value);
    // empty inputs 
    productTitle.value = "";
    userAmount.value = "" ;
})

