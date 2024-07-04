






function setSold(sold) {
    localStorage.setItem('sold', sold);
  }
  
  function getsold() {
    console.log("ca marche bien");
    return localStorage.getItem('sold');
  }

  function showNewSold(){
    document.getElementById('sold').innerHTML = 
        `<h3>Solde : ${getsold()}</h3>`;
  }
  
  
  function updateSoldRequest(spend) {
      let token = localStorage.getItem('accessToken');
      fetch(host + 'updateSold', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "spend":spend
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("data received:", data); // Log les données reçues
  
        const sold = data;
        console.log("sold : ", sold);
        setSold(sold);

        document.getElementById('sold').innerHTML = `<h3>Solde : ${sold}</h3>`;
       
      })
      .catch((error) => console.error('Error fetching tenantsproperties:', error));
    }
  
  
  
    