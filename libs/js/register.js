const register = () => {

    event.preventDefault();
    
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "register.php?username=" + document.getElementById("username").value + "&password=" + document.getElementById("password").value, false)
    xmlhttp.send(null);

}