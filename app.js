const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("income");
const moneyMinus = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];
const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));

function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount > 0 ? "+" : "-";
    const icon = transaction.amount > 0 ? "up" : "down";
    const item = document.createElement("li");
    item.classList.add(transaction.amount > 0 ? "plus" : "minus");
    item.innerHTML = `
        <h4>${transaction.text}</h4>
        <span>${sign}$${Math.abs(transaction.amount)}
            <i class="fa fa-caret-${icon}" aria-hidden="true"></i>
            <i class="fa fa-trash-alt delete" onclick="removeItem(${transaction.id})"></i>
        </span>
    `;
    list.appendChild(item);
}

function updateValue() {
    const amounts = transactions.map(item => item.amount);
    const total = amounts.reduce((a, b) => (a += b), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((a, b) => (a += b), 0).toFixed(2);
    const expense = amounts.filter(item => item < 0).reduce((a, b) => (a += b), 0).toFixed(2);

    balance.innerHTML = `$${total}`;
    moneyPlus.innerHTML = `$${income}`;
    moneyMinus.innerHTML = `$${Math.abs(expense)}`;
}

function randomId() {
    return Math.floor(Math.random() * 1000);
}

// Add transaction on form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please fill out both fields');
    } else {
        const transaction = {
            id: randomId(),
            text: text.value,
            amount: parseInt(amount.value)
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValue();

        // Clear the input fields
        text.value = "";
        amount.value = "";
    }
});

function removeItem(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

// Initialize app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValue();
}

init();
