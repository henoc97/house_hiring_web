



function setNumberOfTenants(numberOfTenants) {
  localStorage.setItem('numberOfTenants', numberOfTenants);
}

function getNumberOfTenants() {
  console.log("ca marche bien");
  return localStorage.getItem('numberOfTenants');
}


function getAllTenantsRequest() {
    let token = localStorage.getItem('accessToken');
    fetch(host + 'recentTenants', {
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
      const allTenants = data;
      setNumberOfTenants(allTenants.length);
      const tableBody = document.getElementById("alltenantsTable");
      if (tableBody) {
        tableBody.innerHTML = ''; // Clear existing rows

        allTenants.forEach((tenant) => {
          console.log("Tenant data:", tenant); // Log chaque propriété
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${tenant.firstname} ${tenant.lastname}</td>
            <td>${tenant.contactmoov}</td>
            <td>${tenant.contacttg}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Element with ID 'tenantspropertiesTable' not found.");
      }
    })
    .catch((error) => console.error('Error fetching tenantsproperties:', error));
  }



  