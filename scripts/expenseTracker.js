const itemInputElement = document.querySelector('.description');
const amountInputElement = document.querySelector('.input-amount');
const addBtn = document.querySelector('.add-btn');
const message = document.querySelector('.js-message');
const totalDisplay = document.querySelector('.total');

let storedValues = JSON.parse(localStorage.getItem('expenses')) || [];

renderExpenses();

addBtn.addEventListener('click', () => {
  const item = itemInputElement.value.trim();
  const amount = parseFloat(amountInputElement.value);
  
  if(!item || isNaN(amount) || amount <= 0 ) {
    alert('Enter Valid Data');
    return;
  }

  const expense = { item, amount };
  storedValues.push(expense);
  saveAndRender();

  itemInputElement.value = '';
  amountInputElement.value = '';

});

function renderExpenses() {
  message.innerHTML = '';
  storedValues.forEach((expense, index) => {
    const div = document.createElement('div');
    div.classList.add('expense-item');

    div.innerHTML = `
      <span>${expense.item} - Rs.${expense.amount}</span>
      <button class = "delete-btn">Delete</button>
      `;

      const deleteBtn = div.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        storedValues.splice(index, 1);
        saveAndRender();
      });

      message.appendChild(div);
  });

  const total = storedValues.reduce((sum, item) => sum + item.amount, 0);
  totalDisplay.textContent = `Total: Rs.${total}`;
}


function saveAndRender() {
  localStorage.setItem('expenses', JSON.stringify(storedValues));
  renderExpenses();
}