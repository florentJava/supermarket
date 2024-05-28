var form = document.getElementById("login_form")

var form = document.getElementById("login_form")
var serverAddress = new URL(window.location.href).hostname

console.log(serverAddress)
console.log("===========")

var utilisateurs;


loadUsers()

form.addEventListener('submit', (event) => {
    event.preventDefault();

    var formData = new FormData(form)

    console.log("uN " + formData.get("username") + "  pass : " + formData.get("pass"))

    console.log(utilisateurs)

    var user
    utilisateurs.forEach(element => {
        if(element.userName== formData.get("username") && element.mdp == formData.get("pass"))
        user =element
    });
            
    if(user){
        console.log("user "+ user.rolesDto)

        sessionStorage.setItem("roles",JSON.stringify(user.rolesDto))
        sessionStorage.setItem("user",JSON.stringify(user.nom))
        window.location.href="dashboard.html"


        
    }else{
    }

})




async function loadUsers() {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
var url = "http://"+serverAddress+":9003/api/employes"
    utilisateurs = fetch( url, requestOptions)
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
