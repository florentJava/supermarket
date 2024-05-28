var utilisateurs = null;
var table_produits;

var formUpdate = document.getElementById('updateUser');
var form = document.getElementById('newUser');


var serverAddress = new URL(window.location.href).hostname
console.log(serverAddress)

init_nav()


loadUsers().then((r) => {
    console.log(utilisateurs);

    table_produits = $('#dataTable').DataTable()


    utilisateurs.forEach(element => {
        updateDom(element);
    });
})

// creation d'un nouvelle employee
form.addEventListener('submit', function (e) {
    e.preventDefault();


    var newUser = null;
    var formData = new FormData(form);

    var selectValues = formData.getAll('roles[]');
    var rolesDto = [];

    selectValues.forEach(function (value) {
        rolesDto.push({
            "id": value
        });
    });

    var json = {
        "nom": formData.get('nom'),
        "prenom": formData.get('prenom'),
        "phone": formData.get('number'),
        "sexe": formData.get('sexe'),
        "dateN": formData.get('naissance'),
        "userName": formData.get('nom'),
        "mdp": formData.get('prenom'),
        "rolesDto": rolesDto
    }


    const raw = JSON.stringify(json);






    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: "follow"
    };

    fetch("http://"+serverAddress+":9003/api/employes", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));





});


async function loadUsers() {



    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    utilisateurs = fetch("http://"+serverAddress+":9003/api/employes", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            utilisateurs = data;

        })
        .catch((error) => {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        });

    return new Promise((resolve, reject) => {
        resolve(utilisateurs);
    });


}





// Fonction qui remplace une ligne dans le tableau
function updateDom(result) {


    var roles = "";
    result.rolesDto.forEach(element => {

        if (element.id == 1) {
            roles += '<span class="badge rounded-pill text-bg-primary">' + element.nom + '</span>'
        } else if (element.id == 2) {
            roles += '<span class="badge rounded-pill text-bg-warning">' + element.nom + '</span>'
        } else if (element.id == 3) {
            roles += '<span class="badge rounded-pill text-bg-danger">' + element.nom + '</span>'
        }
    })

    table_produits.row('#row' + result.id).remove();
    table_produits.row.add([
        result.nom,
        result.prenom,
        calculateAge(result.dateN),
        result.sexe,
        result.phone,
        roles,
        '<div class="dropdown">\
      <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">\
        choisir\
      </button>\
      <ul class="dropdown-menu">\
        <li><button class="dropdown-item" onclick="modifier('+ result.id + ')" data-bs-toggle="modal" data-bs-target="#updateEmploye" type="button">modifier</button></li>\
        <li><button class="dropdown-item" onclick=reinitialiser('+ result.id + ') data-toggle="modal" data-target="#ravitaillerModal" type="button">reinitialiser</button></li>\
        <li><button class="dropdown-item" onclick=bloquer('+ result.id + ') data-toggle="modal" data-target="#ravitaillerModal" type="button">boquer</button></li>\
      </ul>\
    </div>'
    ]).draw().node().id = 'row' + result.id;

    table_produits.draw();

    var cpt = 0
    utilisateurs.forEach(element => {
        if (element.id == result.id) {
            utilisateurs[cpt] = result
        }
        cpt++
    });
}


// Function that calculates the age based on a given date
function calculateAge(date) {

    var birthDate = new Date(date);
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has already occurred this year
    if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function modifier(id) {

    var body = document.getElementById('updateUser')

    var user = utilisateurs.find(element => element.id == id);
    var empty = "";



    var sexes = ["feminin", "masculin"]
    body.innerHTML = '\
    <div class="modal-body">\
    <input type="number" name="update_id" id="update_id" value=' + user.id + ' hidden>\
        <div class="form-floating mb-3">\
        <input type="text" class="form-control" value='+ user.nom + ' id="nom" name="nom" required>\
        <label for="nom">Nom</label>\
    </div>\
    <div class="form-floating mb-3">\
        <input type="text" class="form-control" id="prenom" value='+ user.prenom + ' name="prenom" required>\
        <label for="prenom">Prenom</label>\
    </div>\
    <div class="form-floating mb-3">\
        <input type="date" class="form-control" id="naissance" value='+ user.dateN + ' name="naissance" required>\
        <label for="naissance">Naissance</label>\
    </div>\
    <div class="form-floating mb-3">\
    <select class="form-select" id="sexe" name="sexe"\
            aria-label="Floating label select example required">\
            <option value="feminin" >Feminin</option>\
           <option value="masculin" selected>masculin</option>\
       </select>\
       <label for="sexe">Sexe</label>\
   </div>\
   <div class="form-floating mb-3">\
        <input type="number" class="form-control" id="number" value='+user.phone+' name="number" required>\
        <label for="number">Telephone</label>\
    </div>\
    <div class="form mb-3">\
        <label for="multiple-select-field">Roles</label>\
        <select class="form-control" id="multiple-select-field2" name="roles[]"\
            placeholder="Choose anything" multiple required>\
            <option value="1">secretaire</option>\
            <option value="2">magasinier</option>\
            <option value="3">admin</option>\
        </select>\
    </div>\
</div>\
<div class="modal-footer">\
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\
    <button type="submit" class="btn btn-primary">Ok</button>\
</div>'


var role = $('#multiple-select-field2').select2({
    theme: "bootstrap-5",
})

var selectedValues = user.rolesDto.map(element => element.id);

user.rolesDto.forEach(element => {
    role.val(selectedValues).trigger('change');
})


}


formUpdate.addEventListener('submit', function (e) {
    e.preventDefault();

    var newUser = null;
    var formData = new FormData(formUpdate);

    var selectValues = formData.getAll('roles[]');
    var rolesDto = [];

    selectValues.forEach(function (value) {
        rolesDto.push({
            "id": value
        });
    });

    var json = {
        "id": formData.get('update_id'),
        "nom": formData.get('nom'),
        "prenom": formData.get('prenom'),
        "phone": formData.get('number'),
        "sexe": formData.get('sexe'),
        "dateN": formData.get('naissance'),
        "userName": formData.get('nom'),
        "mdp": formData.get('prenom'),
        "rolesDto": rolesDto
    }


    console.log(json)
    const raw = JSON.stringify(json);

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: "follow"
    };

    fetch("http://"+serverAddress+":9003/api/employes/update", requestOptions)
        .then((response) => response.json())
        .then((result) => updateDom(result))
        .catch((error) => console.error(error));


    document.getElementById("close_updateCategorieModal").click();
})


function init_nav(){

    var roles = JSON.parse(sessionStorage.getItem("roles"))
  
    var menu = document.getElementById("accordionSidebar")
  
    var home =  create_option("home",false,"fas fa-fw fa-cog")
    var produit =  create_option("produit",false,"fas fa-fw fa-wrench")
    var categorie =  create_option("categorie",false,"fas fa-fw fa-table")
    var facture =  create_option("facture",false,"fas fa-fw fa-folder")
    var utilisateur =  create_option("utilisateur",true,"fas fa-fw fa-user")
    var comptabilite =  create_option("comptabilite",false,"fas fa-fw fa-anchor")
  
    var hr = '<hr class="sidebar-divider"> '
    var button ='<div class="text-center d-none d-md-inline">\
    <button class="rounded-circle border-0" id="sidebarToggle"></button>\
    </div>'
  
  
   
  
    roles.forEach(role =>{
  
      if(role.nom=="secretaire"){
        menu.innerHTML  += (home + facture+hr)
      }else if(role.nom=="maganisier"){
        menu.innerHTML  += (produit + categorie+hr)
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