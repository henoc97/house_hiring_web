




function getUnvalidReceiptsRequest() {
    let token = localStorage.getItem('accessToken');
    fetch(host + 'receipt_unValid', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log("data received:", data); // Log les données reçues

      // Si les propriétés sont enveloppées dans un objet { myProperties }
      const unvaliReceipts = data;

      const tableBody = document.getElementById("unvaliReceiptsTable");
      if (tableBody) {
        tableBody.innerHTML = ''; // Clear existing rows

        unvaliReceipts.forEach((unvalidReceipt) => {
          console.log("unvaliReceipts data:", unvalidReceipt); // Log chaque propriété
          const row = document.createElement('tr');
          row.innerHTML = `
                <td>${unvalidReceipt.firstname} ${unvalidReceipt.lastname.split(' ')[0]}</td>
                <td>${unvalidReceipt.monthpayed}</td>
                <td>
                    <span class="badge bg_worning">${unvalidReceipt.address_property}</span>
                </td>
                <td>
                ${unvalidReceipt.sumpayed}
                </td>
                <td>
                    <a href="#" class="govalidreceipt" data-receipt='${JSON.stringify(unvalidReceipt)}'>
                      <span class="badge bg_danger">Non approuvé</span>
                    </a>
                 </td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Element with ID 'tenantspropertiesTable' not found.");
      }
    })
    .catch((error) => console.error('Error fetching tenantsproperties:', error));
  }



