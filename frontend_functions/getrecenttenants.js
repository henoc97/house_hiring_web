




function getRecentTenantsRequest() {
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
      const recentTenants = data;

      const tableBody = document.getElementById("recentTenantsTable");
      if (tableBody) {
        tableBody.innerHTML = ''; // Clear existing rows

        recentTenants.forEach((recentTenant) => {
          console.log("recentTenants data:", recentTenant); // Log chaque propriété
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>
                <h4>${recentTenant.firstname} ${recentTenant.lastname.split(' ')[0]} <br> 
                    <span>
                        ${recentTenant.contactmoov} / ${recentTenant.contacttg}
                    </span>
                </h4>
            </td>
            <td>${recentTenant.create_time.split('T')[0]}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Element with ID 'tenantspropertiesTable' not found.");
      }
    })
    .catch((error) => console.error('Error fetching tenantsproperties:', error));
  }



  