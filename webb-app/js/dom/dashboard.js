var serverAddress = new URL(window.location.href).hostname
console.log(serverAddress)


init_nav()


function init_nav() {

  var roles = JSON.parse(sessionStorage.getItem("roles"))

  var menu = document.getElementById("accordionSidebar")

  var home = create_option("home", false, "fas fa-fw fa-cog")
  var produit = create_option("produit", false, "fas fa-fw fa-wrench")
  var categorie = create_option("categorie", false, "fas fa-fw fa-table")
  var facture = create_option("facture", false, "fas fa-fw fa-folder")
  var utilisateur = create_option("utilisateur", false, "fas fa-fw fa-user")
  var comptabilite = create_option("comptabilite", false, "fas fa-fw fa-anchor")

  var hr = '<hr class="sidebar-divider"> '
  var button = '<div class="text-center d-none d-md-inline">\
    <button class="rounded-circle border-0" id="sidebarToggle"></button>\
    </div>'




  roles.forEach(role => {

    if (role.nom == "secretaire") {
      menu.innerHTML += (home + facture + hr)
    } else if (role.nom == "maganisier") {
      menu.innerHTML += (produit + categorie + hr)
    } else if (role.nom == "admin") {
      menu.innerHTML += comptabilite + utilisateur + hr
    }


  })
  menu.innerHTML += button

}

function create_option(link, active, icon) {

  if (active) {
    return '<li class="nav-item active">\
      <a class="nav-link collapsed" href="'+ link + '.html" aria-expanded="true" aria-controls="collapseTwo">\
          <i class="'+ icon + '"></i>\
          <span>'+ link + '</span>\
      </a>\
      </li>'

  } else {
    return '<li class="nav-item">\
      <a class="nav-link collapsed" href="'+ link + '.html" aria-expanded="true" aria-controls="collapseTwo">\
          <i class="'+ icon + '"></i>\
          <span>'+ link + '</span>\
      </a>\
      </li>'
  }
}



var factures;


const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("http://"+serverAddress+":9003/api/factures", requestOptions)
  .then((response) => response.json())
  .then((result) => {

    factures = result
    next(result)
    totalYears(result)



    fetch("http://"+serverAddress+":9003/api/produits", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getNombreProduits(result)

        totalPerProduits(result, factures)



      })
  })






function next(factures) {

  var date = new Date()
  var total_mois = 0
  factures.forEach(element => {

    var date_facture = new Date(element.date)

    if (date.getMonth() == date_facture.getMonth()) {
      total_mois += element.total
    }

  })



  document.getElementById("vente_mois").innerHTML = formatNumber(total_mois)


}



function totalYears(factures) {
  var date = new Date()
  var total_ans = 0
  factures.forEach(element => {

    var date_facture = new Date(element.date)

    if (date.getFullYear() == date_facture.getFullYear()) {
      total_ans += element.total
    }

  })


  document.getElementById("vente_ans").innerHTML = formatNumber(total_ans)


}

function formatNumber(somme) {
  somme += " "

  var final = ""
  for (let i = somme.length - 1; i >= 0; i--) {

    if (i % 3 == 0) {
      final = somme[i] + " " + final
    } else {
      final = somme[i] + final
    }

  }

  return final
}

function getNombreProduits(produits) {

  var nbr_stock = 0;
  var nbr_rupture = 0;
  produits.forEach(element => {

    if (element.qte_stock > element.qte_critique)
      nbr_stock++
    else
      nbr_rupture++
  })

  document.getElementById("nbr_stock").innerHTML = nbr_stock
  document.getElementById("nbr_rupture").innerHTML = nbr_rupture



}


function totalVente(factures) {

  var total = 0;
  factures.forEach(element => {

    var date_facture = new Date(element.date)

    total += element.total


  })

  return total

}


function totalPerProduits(produits, factures) {

  var total_per_produt = []
  var final_list = []
  var total = 0

  produits.forEach(element => {
    total_per_produt.push({
      "id": element.id,
      "nom": element.nom,
      "qte": 0
    })
  })

  factures.forEach(facture => {


    facture.produits.forEach(produitVente => {

      total_per_produt.forEach(total_produit => {
        if (produitVente.produit.id == total_produit.id) {

          total += produitVente.qte * produitVente.produit.prix
          total_produit.qte += produitVente.qte * produitVente.produit.prix
        }
      })

    })
  })

  total_per_produt.forEach(total_produit => {

    total_produit.qte = total_produit.qte / total * 100

    if (total_produit.qte > 0)
      final_list.push(total_produit)
  })


  final_list.sort(function (a, b) {
    return a.qte - b.qte;
  });



  if (final_list.length > 5) {
    final_list = final_list.slice(final_list.length - 5, final_list.length)
  }

  final_list.forEach(element => {
    createStat(element.nom, element.qte)
  })


}



function createStat(nom, pourcentage) {

  document.getElementById("les_plus_vendus").innerHTML = '<h4 class="small font-weight-bold">' + nom + '<span class="float-right">' + pourcentage.toFixed(2) + '%</span></h4>\
<div class="progress mb-4">\
<div class="progress-bar" role="progressbar" style="width: '+ pourcentage + '%"\
    aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>\
</div>' + document.getElementById("les_plus_vendus").innerHTML

}


