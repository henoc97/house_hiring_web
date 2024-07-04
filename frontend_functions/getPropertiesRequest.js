
function setNumberOfProperties(numberOfProperties) {
  localStorage.setItem('numberOfProperties', numberOfProperties);
}

function getNumberOfProperties() {
  console.log("ca marche bien");
  return localStorage.getItem('numberOfProperties');
}


function getPropertiesRequest(type) {
    let token = localStorage.getItem('accessToken');
    fetch(host + 'myProperties', {
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
      const properties = data.myProperties || data;

      setNumberOfProperties(properties.length);

      setPrpertiesList(properties);

      if (type == 1) {
        myPropertiesTableConstructor(properties);
      } else {
        propertyoptionConstructor(properties);
      }
      
      
    })
    .catch((error) => console.error('Error fetching properties:', error));
  }


  function  propertyoptionConstructor(properties){
    const propertyoption = document.getElementById("property-option");
    if (propertyoption) {
    propertyoption.innerHTML = ''; // Clear existing rows

    properties.forEach((property) => {
        console.log("Property data:", property); // Log chaque propriété
        const option = document.createElement('option');

        option.value = property.id;
        option.textContent = `${property.address} ${property.price}`;
        
        propertyoption.appendChild(option);
    });
    } else {
    console.error("Element with ID 'myPropertiesTable' not found.");
    }
  }
  

function myPropertiesTableConstructor(properties){
    const tableBody = document.getElementById("myPropertiesTable");
      if (tableBody) {
        tableBody.innerHTML = ''; // Clear existing rows

        properties.forEach((property) => {
          console.log("Property data:", property); // Log chaque propriété
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${property.address}</td>
            <td>${property.description}</td>
            <td>${property.price}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Element with ID 'myPropertiesTable' not found.");
      }
}