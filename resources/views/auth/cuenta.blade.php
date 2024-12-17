<script type="text/javascript" src="{!! asset('js/cuenta/cuenta.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/auth/cuenta.css')}}">

@extends('layouts.layout')

@section('content')
<section class="section-profile" id="section-profile">
    <div class="profile-info" id="profile-info">
    </div>
    <div class="profile-actions">
        <form id="profilePhotoForm" method="POST" action="{{route('profilePhoto')}}" enctype="multipart/form-data">
            @csrf
            <label for="profile_image" class="botonForm">Cambiar foto</label>
            <input type="file" class="form-control-file" id="profile_image" name="profile_image" placeholder="Cambiar foto" accept=".jpg, .jpeg, .png, .mp4">
        </form>
        <a class="botonForm" href="{{route('formMedia')}}">Publicar</a>
        <a class="botonForm" id="botonFormAddress" href="{{route('formAddress')}}">Añadir Direccion</a>
        <form method="POST" action="{{ route('logout') }}" class="deslogearse">
            @csrf
            <button id="boton" type="submit" class="botonForm">Salir</button>
        </form>
        <form method="POST" action="{{route('deleteUser')}}" id="deleteUserForm" class="deleteUserForm">
            @csrf
            @method('DELETE')
            <button type="submit" class="botonForm" id="eliminateUser">Eliminar</button>
        </form>
    </div>
    <div class="media-container" id="media-container"></div>
    
    <div class="botonLineaPedido" id="botonLineaPedido">
        <a href="{{route('showOrders')}}"><img src="https://cdn-icons-png.flaticon.com/512/3621/3621282.png"/></a>
    </div>
    
</section>
@endsection