


function getTenantsPropertiesRequest() {
    let token = localStorage.getItem('accessToken');
    fetch(host + 'TenantsProperties', {
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
      const tenantsproperties = data;

      const tableBody = document.getElementById("tenantspropertiesTable");
      if (tableBody) {
        tableBody.innerHTML = ''; // Clear existing rows

        properties.forEach((tenantproperty) => {
          console.log("tenantsproperties data:", tenantproperty); // Log chaque propriété
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${tenantproperty.firstname} ${tenantproperty.lastname}</td>
            <td>${tenantproperty.contanctmoov} / ${tenantproperty.contancttg}</td>
            <td>${tenantproperty.address_property}</td>
            <td>${tenantproperty.price}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Element with ID 'tenantspropertiesTable' not found.");
      }
    })
    .catch((error) => console.error('Error fetching tenantsproperties:', error));
  }