



function createTenantRequest(){

  if((getsold() - 650 * 0.25) > 0){
    let propertyID = document.getElementById('property-option').value;
    let name = document.getElementById('name').value;
    let lastname = document.getElementById('lastname').value;
    let contactmoov = document.getElementById('contactmoov').value;
    let contacttg = document.getElementById('contacttg').value;

    let token = localStorage.getItem('accessToken');

    fetch(host + 'createTenant', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        "propertyID": propertyID,
        "name":name,
        "lastname":lastname,
        "contactmoov":contactmoov,
        "contacttg":contacttg
      })
    })
    .then(response => {
        if (!response.ok && (response.status === 401 || response.status === 403)) {
            alert("problem")
            return renewAccessToken().then(() => createTenantRequest());
        }
        return response.json();
    })
    .then(data => {
        updateSoldRequest(650 * 0.25);
        console.log(data);
        document.getElementById('tenant-form').reset();
        getTenantsPropertiesRequest(1);
        showNewSold();
    })
    .catch(error => {
        console.error('Erreur:', error);
        window.location.href = "/sign_log";
    });
  } else {
    alert('solde insuffisant. Cette opération coute 0.25€')
  }
  }