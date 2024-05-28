
var tableBody = document.getElementById("myTableBody");
var table_categories;
var produitBody = document.getElementById("produitModal");
var categories;
var produitsModal = document.getElementById("titreCategorie")



var serverAddress = new URL(window.location.href).hostname
console.log(serverAddress)

var form = document.getElementById("newCategorie")
var newCat;

const requestOptions = {
  method: "GET",
  redirect: "follow"
};


init_nav()

fetch("http://"+serverAddress+":9003/api/categories", requestOptions)
  .then((response) => response.json())
  .then((result) => {

    console.log(result)

    categories = result

    for (var i = 0; i < result.length; i++) {

      var tr = document.createElement("tr");

      tr.id = "row" + result[i].id

      var td1 = document.createElement("td")
      var td2 = document.createElement("td")
      var td3 = document.createElement("td")
      var td4 = document.createElement("td")



      td1.appendChild(document.createTextNode(result[i].nom))
      td2.appendChild(document.createTextNode(result[i].produits.length))
      td3.appendChild(document.createTextNode(result[i].description))

      td4.innerHTML = '<div class="btn-group" role="group" aria-label="Basic outlined example">\
                              <button type="button" class="btn btn-outline-primary" onclick=updateProduit(' + result[i].id + ') value="' + result[i].id + '" >\
                                <i class="fa fa-edit"></i>\
                                Modifier\
                            </button>\
                            <button type="button" onclick="detailModal('+ result[i].id + ')" class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">\
                            <i class="fa fa-list"></i>\
                            produits</button>\
                      </div>'

      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)


      tableBody.appendChild(tr);

    }

    table_categories = $('#dataTable').DataTable();

  })
  .catch((error) => console.error(error));



function detailModal(id) {

  categories.forEach(element => {

    if (element.id == id) {

      var div = document.createElement("div")

      var ul = document.createElement("ol")
      ul.classList.add("list-group");
      ul.classList.add("list-group-numbered");

        element.produits.forEach(pr => {
          var li = document.createElement("li")
          li.classList.add("list-group-item");
          li.innerHTML = pr.nom
          
          ul.appendChild(li)
          
          
        });
        
        
        div.appendChild(ul)
        produitBody.innerHTML = div.innerHTML

    

      produitsModal.innerHTML = element.nom


    }
  });






}



form.addEventListener('submit', (e) => {
  e.preventDefault()


  var formData = new FormData(form);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "nom": formData.get('nom'),
      "description": formData.get('description'),
    });


    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://"+serverAddress+":9003/api/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {

        newCat = result;
        console.log(newCat)

        updateDom(result)
        categories.push(result)

        document.getElementById("close_newCategorieModal").click()

      })
      .catch((error) => console.error(error));
}
)


function updateDom(result) {

  table_categories.row('#row' + result.id).remove();
  table_categories.row.add([
    result.nom,
    result.produits ? result.produits.length : 0,
    result.description,
    '<div class="btn-group" role="group" aria-label="Basic outlined example">\
      <button type="button" class="btn btn-outline-primary" onclick=updateProduit(' + result.id + ') value="' + result.id + '" >\
          <i class="fa fa-edit"></i>\
          Modifier\
      </button>\
      <button type="button" onclick="detailModal('+ result.id + ')" class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">\
      <i class="fa fa-list"></i>\
      produits</button>\
    </div>'

  ]).draw().node().id = 'row' + result.id;

  table_categories.draw();

  var cpt = 0
  categories.forEach(element => {
    if (element.id == result.id) {
      categories[cpt] = result
    }
    cpt++

  });

}



function init_nav(){

  var roles = JSON.parse(sessionStorage.getItem("roles"))

  var menu = document.getElementById("accordionSidebar")

  var home =  create_option("home",false,"fas fa-fw fa-cog")
  var produit =  create_option("produit",false,"fas fa-fw fa-wrench")
  var categorie =  create_option("categorie",true,"fas fa-fw fa-table")
  var facture =  create_option("facture",false,"fas fa-fw fa-folder")
  var utilisateur =  create_option("utilisateur",false,"fas fa-fw fa-user")
  var comptabilite =  create_option("comptabilite",false,"fas fa-fw fa-anchor")

  var hr = '<hr class="sidebar-divider"> '
  var button ='<div class="text-center d-none d-md-inline">\
  <button class="rounded-circle border-0" id="sidebarToggle"></button>\
  </div>'


 

  roles.forEach(role =>{

    if(role.nom=="secretaire"){
      menu.innerHTML  += (home + facture +hr)
    }else if(role.nom=="maganisier"){
      menu.innerHTML  += (produit + categorie +hr)
    }else if(role.nom == "admin"){
      menu.innerHTML += comptabilite+utilisateur
    }

    
  })
  menu.innerHTML +=  hr+button
   
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