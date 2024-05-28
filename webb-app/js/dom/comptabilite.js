var table_produits;

let produits = null;
let factures = null;
var vente_produit = [];

var formIntervalle = document.getElementById("intervalle");
var formJournee = document.getElementById("journee");

var serverAddress = new URL(window.location.href).hostname
console.log(serverAddress)


init_nav()


// recuperer tous les produits et les factures de la BD
async function getData() {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };


    produits = await fetch("http://"+serverAddress+":9003/api/produits", requestOptions)
        .then((response) => response.json()).
        catch((error) => {
            return new Promise((resolve, reject) => {
                reject(new Error("echec recuperation produits"))
            })
        })


    factures = await fetch("http://"+serverAddress+":9003/api/factures", requestOptions)
        .then((response) => response.json()).
        catch((error) => {
            return new Promise((resolve, reject) => {
                reject(new Error("echec recuperation factures"))
            })
        })




    return new Promise((resolve, reject) => {
        resolve()
    })


}


function printResult(result) {
    console.log(result)
}

getData().then(() => {

    //Initialisation du tableau
    table_produits = $('#dataTable').DataTable()

    // mise a jour du tableau avec informations de ventes des produits
    associate_product_to_quantity()
    vente_produit.forEach(element => {
        updateDom(element)
    })

}).
    catch(error => {
        console.log(error.messsage)
    })


function associate_product_to_quantity() {
    produits.forEach(pr => {

        var qte = 0;
        var montant = 0;

        factures.forEach(factures => {

            factures.produits.forEach(prFDto => {
                if (prFDto.produit.id == pr.id) {
                    qte += prFDto.qte
                    montant += prFDto.qte * prFDto.produit.prix
                }
            })

        })

        if (qte > 0) {
            vente_produit.push({
                "produit": pr,
                "qte": qte,
                "total": montant
            })

        }
    });
}

function updateDom(result) {

    table_produits.row('#row' + result.produit.id).remove();
    table_produits.row.add([
        result.produit.nom,
        result.produit.prix,
        result.qte,
        result.total
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

formIntervalle.addEventListener("submit", function (event) {
    event.preventDefault()


    var dateDebut = document.getElementById("debut").value
    var dateFin = document.getElementById("fin").value
    var dateDebut = new Date(dateDebut)
    var dateFin = new Date(dateFin)


    var dateFacture = new Date()
    vente_produit = []

    produits.forEach(pr => {

        var qte = 0;
        var montant = 0;

        factures.forEach(factures => {

            dateFacture = new Date(factures.date)
            if (dateFacture >= dateDebut && dateFacture <= dateFin) {

                factures.produits.forEach(prFDto => {
                    if (prFDto.produit.id == pr.id) {
                        qte += prFDto.qte
                        montant += prFDto.qte * prFDto.produit.prix
                    }
                })
            }

        })

        if (qte > 0) {
            vente_produit.push({
                "produit": pr,
                "qte": qte,
                "total": montant
            })

        }
    });

    table_produits.clear().draw()
    vente_produit.forEach(element => {
        updateDom(element)
    })

    document.getElementById("close_intervalle_modal").click()

    document.getElementById("message_date").innerHTML = "" + formatDate(dateDebut) + "   --  " + formatDate(dateFin)


})

function formatDate(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}


function init_nav(){

    var roles = JSON.parse(sessionStorage.getItem("roles"))
  
    var menu = document.getElementById("accordionSidebar")
  
    var home =  create_option("home",false,"fas fa-fw fa-cog")
    var produit =  create_option("produit",false,"fas fa-fw fa-wrench")
    var categorie =  create_option("categorie",false,"fas fa-fw fa-table")
    var facture =  create_option("facture",false,"fas fa-fw fa-folder")
    var utilisateur =  create_option("utilisateur",false,"fas fa-fw fa-user")
    var comptabilite =  create_option("comptabilite",true,"fas fa-fw fa-anchor")
  
    var hr = '<hr class="sidebar-divider"> '
    var button ='<div class="text-center d-none d-md-inline">\
    <button class="rounded-circle border-0" id="sidebarToggle"></button>\
    </div>'
  
  
   
  
    roles.forEach(role =>{
  
      if(role.nom=="secretaire"){
        menu.innerHTML  += (home + facture+hr)
      }else if(role.nom=="maganisier"){
        menu.innerHTML  += (produit +  categorie +hr)
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