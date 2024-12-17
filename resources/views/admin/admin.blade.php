<script type="text/javascript" src="{!! asset('js/admin/admin.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/admin/admin.css')}}">
@extends('layouts.layout')

@section('content')
    <section class="section-admin">
    <h1 class="titulo"> VISTA DE ADMIN PARA ADMINISTRAR LA APLICACIÓN</h1>
    <h2 class="name-admin">Admin:{{Auth::user()->name}}</h2>
        @csrf
        <article class="article-modalidades">
            <button id="usuarios">Usuarios</button>
            <button id="publicaciones">Publicaciones</button>
            <button id="pedidos">Pedidos</button>
            <button id="productos">Productos</button>
            <button id="crear-productos">Crear Productos</button>
        </article>
        <article id="edicion"></article>
        <article class="listado-admin" id="productos-usuarios">

        </article>
    </section>
@endsection