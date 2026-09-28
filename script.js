const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const expenseCategory = document.querySelector("#expenseCategory");
const addExpenseBtn = document.querySelector("#addExpenseBtn");
const expenseForm = document.querySelector("#expenseForm");
const expenseList = document.querySelector("#expenseList");
const totalExpense = document.querySelector("#totalExpense");
const emptyMessage = document.querySelector("#emptyMessage");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameValue = expenseName.value.trim();
  if(nameValue === "" || expenseAmount.value === ""){
    alert("Please fill the Expense name & amount");
    return;
  }

  let newExpenseObj = {
    id: Date.now(),
    name: nameValue,
    amount: expenseAmount.value,
    category: expenseCategory.value,
  };
  expenses.push(newExpenseObj);
  renderExpenses(expenses);
  totalExpenseCal();
  saveExpenses();
  expenseForm.reset();
});

function renderExpenses(expenseArray) {
  expenseList.innerHTML = "";
  emptyMessage.style.display = expenseArray.length === 0 ? "block" : "none";
  expenseArray.forEach(( e) => {
    let li = document.createElement("li");
    li.classList.add("expense-item");
    expenseList.appendChild(li);
    let eName = document.createElement("div");
    eName.innerText = e.name;
    eName.classList.add("expense-info");
    li.appendChild(eName);
    let eAmount = document.createElement("div");
    eAmount.innerText = e.amount;
    eAmount.classList.add("expense-amount");
    li.appendChild(eAmount);
    let eCategory = document.createElement("div");
    eCategory.innerText = e.category;
    eCategory.classList.add("expense-info");
    li.appendChild(eCategory);
    let dltBtn = document.createElement("button");
    dltBtn.innerText = "Delete";
    dltBtn.classList.add("delete-btn");
    li.appendChild(dltBtn);


    dltBtn.addEventListener("click", () => {
      expenses = expenses.filter((item) => {
        return item.id !== e.id;
      });
      renderExpenses(expenses);
      totalExpenseCal();
      saveExpenses();
    });
  });

}

renderExpenses(expenses);
totalExpenseCal();


function totalExpenseCal(){
  const totalExp = expenses.reduce((pre, curr) => {
    return pre + Number(curr.amount);
  },0)
  totalExpense.innerText = totalExp;
}

function saveExpenses(){
  localStorage.setItem("expenses", JSON.stringify(expenses));
}


  expenseCategory.addEventListener("change", () => {
    if(expenseCategory.value === "all"){
      return renderExpenses(expenses);
    }
    let filteredCategory = expenses.filter((c) => {
     return expenseCategory.value === c.category;
    })
    renderExpenses(filteredCategory);
    totalExpenseCal();
  })