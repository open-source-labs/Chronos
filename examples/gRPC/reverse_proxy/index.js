document.addEventListener('DOMContentLoaded', () => {
  console.log('hello');
  const addBookBtn = document.getElementById('create1');
  addBookBtn.addEventListener('click', addBook);
  const addOrderBtn = document.getElementById('create3');
  addOrderBtn.addEventListener('click', addOrder);
  const getOrdersBtn = document.getElementById('orderInfo');
  getOrdersBtn.addEventListener('click', getOrders);
});

const addBook = () => {
  const title = document.getElementById('field_A1').value;
  const author = document.getElementById('field_B1').value;
  const numberOfPages = document.getElementById('field_C1').value;
  const publisher = document.getElementById('field_D1').value;
  const bookID = document.getElementById('field_E1').value;
  if (title !== '' && author !== '' && numberOfPages !== '' && publisher !== '') {
    fetch('/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, numberOfPages, publisher, bookID }),
    }).catch(err => {
      console.log(err);
    });
  }
};

const addOrder = () => {
  const customerID = document.getElementById('field_A3').value;
  const bookID = document.getElementById('field_B3').value;
  const purchaseDate = document.getElementById('field_C3').value;
  const deliveryDate = document.getElementById('field_D3').value;
  if (customerID !== '' && bookID !== '' && purchaseDate !== '' && deliveryDate !== '') {
    fetch('/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerID, bookID, purchaseDate, deliveryDate }),
    }).catch(err => {
      console.log(err);
    });
  }
};

const getOrders = () => {
  const display = document.querySelector('#display');
  
  // remove currently displayed list items
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }

  fetch('http://localhost:3000/orders', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      data.orderList.forEach(order => {
        const orderListItem = document.createElement('li');
        const orderListItemText = document.createTextNode(`CustomerID: ${order.customerID}. Purchase Date: ${order.purchaseDate}. Delivery Date: ${order.deliveryDate}. Book Info: ${order.title} by ${order.author}, ${order.publisher}, ${order.numberOfPages} pages.`);
        orderListItem.appendChild(orderListItemText);

        display.appendChild(orderListItem);
      });
    });
};
