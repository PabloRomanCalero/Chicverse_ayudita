document.getElementById('seePassword').addEventListener('click', function () {
    console.log("hola");
    let password = document.getElementById('password');
    let type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    if(type === "text"){
        this.querySelector('i').classList = 'fa fa-eye-slash';
    }else {
        this.querySelector('i').classList = 'fa fa-eye';
    }
    
});