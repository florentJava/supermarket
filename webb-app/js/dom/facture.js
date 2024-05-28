
var tableBody = document.getElementById("myTableBody");
var factures;
var produitBody = document.getElementById("tableProduit");
var produitsModal = document.getElementById("titreFacture")


var serverAddress = new URL(window.location.href).hostname
console.log(serverAddress)


init_nav()



const requestOptions = {
    method: "GET",
    redirect: "follow"
};



fetch("http://"+serverAddress+":9003/api/factures", requestOptions)
    .then((response) => response.json())
    .then((result) => {

        factures = result

        for (var i = 0; i < result.length; i++) {

            var tr = document.createElement("tr");

            tr.id = "row" + result[i].id

            var td1 = document.createElement("td")
            var td2 = document.createElement("td")
            var td3 = document.createElement("td")
            var td4 = document.createElement("td")
            var td5 = document.createElement("td")



            td1.appendChild(document.createTextNode("fact" + result[i].id))
            td2.appendChild(document.createTextNode(result[i].date + "-" + showDate(result[i].date)))
            td3.appendChild(document.createTextNode(result[i].heure))
            td4.appendChild(document.createTextNode(result[i].total))

            td5.innerHTML = '<div class="btn-group" role="group" aria-label="Basic outlined example">\
                            <button type="button" onclick="detailModal('+ result[i].id + ')" class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">\
                            <i class="fa fa-list"></i>\
                            produits</button>\
                      </div>'

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)


            tableBody.appendChild(tr);

        }
        $('#dataTable').DataTable();

    })
    .catch((error) => console.error(error));



function detailModal(id) {

    factures.forEach(element => {

        if (element.id == id) {

            var div = document.getElementById("tableProduit")

            div.innerHTML =""



            element.produits.forEach(pr => {

                console.log(pr)
                div.innerHTML +="<tr>\
                <td>"+pr.produit.nom+"</td>\
                <td>"+pr.produit.prix+"</td>\
                <td>"+pr.qte+"</td>\
                <td>"+pr.qte*pr.produit.prix+"</td>\
                </tr>"


            });

            div.innerHTML += "<tr>\
            <td colspan='3'>Total</td>\
            <td>"+element.total+"</td>\
            </tr>"


            produitBody.innerHTML = div.innerHTML



            produitsModal.innerHTML = "num facture :"+ element.id


        }
    });






}



// Tableaux de noms pour les jours de la semaine et les mois
var joursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
var mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function showDate(dt_str) {

    var date = new Date(dt_str);


    // Obtenir le jour de la semaine, le jour du mois, le mois et l'année
    var jourSemaine = joursSemaine[date.getDay()];
    var jourMois = date.getDate();
    var moisNom = mois[date.getMonth()];
    var annee = date.getFullYear() % 100; // Récupérer seulement les deux derniers chiffres de l'année

    return jourSemaine + " " + jourMois + " " + moisNom + " " + annee;


}



function init_nav(){

    var roles = JSON.parse(sessionStorage.getItem("roles"))
  
    var menu = document.getElementById("accordionSidebar")
  
    var home =  create_option("home",false,"fas fa-fw fa-cog")
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


  