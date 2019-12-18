window.onload = () => {

  // microservice1
  document.getElementById('create1').addEventListener("click", function create1() {
    const field_A1 = document.getElementById('field_A1').value;
    const field_B1 = document.getElementById('field_B1').value;
    const field_C1 = document.getElementById('field_C1').value;
    console.log(`CREATE: ${field_A1}, ${field_B1}, ${field_C1}`);
    // send AJAX POST request
  });
  document.getElementById('read1').addEventListener("click", function read1() {
    console.log('read1');
    // send AJAX GET request
  });
  document.getElementById('update1').addEventListener("click", function update1() {
    console.log('update1');
    // send AJAX PUT request
  });
  document.getElementById('delete1').addEventListener("click", function delete1() {
    console.log('delete1');
    // send AJAX DELETE request
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
