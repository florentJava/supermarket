
var tableBody = document.getElementById("myTableBody");
var produits;
var total_facture = 0
var facture = [];

var serverAddress = new URL(window.location.href).hostname
console.log(serverAddress)

var table_produits;

init_nav()

const requestOptions = {
  method: "GET",
  redirect: "follow"
};



fetch("http://"+serverAddress+":9003/api/produits", requestOptions)
  .then((response) => response.json())
  .then((result) => {

    produits = result

    for (var i = 0; i < result.length; i++) {

      if(result[i].qte_stock  == 0){
        continue;
      }


      var tr = document.createElement("tr");

      tr.id = "row" + result[i].id

      var td1 = document.createElement("td")
      var td2 = document.createElement("td")
      var td3 = document.createElement("td")
      var td4 = document.createElement("td")
      var td5 = document.createElement("td")
      var td6 = document.createElement("td")



      td1.appendChild(document.createTextNode(result[i].nom))
      td2.appendChild(document.createTextNode(result[i].prix))
      td3.appendChild(document.createTextNode(result[i].qte_stock))
      td4.appendChild(document.createTextNode(result[i].qte_critique))

      if (result[i].categories == null)
        td5.appendChild(document.createTextNode("null"))
      else if (result[i].categories.length > 0)
        td5.appendChild(document.createTextNode(result[i].categories[0].nom))
      else
        td5.appendChild(document.createTextNode(""))

      td6.innerHTML = '<div class="btn-group" role="group" aria-label="Basic outlined example">\
                              <button type="button" class="btn btn-outline-primary" onclick=addProduit(' + result[i].id + ') value="' + result[i].id + '" >\
                                <i class="fa fa-shopping-basket"></i>\
                                vendre\
                            </button>\
                            <button type="button" onclick="detail('+ result[i].id + ')" class="btn btn-outline-primary" data-toggle="modal" data-target="#descriptionModal">\
                            <i class="fa fa-book"></i>\
                            Details</button>\
                      </div>'

      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      tr.appendChild(td5)
      tr.appendChild(td6)


      tableBody.appendChild(tr);

    }

    table_produits = $('#dataTable').DataTable();

  })
  .catch((error) => console.error(error));



//Fonction pour effectuer la vente d'un produit
function addProduit(id_produit) {

  var body_facture = document.getElementById("body_facture")

  produits.forEach(element => {

    if (element.id == id_produit) {

      facture[facture.length] = {
        "produit": {
          "id": element.id,
          "nom": element.nom,
          "qte_critique": element.qte_critique,
          "prix": element.prix,
          "qte_stock": element.qte_stock
        },
        "qte": 1
      }

      console.log(facture)
    }

  });


  body_facture.innerHTML = "";

  var cpt = 1;

  facture.forEach(element => {


    body_facture.innerHTML += '<tr>\
        <td>'+ element.produit.nom + '</td>\
        <td>\
            <input class="form-control form-control-sm" type="number" min="0"  max="'+ element.produit.qte_stock + '" onclick="modifierQte(' + cpt + ')"  id="qte' + cpt + 'r"  value="' + element.qte + '" style="width: 50px;">\
        </td>\
        <td>'+ element.produit.prix + '</td>\
    </tr>'

    cpt++;

  })

  calculerTotal();

  toastBootstrap.show()
}

const toastLiveExample = document.getElementById('facture')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample, { delay: 1000000 })


function calculerTotal() {

  var total_html = document.getElementById("total_facture")

  total_facture = 0;
  facture.forEach(element => {

    total_facture += element.produit.prix * element.qte
  })

  total_html.innerHTML = "Total :" + total_facture
}

function modifierQte(pos) {

  var qte = document.getElementById("qte" + pos + "r").value


  console.log(" position " + pos + " value " + qte)
  facture[pos - 1].qte = qte

  calculerTotal()

}



//imprimer la facture 


document.getElementById("imprimer_facture").addEventListener('click', function () {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(facture);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://"+serverAddress+":9003/api/factures", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      
      result.produits.forEach(element => {  
        updateDom(element)

        console.log("Produit : " + element.produit.nom + " vendu avec succes")
      })
      printPdf(result)



      document.getElementById("anuler_facture").click()
      console.log(result)
    }
    )
    .catch((error) => console.error(error));


}



)

// Fonction pour imprimer la facture

function printPdf(result) {
  // Obtenir l'élément à imprimer
  var element = document.createElement("div");
  var tr = "";

  // Créer une nouvelle fenêtre ou un nouvel onglet
  var printWindow = window.open();

  // Copier le contenu de l'élément dans la nouvelle fenêtre ou le nouvel onglet
  printWindow.document.write('<html><head><title>Facture</title>');

  // Remplacez "styles.css" par le chemin vers votre fichier CSS
  printWindow.document.write('<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css"/>\
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.1/css/buttons.dataTables.min.css"/>')
  printWindow.document.write('<link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">')
  printWindow.document.write('  <link href="css/sb-admin-2.min.css" rel="stylesheet">')

  printWindow.document.write('</head><body>');
  printWindow.document.write('<br> Numero de facture : ' + result.id + '<br> Date : ' + result.date + '<br> Heure : ' + result.heure)
  printWindow.document.write('</head><body>');

  result.produits.forEach(element => {
    tr += '<tr>\
      <td>'+ element.produit.nom + '</td>\
      <td>'+ element.produit.prix + '</td>\
      <td>'+ element.qte + '</td>\
      <td>'+ element.produit.prix * element.qte + '</td>\
    </tr>'
  });

  element.innerHTML = '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">\
  <thead>\
      <tr>\
          <th>Nom</th>\
          <th>prix</th>\
          <th>quantite</th>\
          <th>Total</th>\
      </tr>\
  </thead>\
  <tbody >\
  '+ tr + '\
  <tr>\
  <td colspan="3" > Total</td>\
  <td > '+ result.total + '</td>\
  </tr>\
  </tbody>\
</table>'



  printWindow.document.write(element.innerHTML);
  printWindow.document.write('</body></html>');




  // Fermer le document pour que les ressources (images, etc.) se chargent
  printWindow.document.close();

  // Attendre que le document soit chargé, puis imprimer
  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  }

}


// Fonction pour mettre a jour le Dom
function updateDom(produit) {

  table_produits.row('#row' + produit.produit.id).remove();

  table_produits.row.add([
    produit.produit.nom,
    produit.produit.prix,
    produit.produit.qte_stock,
    produit.produit.qte_critique,
    produit.produit.categories.length > 0 ? produit.categories[0].nom : "",
        '<div class="btn-group" role="group" aria-label="Basic outlined example">\
        <button type="button" class="btn btn-outline-primary" onclick=addProduit(' + produit.produit.id + ') value="' + produit.produit.id + '" >\
          <i class="fa fa-shopping-basket"></i>\
          vendre\
      </button>\
      <button type="button" onclick="detail('+ produit.produit.id + ')" class="btn btn-outline-primary" data-toggle="modal" data-target="#descriptionModal">\
      <i class="fa fa-book"></i>\
      Details</button>\
    </div>'
  ]).draw().node().id = 'row' + produit.produit.id;

  table_produits.draw();

  var cpt = 0
  produits.forEach(element => {
    if (element.id == produit.produit.id) {
      produits[cpt] = produit.produit
    }
    cpt++

  });

}






//annuler une facture   anuler_facture


document.getElementById("anuler_facture").addEventListener('click',
  function () {

    var body_facture = document.getElementById("body_facture")
    body_facture.innerHTML = ""
    facture = []
    calculerTotal()
    toastBootstrap.hide()




  })


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




function init_nav(){

  var roles = JSON.parse(sessionStorage.getItem("roles"))

  var menu = document.getElementById("accordionSidebar")

  var home =  create_option("home",true,"fas fa-fw fa-cog")
  var produit =  create_option("produit",false,"fas fa-fw fa-wrench")
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