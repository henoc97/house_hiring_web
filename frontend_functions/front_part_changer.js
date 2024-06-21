



if (recentTenantsTable) {
              
  getRecentTenantsRequest();
}

document.getElementById('totalProperties').textContent = getPropertiesList().length;


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
            
            const recentTenantsTable = document.getElementById('recentTenantsTable');
            if (recentTenantsTable) {
              
              getRecentTenantsRequest();
            }
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

            const tenantsTable = document.getElementById('alltenantsTable');
            if (tenantsTable) {
              getAllTenantsRequest()
            }
          });

          
      }

      if (this.id === 'tenant_home-button') {
        fetch('/tenant_home')
          .then(response => response.text())
          .then(data => {
            document.querySelector('.details').innerHTML = data;

            const tenantproperty = document.getElementById("tenantspropertiesTable");
            const tenantForm = document.getElementById("tenant-form");
            if (tenantForm && tenantproperty) {
              getTenantsPropertiesRequest(1);

              getPropertiesRequest(2);

              tenantForm.addEventListener('submit', function(event) {
                  event.preventDefault();
                  
                  createTenantRequest();
              })
            }
          });

          
      }

      if (this.id === 'myreceipt-button') {
        fetch('/receipts_part')
        .then(response => response.text())
        .then(data => {
          document.querySelector('.details').innerHTML = data;

          const tenantsPropertiesoption = document.getElementById("tenantsProperties-option");
          if (tenantsPropertiesoption) {
            getTenantsPropertiesRequest(2);


            tenantsPropertiesoption.addEventListener('change', function() {
              const selectedOption = this.options[this.selectedIndex];
              const price = selectedOption.dataset.price;
              document.getElementById('sumpayed').value = price ? price : '';
            });

            $(document).ready(function() {
              const currentDate = new Date();
              const currentMonth = currentDate.getMonth() + 1; // Les mois commencent à 0 en JavaScript
              const currentYear = currentDate.getFullYear();
          
              // Initialisation de Select2 pour les mois
              $('#months').select2({
                  placeholder: "Sélectionnez les mois"
              });
          
              // Remplir la liste des mois avec l'année appropriée
              const months = [
                  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
              ];
              const monthsSelect = $('#months');
              
              // Utilisation d'un ensemble pour éviter les doublons
              const addedMonths = new Set();
          
              months.forEach((month, index) => {
                  const monthNumber = index + 1;
                  const year = monthNumber < currentMonth ? currentYear + 1 : currentYear;
          
                  // Vérifier si ce mois a déjà été ajouté
                  const monthYearKey = `${monthNumber}-${year}`;
                  if (!addedMonths.has(monthYearKey)) {
                      const option = new Option(`${month} ${year}`, monthYearKey);
                      monthsSelect.append(option);
                      addedMonths.add(monthYearKey);
                  }
              });
          
              $('#tenantsProperties-option').on('change', function() {
                  updateSumpayed();
              });
          
              $('#months').on('change', function() {
                  updateSumpayed();
                  updateSelectedMonths();
              });
          
              function updateSumpayed() {
                  const selectedOption = document.getElementById('tenantsProperties-option').options[document.getElementById('tenantsProperties-option').selectedIndex];
                  const pricePerMonth = selectedOption.dataset.price;
                  const selectedMonths = $('#months').val();
                  const monthsCount = selectedMonths.length;
          
                  if (pricePerMonth && monthsCount > 0) {
                      const totalCost = pricePerMonth * monthsCount;
                      document.getElementById('sumpayed').value = totalCost;
                  } else {
                      document.getElementById('sumpayed').value = '';
                  }
              }
          
              function updateSelectedMonths() {
                  const selectedMonths = $('#months').val().map(monthYear => {
                      const [monthNumber, year] = monthYear.split('-');
                      return `${getMonthName(parseInt(monthNumber))} ${year}`;
                  }).join(' - ');
                  document.getElementById('selected-months').value = selectedMonths;
              }
          
              function getMonthName(monthNumber) {
                  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                  return monthNames[monthNumber - 1];
              }
          
              // Appel pour charger les propriétés des locataires au chargement de la page
              getTenantsPropertiesRequest(2);
          });
          
          }
        });
      }
    });
  });