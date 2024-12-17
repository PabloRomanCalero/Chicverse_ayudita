<link rel="stylesheet" href="{{asset('css/auth/registro.css')}}">
<link rel="icon" type="image/png" href="{{asset('img/sidebar/logo.svg')}}">
<script type="text/javascript" src="{!! asset('js/registro/registro.js') !!}" defer></script>

<div class="main-registro">
    <section class="section-registro">
        <article class="article-registro-img">
            <img src= '{{asset("img/sidebar/logo.svg")}}' width="200px" height="200px" alt="Logo"/>
        </article>
        <article class="article-registro-form">
        <form action="{{route('registro')}}" method="POST" id="form">
            @csrf
            <div class="div-title"><h1>REGISTRO</h1></div>

            <fieldset class="fieldset-personal">
                <legend>DATOS PERSONALES</legend>
                <div>
                    <label for="name">Nombre</label>
                    <input type="text" name="name" id="name">
                </div>
                <div>
                    <label for="surname">Primer apellido</label>
                    <input type="text" name="surname" id="surname">
                </div>
                <div>
                    <label for="surname2">Segundo Apellido</label>
                    <input type="text" name="surname2" id="surname2" placeholder="Opcional">
                </div>
                <div>
                    <label for="dni">DNI</label>
                    <input type="text" name="dni" id="dni">
                </div>
                <div>
                    <label for="phone">Número de teléfono</label>
                    <input type="number" name="phone" id="phone">
                </div>
                <div>
                    <label for="birthdate">Fecha de nacimiento</label>
                    <input type="date" name="birthdate" id="birthdate">
                </div>
            </fieldset>

            <fieldset class="fieldset-cuenta">
                <legend>DATOS DE LA CUENTA</legend>
                <div>
                    <label for="username">Nombre de Usuario</label>
                    <input type="text" name="username" id="username">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email">
                </div>
                <div>
                    <label for="password">Contraseña</label>
                    <input type="password" name="password" id="password">
                </div>
                <div>
                    <label for="confirmar-password">Confirmar contraseña</label>
                    <input type="password" name="confirmar-password" id="confirmar-password">
                </div>
            </fieldset>

            <div class="div-boton-enviar">
                <button class="boton-enviar">Registrarse</button>
            </div>
            <div class="volver-inicio-registro">
                <a href="{{route('inicio')}}">Volver</a>
            </div>
        </form>

        </article>
    </section>
</div>
