

var tableBody = document.getElementById("myTableBody");
var selectCategories = document.getElementById("categorie");
var produits;
var categories;
var maCheckbox = document.getElementById("flexSwitchCheckDefault");

var table_produits;


var serverAddress = new URL(window.location.href).hostname
console.log(serverAddress)


init_nav()


const requestOptions = {
  method: "GET",
  redirect: "follow"
};


// Recuperer tout les produits et les afficher   
fetch("http://"+serverAddress+":9003/api/produits", requestOptions)
  .then((response) => response.json())
  .then((result) => {

    produits = result;

    table_produits = $('#dataTable').DataTable();
    
    for (var i = 0; i < result.length; i++) {
      updateDom(result[i])

    }

    table_produits.draw()

  }
  )
  .catch((error) => console.error(error));



//Recuperer toutes les categories Pour la creations/modification d'un produit 



fetch("http://"+serverAddress+":9003/api/categories", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    categories = result;

    for (var i = 0; i < result.length; i++) {

      var option = document.createElement("option")
      option.value = result[i].id
      option.appendChild(document.createTextNode(result[i].nom))
      selectCategories.appendChild(option)

    }
  })
  .catch((error) => console.error(error));



//Vaider le formulaire de creation d'un produit
var newProduit = document.getElementById("newProduit")
var pr;

newProduit.addEventListener('submit', (e) => {
  e.preventDefault()


  var formData = new FormData(newProduit);

  if (formData.get('categorie')) {



    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "nom": formData.get('nom'),
      "description": formData.get('description'),
      "qte_critique": formData.get('quantite'),
      "prix": formData.get('prix')
    });


    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://"+serverAddress+":9003/api/produits", requestOptions)
      .then((response) => response.json())
      .then((result) => {

        pr = result;
        console.log(pr)



        const requestOptions2 = {
          method: "POST",
          redirect: "follow"
        };

        fetch("http://"+serverAddress+":9003/api/produits/" + pr.id + "/categories/" + formData.get('categorie'), requestOptions2)
          .then((response) => response.json())
          .then((result) => {
            pr = result
            console.log(result)

            updateDom(result)

            produits.push(result)

            var resultat = document.getElementById("resultat_ajout")

            resultat.innerHTML = " Nom :" + pr.nom + "<br> quantite :" + pr.qte_critique + "<br> prix : " + pr.prix

            document.getElementById('close_newEmployeModal').click()

            toastBootstrap.show()

          }
          )
          .catch((error) => {
            updateDom(pr)
            console.error(error)
          });

      })
      .catch((error) => console.error(error));

  }

}
)

let formEdit = document.getElementById("editProduit")


//Valider le formulaire de modification d'un produit
formEdit.addEventListener('submit', function (e) {
  e.preventDefault();

  var formData = new FormData(formEdit);
  var pr;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: formData.get('editId'),
    nom: formData.get('editNom'),
    description: formData.get('editDescription'),
    qte_critique: formData.get('editQuantite'),
    prix: formData.get('editPrix'),
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://"+serverAddress+":9003/api/produits/update", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)

      if (formData.get('editCategorie')) {

        produits.forEach(element => {
          if (element.id == formData.get('id')) {

            if (element.categories.length > 0) {

              const requestOptions3 = {
                method: "DELETE",
                redirect: "follow"
              };

              fetch("http://"+serverAddress+":9003/api/produits/" + result.id + "/categories/" + formData.get('editCategorie'), requestOptions3)
            }
          }
        });

        const requestOptions2 = {
          method: "POST",
          redirect: "follow"
        };


        fetch("http://"+serverAddress+":9003/api/produits/" + result.id + "/categories/" + formData.get('editCategorie'), requestOptions2).
          then((response) => response.json())
          .then((result2) => {
            console.log(result2)

            updateDom(result2)



          })
      }

      document.getElementById('closeEditModal').click()
    }
    )
    .catch((error) => console.error(error));
}

);

// Fonction qui remplace une ligne dans le tableau
function updateDom(result) {

  table_produits.row('#row' + result.id).remove();
  table_produits.row.add([
    result.nom,
    result.prix,
    result.qte_stock,
    result.qte_critique,
    result.categories.length > 0 ? result.categories[0].nom : "",
    '<div class="dropdown">\
    <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">\
      choisir\
    </button>\
    <ul class="dropdown-menu">\
      <li><button class="dropdown-item" onclick="modifier('+ result.id + ')" data-bs-toggle="modal" data-bs-target="#editModal" type="button">modifier</button></li>\
      <li><button class="dropdown-item" onclick=ravitailler('+ result.id + ') data-toggle="modal" data-target="#ravitaillerModal" type="button">Revitailler</button></li>\
      <li><button class="dropdown-item" onclick="detail('+ result.id + ')" data-toggle="modal" data-target="#descriptionModal" type="button">Description</button></li>\
    </ul>\
  </div>'
  ]).draw().node().id = 'row' + result.id;

  table_produits.draw();

  var cpt = 0
  produits.forEach(element => {
    if (element.id == result.id) {
      produits[cpt] = result
    }
    cpt++

  });

}

//Afficher le details d'un produit 
function detail(id_produit) {

  var html_nom = document.getElementById('descriptionNom')
  var html_body = document.getElementById('descriptionBody')

  produits.forEach(element => {
    if (element.id == id_produit) {
      html_body.innerHTML = element.description
      html_nom.innerHTML = element.nom
    }
  });
}


// Ravitailler un produit
var produit_ravitaillement;

function ravRequette() {

  const qte = document.getElementById('ravittaillerQte').value

  const requestOptions = {
    method: "POST",
    redirect: "follow"
  };

  fetch("http://"+serverAddress+":9003/api/produits/" + produit_ravitaillement + "/qte/" + qte, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      updateDom(result)
    })
    .catch((error) => console.error(error));

}


function ravitailler(id_produit) {

  produit_ravitaillement = id_produit;

  var html_nom = document.getElementById('ravitaillerNom')

  produits.forEach(element => {
    if (element.id == id_produit) {
      html_nom.innerHTML = element.nom
    }
  });
}


//  Modifier un Produit

function modifier(id_produit) {

  var p;
  produits.forEach(element => {
    if (element.id == id_produit) {

      p = element
    }
  });


  var content = document.getElementById("editProduitModal")

  content.innerHTML = '<input type="number" name="editId" id="editId" value="' + p.id + '" hidden>\
                              <div class="form-floating mb-3">\
                                  <input type="text" class="form-control" id="editNom" value ="'+ p.nom + '" name="editNom" required>\
                                  <label for="nom">Nom du produit</label>\
                              </div>\
                            \
                              <div class="form-floating mb-3">\
                                  <input type="number" class="form-control" id="editPrix" value ="'+ p.prix + '" name="editPrix" required>\
                                  <label for="quantite">Prix du produit</label>\
                              </div>\
                            \
                              <div class="form-floating mb-3">\
                                  <input type="number" class="form-control" id="editQuantite" value ="'+ p.qte_critique + '" name="editQuantite"\
                                      required>\
                                  <label for="quantite">quantite critique du produit</label>\
                              </div>\
                            \
                              <div class="form-floating mb-3">\
                                  <textarea class="form-control" id="editDescription"  name="editDescription"\
                                      required> '+ p.description + ' </textarea>\
                                  <label for="description">Description</label>\
                              </div>\
                            \
                              <div class="form-floating">\
                                  <select class="form-select" id="editCategorie" name="editCategorie" required>\
                                      <option disabled selected>choisir une categorie</option>\
                            \
                                  </select>\
                                  <label for="categorie">Categorie</label>\
                        </div>' + content.innerHTML



  var html_cat = document.getElementById('editCategorie')
  for (var i = 0; i < categories.length; i++) {

    var option = document.createElement("option")
    option.value = categories[i].id
    option.text = categories[i].nom

    if (p.categories != null && p.categories.length > 0) {
      if (p.categories[0].id == categories[i].id)
        option.selected = true
    }
    html_cat.appendChild(option)

  }

}


function closeEdittModal() {
  var content = document.getElementById("editProduit")
  content.innerHTML = '<div class="modal-body" id="editProduitModal">\
                        </div>\
                        <div class="modal-footer">\
                            <button type="button" class="btn btn-secondary"\
                                data-bs-dismiss="modal" onclick="closeEdittModal()"  id="closeEditModal">Close</button>\
                            <button type="submit" class="btn btn-primary">Ok</button>\
                        </div>'
}




// Ajout d'un écouteur d'événements pour détecter les changements d'état
maCheckbox.addEventListener("change", function () {
  // Vérifier si la case à cocher est cochée
  table_produits.clear()


  if (maCheckbox.checked) {
    console.log("check")

    produits.forEach(pr => {
      if (pr.qte_critique >= pr.qte_stock)
        updateDom(pr)
    })

  } else {

    console.log("not check")
    produits.forEach(pr => {
      updateDom(pr)
    })
  }

  table_produits.draw()
});



function init_nav(){

  var roles = JSON.parse(sessionStorage.getItem("roles"))

  var menu = document.getElementById("accordionSidebar")

  var home =  create_option("home",false,"fas fa-fw fa-cog")
  var produit =  create_option("produit",true,"fas fa-fw fa-wrench")
  var categorie =  create_option("categorie",false,"fas fa-fw fa-table")
  var facture =  create_option("facture",false,"fas fa-fw fa-folder")
  var utilisateur =  create_option("utilisateur",false,"fas fa-fw fa-user")
  var comptabilite =  create_option("comptabilite",false,"fas fa-fw fa-anchor")

  var hr = '<hr class="sidebar-divider"> '
  var button ='<div class="text-center d-none d-md-inline">\
  <button class="rounded-circle border-0" id="sidebarToggle"></button>\
  </div>'


 

  roles.forEach(role =>{

    if(role.nom=="secretaire"){
      menu.innerHTML  += (home + facture+hr)
    }else if(role.nom=="maganisier"){
      menu.innerHTML  += (produit + categorie +hr)
    }else if(role.nom == "admin"){
      menu.innerHTML += comptabilite+utilisateur+hr
    }

    
  })
  menu.innerHTML +=  button
   
}

function create_option(link,active,icon){

  if(active){
    return '<li class="nav-item active">\
    <a class="nav-link collapsed" href="'+link+'.html" aria-expanded="true" aria-controls="collapseTwo">\
        <i class="'+icon+'"></i>\
        <span>'+link+'</span>\
    </a>\
    </li>'

  }else{
    return '<li class="nav-item">\
    <a class="nav-link collapsed" href="'+link+'.html" aria-expanded="true" aria-controls="collapseTwo">\
        <i class="'+icon+'"></i>\
        <span>'+link+'</span>\
    </a>\
    </li>'
  }
}