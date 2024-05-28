var roles = sessionStorage.getItem("roles")

if(roles){
    console.log(roles)

    sessionStorage.getItem("roles")




    document.getElementById("name_profile").innerHTML = JSON.parse(sessionStorage.getItem("user"))

}else{
    window.location.href="index.html"
}
