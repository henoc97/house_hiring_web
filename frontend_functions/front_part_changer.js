



if (recentTenantsTable) {
              
  getUnvalidReceiptsRequest();
  getRecentTenantsRequest();
}

const totalTenants = document.getElementById('totalTenants');
totalTenants.textContent = getNumberOfTenants();

const totalTenantsProperties = document.getElementById('totalTenantsProperties');
totalTenantsProperties.textContent = getNumberOfTenantsProperties();

const totalProperties = document.getElementById('totalProperties');
totalProperties.textContent = getNumberOfProperties();

const totalPayments = document.getElementById('totalPayments');
totalPayments.textContent = getNumberOfPayments();

showNewSold();

document.getElementById("unvalidReceiptsTable").addEventListener('click', function(e) {
  if (e.target && e.target.closest('.govalidreceipt')) {
    
    e.preventDefault();
    const receiptData = JSON.parse(e.target.closest('.govalidreceipt').getAttribute('data-receipt'));

    // Generate a unique receipt number
    const receiptNumber = 'REC' + Date.now(); // Example: REC1627890123456

    // Get the current date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    // Add receipt number and issue date to receipt data
    receiptData.receiptNumber = receiptNumber;
    receiptData.issueDate = formattedDate;

    // Store the complete receipt data in localStorage
    localStorage.setItem('selectedReceipt', JSON.stringify(receiptData));

    // Redirect to the validation page
    window.location.href = 'receipt';
  }
});


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
            
            const unvalidReceiptsTable = document.getElementById('unvalidReceiptsTable')
            const recentTenantsTable = document.getElementById('recentTenantsTable');
            if (recentTenantsTable && unvalidReceiptsTable) {
              
              getUnvalidReceiptsRequest();
              getRecentTenantsRequest();
            }
          });
      } 

      if (this.id === 'porfile-button') {
        fetch('/profile')
          .then(response => response.text())
          .then(data => {
            document.querySelector('.details').innerHTML = data;

            const uploadForm = document.getElementById('uploadForm');
            if (uploadForm) {
              uploadForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                
                const formData = new FormData();
                const fileInput = document.getElementById('imageUpload');
                formData.append('image', fileInput.files[0]);
    
                try {
                    const response = await fetch(host + '/upload', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Erreur lors de l\'upload du fichier');
                    }

                    const result = await response.json();
                    const uploadedImage = document.getElementById('uploadedImage');
                    uploadedImage.src = result.filename;
                    uploadedImage.style.display = 'block';
                    alert(result.filename);

                    // Sauvegarder le nom du fichier dans le localStorage
                    localStorage.setItem('uploadedImageFilename', result.filename);
                } catch (error) {
                    console.error(error);
                    alert('Une erreur est survenue lors de l\'upload du fichier');
                }
            });
            }
  
          // Check if an image filename is stored in local storage
          const filename = localStorage.getItem('uploadedImageFilename');
          if (filename) {
              const uploadedImage = document.getElementById('uploadedImage');
              uploadedImage.src = `${filename}`;
              uploadedImage.style.display = 'block';
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

          const valiReceiptsTable = document.getElementById("valiReceiptsTable");
          if (valiReceiptsTable) {
            console.log("ccol");
            getValidReceiptsRequest();
          }

          valiReceiptsTable.addEventListener('click', function(e) {
            if (e.target && e.target.closest('.govalidreceipt')) {
              
              e.preventDefault();
              const receiptData = JSON.parse(e.target.closest('.govalidreceipt').getAttribute('data-receipt'));
          
              // Generate a unique receipt number
              const receiptNumber = 'REC' + Date.now(); // Example: REC1627890123456
          
              // Get the current date
              const currentDate = new Date();
              const formattedDate = currentDate.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              });
          
              // Add receipt number and issue date to receipt data
              receiptData.receiptNumber = receiptNumber;
              receiptData.issueDate = formattedDate;
          
              // Store the complete receipt data in localStorage
              localStorage.setItem('selectedReceipt', JSON.stringify(receiptData));
          
              // Redirect to the validation page
              window.location.href = 'receipt';
            }
          });

          const requireRecieptForm = document.getElementById("receipt-form");
          const tenantsPropertiesoption = document.getElementById("tenantsProperties-option");
          if (tenantsPropertiesoption && requireRecieptForm) {
            getTenantsPropertiesRequest(2);

            requireRecieptForm.addEventListener('submit', function(event) {
                  event.preventDefault();
                  
                  requireRecieptRequest();
              })
            
            tenantsPropertiesoption.addEventListener('change', function() {
              const selectedOption = this.options[this.selectedIndex];
              const price = selectedOption.dataset.price;
              document.getElementById('sumpayed').value = price ? price : '';
            });

            $(document).ready(function() {

              $('#months').select2({
                placeholder: 'Select months',
                allowClear: true
              });

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