<link rel="stylesheet" href="{{asset('css/extras/mapa-web.css')}}">

@extends('layouts.layout')

@section('content')
    <section class="section-mapaweb">
        <h1 class="titulo-extra">Mapa Web</h1>
        <article class="article-mapaweb">

            <ul class="lista-mapaweb">
                <li> <a class="inicio-rutas-mapaWeb" href="{{route('inicio')}}">Inicio</a>
                    <ul>
                        <li class="rutas-mapaweb">Cabecera :
                            <ul>
                                <li><a href="{{route('login')}}">-> Login</a></li>
                                <li><a href="{{route('registro')}}">-> Registro</a></li>
                                <li><a href="{{route('tienda')}}">-> Tienda</a></li>
                                <li><a href="{{route('cuenta')}}">-> Perfil</a></li>
                                <li><a href="{{route('carrito')}}">-> Carrito</a></li>
                            </ul>
                        </li>
                        <li class="rutas-mapaweb">Pie de página :
                            <ul>
                                <li><a href="{{route('politicas')}}">-> Política y privacidad</a></li>
                                <li><a href="{{route('contacto')}}">-> Contacto</a></li>
                                <li><a href="{{route('mapa-web')}}">-> Mapa Web</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </article>
    </section>
@endsection