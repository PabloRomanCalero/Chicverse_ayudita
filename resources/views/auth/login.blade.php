<link rel="stylesheet" href="{{asset('css/auth/login.css')}}">
<link rel="icon" type="image/png" href="{{asset('img/sidebar/logo.svg')}}">
<script type="text/javascript" src="{!! asset('js/login/login.js') !!}" defer></script>
<script src="https://kit.fontawesome.com/ad1cd15c21.js" crossorigin="anonymous"></script>
<div class="main-login">
    <section class="section-login">
        <article class="article-login-img">
            <img src='{{asset("img/sidebar/logo.svg")}}' alt="Logo" />
        </article>
        <article class="article-login-form">
            <form action="{{route('login')}}" method="POST">
                @csrf
                <article class="titulo">
                    <h1>LOGIN</h1>
                </article>
                <article>
                    <label for="username">Nombre de usuario:</label>    
                    <div class="input-group">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" name="username" id="username" placeholder="Nombre de usuario">
                    </div>          
                </article>

                <article>
                    <label for="password">Contraseña:</label>
                    <div class="input-group">
                        <i class="fa fa-lock"></i>
                        <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña">
                        <button type="button" id="seePassword"><i class="fa fa-eye"></i></button>
                    </div>
                </article>
                <article class="article-boton">
                    <input class="boton" type="submit" name="enviar" value="Login">
                    <a class="boton" href="{{route('contacto')}}">Contraseña olvidada</a>
                </article>
                <article class="volver-inicio-login">
                    <a href="{{route('inicio')}}">Volver</a>
                </article>
                <article class="registro">
                    <a href="{{route('registro')}}">Crear cuenta</a>
                </article>
                <article class="errors">
                    @isset($error)
                    <p>{{$error}}</p>
                    @endisset
                </article>
                
            </form>
        </article>

    </section>
</div>