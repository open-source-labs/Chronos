document.addEventListener('DOMContentLoaded', () => {
  const addBookBtn = document.getElementById('create1');
  addBookBtn.addEventListener('click', addBook);
  const addOrderBtn = document.getElementById('create3');
  addOrderBtn.addEventListener('click', addOrder);
  const getOrdersBtn = document.getElementById('orderInfo');
  getOrdersBtn.addEventListener('click', getOrders);
  const display = document.querySelector('#display');
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
    })
      .then(response => {
        // remove currently displayed list items
        while (display.firstChild) {
          display.removeChild(display.firstChild);
        }
        const listItem = document.createElement('li');
        const listItemText = response.status === 409 ? 'BookID must be unique.' : 'Book added.';
        listItem.appendChild(document.createTextNode(listItemText));
        display.appendChild(listItem);
      })
      .catch(err => {
        console.log("error in the addBook method: ", err);
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
    })
      .then(response => {
        // remove currently displayed list items
        while (display.firstChild) {
          display.removeChild(display.firstChild);
        }
        const listItem = document.createElement('li');
        const listItemText = response.status === 404 ? 'BookID does not exist.' : 'Order added.';
        listItem.appendChild(document.createTextNode(listItemText));
        display.appendChild(listItem);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getOrders = () => {
  fetch('http://localhost:3000/order', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      // remove currently displayed list items
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      data.orderList.forEach(order => {
        const orderListItem = document.createElement('li');
        const orderListItemText = document.createTextNode(
          `CustomerID: ${order.customerID}. Purchase Date: ${order.purchaseDate}. Delivery Date: ${order.deliveryDate}. Book Info: ${order.title} by ${order.author}, ${order.publisher}, ${order.numberOfPages} pages.`
        );
        orderListItem.appendChild(orderListItemText);
        display.appendChild(orderListItem);
      });
    });
};
