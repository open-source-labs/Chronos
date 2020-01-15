window.onload = () => {
  // microservice1 - Books
  const microservicePort = { 3000: 'Reverse Proxy', 4545: 'Books', 7777: 'Orders', 5555: 'Customers' };
  // sets the title of the page to whatever port you're currently on
  document.title = microservicePort[window.location.port];
  // create a display that when clicked will grab the books passed in
  //  and send it to the database to be stored
  document.getElementById('create1').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    document.getElementById('container').appendChild(newDisplay);
    const title = document.getElementById('field_A1').value;
    const author = document.getElementById('field_B1').value;
    const numberOfPages = document.getElementById('field_C1').value;
    const publisher = document.getElementById('field_D1').value;
    if (!title || !author || !numberOfPages || !publisher) {
      return alert("Every Books field must be completed");
    }
    let book = {
      title, author, numberOfPages, publisher,
    };
    book = JSON.stringify(book);
    fetch('http://localhost:3000/books/createbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: book,
    })
      .then((res) => res.json())
      //  display the result of the action just taken
      .then((data) => {
        const newEntry = document.createElement('li');
        newEntry.innerHTML = `CREATED: ${data.title}`;
        document.getElementById('display').appendChild(newEntry);
      });
  });

  // read functionality
  document.getElementById('read1').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of books';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:3000/books/getbooks', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const bookInDb = data[i];
          newEntry.innerHTML = `READ: ${bookInDb.title}`;
          document.getElementById('display').appendChild(newEntry);
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'Delete';
          newEntry.appendChild(deleteButton);
          // the items displayed from the read's completed execution
          // displays a new 'ul' for each item and appended on that
          //  is it's associated delete button functionality
          deleteButton.addEventListener('click', () => {
            const display = document.getElementById('display');
            display.remove();
            const newDisplay = document.createElement('ul');
            newDisplay.id = 'display';
            document.getElementById('container').appendChild(newDisplay);
            const url = new URL('http://localhost:3000/books/deletebook:id?');
            url.searchParams.append('id', bookInDb._id);
            fetch(url, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            })
              .then((res) => res.json())
              .then((data) => {
                const newEntry = document.createElement('li');
                newEntry.innerHTML = `DELETED: ${data.title}`;
                document.getElementById('display').appendChild(newEntry);
              });
          });
        }
      });
  });

  // get orders info
  document.getElementById('ordersInfo').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of orders';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:3000/books/getordersinfo', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const orderInDb = data[i];
          newEntry.innerHTML = `ORDER ID: ${orderInDb._id}`;
          document.getElementById('display').appendChild(newEntry);
        }
      });
  });

  // microservice2 - Customers
  // create
  document.getElementById('create2').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    document.getElementById('container').appendChild(newDisplay);
    const name = document.getElementById('field_A2').value;
    const age = document.getElementById('field_B2').value;
    const address = document.getElementById('field_C2').value;
    if (!name || !age || !address) {
      return alert("Every Customers field must be completed");
    }
    let customer = {
      name, age, address,
    };
    customer = JSON.stringify(customer);
    fetch('http://localhost:3000/customers/createcustomer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: customer,
    })
      .then((res) => res.json())
      .then((data) => {
        const newEntry = document.createElement('li');
        newEntry.innerHTML = `CREATED: ${data.name}`;
        document.getElementById('display').appendChild(newEntry);
      });
  });

  // read
  document.getElementById('read2').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of customers';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:3000/customers/getcustomers', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const customerInDb = data[i];
          newEntry.innerHTML = `READ: ${customerInDb.name}`;
          document.getElementById('display').appendChild(newEntry);
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'Delete';
          newEntry.appendChild(deleteButton);

          // delete
          deleteButton.addEventListener('click', () => {
            const display = document.getElementById('display');
            display.remove();
            const newDisplay = document.createElement('ul');
            newDisplay.id = 'display';
            document.getElementById('container').appendChild(newDisplay);
            const url = new URL('http://localhost:3000/customers/deletecustomer:id?');
            url.searchParams.append('id', customerInDb._id);
            fetch(url, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            })
              .then((res) => res.json())
              .then((data) => {
                const newEntry = document.createElement('li');
                newEntry.innerHTML = `DELETED: ${data.name}`;
                document.getElementById('display').appendChild(newEntry);
              });
          });
        }
      });
  });

  // get books info
  document.getElementById('booksInfo').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of books';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:3000/customers/getbooksinfo', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const bookInDb = data[i];
          newEntry.innerHTML = `TITLE: ${bookInDb.title}`;
          document.getElementById('display').appendChild(newEntry);
        }
      });
  });

  // microservice3 - Orders
  document.getElementById('create3').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    document.getElementById('container').appendChild(newDisplay);
    const customerID = document.getElementById('field_A3').value;
    const bookID = document.getElementById('field_B3').value;
    const purchaseDate = document.getElementById('field_C3').value;
    const deliveryDate = document.getElementById('field_D3').value;
    if (!customerID || !bookID || !purchaseDate || !deliveryDate) {
      return alert("Every Orders field must be completed");
    }
    let order = {
      customerID,
      bookID,
      purchaseDate,
      deliveryDate,
    };
    order = JSON.stringify(order);
    fetch('http://localhost:3000/orders/createorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: order,
    })
      .then((res) => res.json())
      .then((data) => {
        const newEntry = document.createElement('li');
        newEntry.innerHTML = `CREATED: OrderID: ${data._id}`;
        document.getElementById('display').appendChild(newEntry);
      });
  });

  // read
  document.getElementById('read3').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of orders';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:3000/orders/getorders', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const orderInDb = data[i];
          newEntry.innerHTML = `ORDER ID: ${orderInDb._id}`;
          document.getElementById('display').appendChild(newEntry);
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'Delete';
          newEntry.appendChild(deleteButton);

          // delete
          deleteButton.addEventListener('click', () => {
            const display = document.getElementById('display');
            display.remove();
            const newDisplay = document.createElement('ul');
            newDisplay.id = 'display';
            document.getElementById('container').appendChild(newDisplay);
            const url = new URL('http://localhost:3000/orders/deleteorder:id?');
            url.searchParams.append('id', orderInDb._id);
            fetch(url, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            })
              .then((res) => res.json())
              .then((data) => {
                const newEntry = document.createElement('li');
                newEntry.innerHTML = `DELETED: ${orderInDb._id}`;
                document.getElementById('display').appendChild(newEntry);
              });
          });
        }
      });
  });
  // get customers info
  document.getElementById('customersInfo').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of customers';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:3000/orders/getcustomersinfo', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const customerInDb = data[i];
          newEntry.innerHTML = `NAME: ${customerInDb.name}`;
          document.getElementById('display').appendChild(newEntry);
        }
      });
  });
};
