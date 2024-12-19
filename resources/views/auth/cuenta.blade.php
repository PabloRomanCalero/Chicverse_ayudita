<script type="text/javascript" src="{!! asset('js/cuenta/cuenta.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/auth/cuenta.css')}}">

@extends('layouts.layout')

@section('content')
<section class="section-profile" id="section-profile">
    <div class="profile-info" id="profile-info">
    </div>
    <div class="profile-actions">  
        <div class="dropdown">
            <button class="dropdown-toggle botonForm">Opciones</button>
            <ul class="dropdown-menu">
                <li><a href="{{route('formMedia')}}">Publicar</a></li>
                <li><a href="{{route('formAddress')}}">Añadir Dirección</a></li>
                <li>
                    <form method="POST" action="{{ route('logout') }}" class="deslogearse">
                        @csrf
                        <img src=""/>
                        <button type="submit" class="dropdown-button">Salir</button>
                    </form>
                </li>
                <li>
                    <form id="profilePhotoForm" method="POST" action="{{route('profilePhoto')}}" enctype="multipart/form-data">
                        @csrf
                        <label for="profile_image" class="botonForm">Cambiar foto</label>
                        <input type="file" class="form-control-file" id="profile_image" name="profile_image" placeholder="Cambiar foto" accept=".jpg, .jpeg, .png, .mp4">
                    </form>
                </li>
                <li>
                    <form method="POST" action="{{route('deleteUser')}}" id="deleteUserForm" class="deleteUserForm">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="dropdown-button">Eliminar Cuenta</button>
                    </form>
                </li>
                <li>
                    <a href="{{route('showOrders')}}"><img src="https://cdn-icons-png.flaticon.com/512/3621/3621282.png"/>Mis Pedidos</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="media-container" id="media-container"></div>
    
</section>
@endsection