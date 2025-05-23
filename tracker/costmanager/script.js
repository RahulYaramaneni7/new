let items = [];
let otherCosts = [];

const itemList = document.getElementById('itemList');
const otherCostList = document.getElementById('otherCostList');
const totalCostEl = document.getElementById('totalCost');

document.getElementById('itemForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('itemName').value.trim();
  const cost = parseFloat(document.getElementById('itemCost').value);
  if (!name || cost < 0) return alert("Valid name and positive cost required");

  items.push({ id: Date.now(), name, cost });
  renderLists();
  this.reset();
});

document.getElementById('otherCostForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const desc = document.getElementById('costDescription').value.trim();
  const amount = parseFloat(document.getElementById('costAmount').value);
  if (!desc || amount < 0) return alert("Valid description and positive amount required");

  otherCosts.push({ id: Date.now(), desc, amount });
  renderLists();
  this.reset();
});

function deleteItem(id, type) {
  if (type === 'item') {
    items = items.filter(i => i.id !== id);
  } else {
    otherCosts = otherCosts.filter(c => c.id !== id);
  }
  renderLists();
}

function renderLists() {
  itemList.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - $${item.cost.toFixed(2)}
      <div class="actions">
        <button onclick="deleteItem(${item.id}, 'item')">Delete</button>
      </div>`;
    itemList.appendChild(li);
  });

  otherCostList.innerHTML = '';
  otherCosts.forEach(cost => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${cost.desc} - $${cost.amount.toFixed(2)}
      <div class="actions">
        <button onclick="deleteItem(${cost.id}, 'other')">Delete</button>
      </div>`;
    otherCostList.appendChild(li);
  });

  const total = items.reduce((sum, i) => sum + i.cost, 0) + otherCosts.reduce((sum, c) => sum + c.amount, 0);
  totalCostEl.textContent = total.toFixed(2);
}
