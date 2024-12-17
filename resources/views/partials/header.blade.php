<script type="text/javascript" src="{!! asset('js/partials/header.js') !!}" defer></script>
<header class="header">
    <div class="left-section">
        <div class="logo">
            <span class="title">CHICVERSE</span>
            <a href="{{route('inicio')}}"><img src="{{asset('img/header/logo.svg')}}" alt="Logo"></a>
        </div>
    </div>
    <div class="middle-section">
        <div class="search">
            <form class="searchedUserForm" id="searchedUserForm" action="{{ route('searchedUser') }}" method="POST">
                @csrf
                <input id="searchUser" type="text" name="searchedUser" placeholder="Buscar usuarios">
                <button class="botonUserForm" id="botonUserForm" type="submit"></button>
            </form>
            <div class="resultadosUsersDiv" tabindex="0" id="resultadosUsersDiv"></div>
        </div>
    </div>
    <div class="right-section">
        <div class="dropdown">
            <button class="dropbtn"><img class="desplegable" src="{{asset('img/header/desplegable.png')}}"></button>
            <div class="dropdown-content">
                <div class="item">
                    <img src="{{asset('img/header/inicio.png')}}" class="imgDesplegable" alt="inicio">
                    <a href="{{route('inicio')}}">Inicio</a>
                </div>
                <hr>
                <div class="item">
                    <img src="{{asset('img/header/usuario.png')}}" class="imgDesplegable" alt="usuario">
                    <a href="{{route('cuenta')}}">Perfil</a>
                </div>
                <hr>
                <div class="item">
                    <img src="{{asset('img/header/ropa.png')}}" class="imgDesplegable" alt="tienda">
                    <a href="{{route('tienda')}}">Ropa</a>
                </div>
                <hr>
                <div class="item">
                    <img src="{{asset('img/header/carrito.png')}}" class="imgDesplegable" alt="carrito">
                    <a href="{{route('carrito')}}">Carrito</a>
                    <span id="numCarrito" class="numCarrito">0</span>
                </div>
            </div>
        </div>
    </div>
</header>