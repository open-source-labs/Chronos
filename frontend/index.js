window.onload = () => {

  // microservice1

  // create
  document.getElementById('create1').addEventListener("click", function create1() {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul')
    newDisplay.id = 'display';
    document.getElementById('container').appendChild(newDisplay);
    const title = document.getElementById('field_A1').value;
    const author = document.getElementById('field_B1').value;
    const numberOfPages = document.getElementById('field_C1').value;
    const publisher = document.getElementById('field_D1').value;
    let book = { title, author, numberOfPages, publisher };
    book = JSON.stringify(book);
    fetch('http://localhost:4545/createbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: book,
    })
      .then(res => res.json())
      .then(data => {
        const newEntry = document.createElement('li');
        newEntry.innerHTML = 'CREATED: ' + data.title;
        document.getElementById('display').appendChild(newEntry);
      });
  });

  // read
  document.getElementById('read1').addEventListener("click", function read1() {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul')
    newDisplay.id = 'display';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:4545/getbooks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i += 1) {
        const newEntry = document.createElement('li');
        const bookInDb = data[i];
        newEntry.innerHTML = 'READ: ' + bookInDb.title;
        document.getElementById('display').appendChild(newEntry);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        newEntry.appendChild(deleteButton);

        // delete
        deleteButton.addEventListener("click", function deleteBook() {
          const display = document.getElementById('display');
          display.remove();
          const newDisplay = document.createElement('ul')
          newDisplay.id = 'display';
          document.getElementById('container').appendChild(newDisplay);
          let url = new URL('http://localhost:4545/deletebook:id?');
          url.searchParams.append('id', bookInDb._id);
          fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(res => res.json())
            .then(data => {
              const newEntry = document.createElement('li');
              newEntry.innerHTML = 'DELETED: ' + data.title;
              document.getElementById('display').appendChild(newEntry);
            });
        })
        }
      });
  });

  // get order info
  document.getElementById('orderInfo').addEventListener('click', function getOrderInfo() {
    const display = document.getElementById('display');
    display.remove();
    const newDisplay = document.createElement('ul')
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of orders';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:4545/getordersinfo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const orderInDb = data[i];
          newEntry.innerHTML = 'ORDER ID: ' + orderInDb._id;
          document.getElementById('display').appendChild(newEntry);
        }
      })
  });

  // microservice2
  document.getElementById('create2').addEventListener("click", function create2() {
    const field_A2 = document.getElementById('field_A2').value;
    const field_B2 = document.getElementById('field_B2').value;
    const field_C2 = document.getElementById('field_C2').value;
    console.log(`CREATE: ${field_A2}, ${field_B2}, ${field_C2}`);
    // send AJAX POST request
  });
  document.getElementById('read2').addEventListener("click", function read2() {
    console.log('read2');
    // send AJAX GET request
  });
  document.getElementById('update2').addEventListener("click", function update2() {
    console.log('update2');
    // send AJAX PUT request
  });
  document.getElementById('delete2').addEventListener("click", function delete2() {
    console.log('delete2');
    // send AJAX DELETE request
  });

  // microservice3  
  document.getElementById('create3').addEventListener("click", function create3() {
    const field_A3 = document.getElementById('field_A3').value;
    const field_B3 = document.getElementById('field_B3').value;
    const field_C3 = document.getElementById('field_C3').value;
    console.log(`CREATE: ${field_A3}, ${field_B3}, ${field_C3}`);
    // send AJAX POST request
  });
  document.getElementById('read3').addEventListener("click", function read3() {
    console.log('read3');
    // send AJAX GET request
  });
  document.getElementById('update3').addEventListener("click", function update3() {
    console.log('update3');
    // send AJAX PUT request
  });
  document.getElementById('delete3').addEventListener("click", function delete3() {
    console.log('delete3');
    // send AJAX DELETE request
  });
};
