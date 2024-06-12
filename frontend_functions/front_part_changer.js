


document.getElementById('btn').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('open');
  });

  // Sélectionner tous les liens de menu
  const menuLinks = document.querySelectorAll('.sidebar ul li a');

  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Supprimer la classe active de tous les liens
      menuLinks.forEach(l => l.classList.remove('active'));

      // Ajouter la classe active au lien cliqué
      this.classList.add('active');

      // Cacher les éléments actuels et afficher le contenu correspondant
      document.querySelector('.details').innerHTML = ''; // Nettoyer la section details

      if (this.id === 'dash-button') {
        fetch('/dashboard')
          .then(response => response.text())
          .then(data => {
            document.querySelector('.details').innerHTML = data;
          });
      } 

      if (this.id === 'proprietes-button') {
        fetch('/propertiespart')
          .then(response => response.text())
          .then(data => {
            document.querySelector('.details').innerHTML = data;

            const propertyForm = document.getElementById('property-form');
            const propertiesTable = document.getElementById('myPropertiesTable');
            if (propertyForm && propertiesTable) {
              propertyForm.addEventListener('submit', function(event) {
                event.preventDefault(); 
                createPropertyRequest();
              });

              getPropertiesRequest(1);
            }
          });
      } 

      if (this.id === 'tenant-button') {
        fetch('/tenants_part')
          .then(response => response.text())
          .then(data => {
            document.querySelector('.details').innerHTML = data;
          });

          
      }

      if (this.id === 'tenant_home-button') {
        fetch('/tenant_home')
          .then(response => response.text())
          .then(data => {
            document.querySelector('.details').innerHTML = data;
          });

          
          
          
          const tenantproperty = document.getElementById("tenantspropertiesTable");
          const tenantForm = document.getElementById("tenant-form");
          if (tenantForm && tenantproperty) {
            getTenantsPropertiesRequest();
            
            getPropertiesRequest(2);

            tenantForm.addEventListener('submit', function(event) {
                event.preventDefault();
                createTenantRequest();
            })
          }
      }

      if (this.id === 'myreciept-button') {
        fetch('/myreciept')
        .then(response => response.text())
        .then(data => {
          document.querySelector('.details').innerHTML = data;
        });
      }
    });
  });