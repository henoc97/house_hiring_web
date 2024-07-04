






function setSold(sold) {
    localStorage.setItem('sold', sold);
  }
  
  function getsold() {
    console.log("ca marche bien");
    return localStorage.getItem('sold');
  }
  
  
  function updateSoldRequest() {
      let token = localStorage.getItem('accessToken');
      fetch(host + 'updateSold', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log("data received:", data); // Log les données reçues
  
        const sold = data;
        setSold(sold);
       
      })
      .catch((error) => console.error('Error fetching tenantsproperties:', error));
    }
  
  
  
    