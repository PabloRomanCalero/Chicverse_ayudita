<script type="text/javascript" src="{!! asset('js/tienda/tienda.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/tienda.css')}}">

@extends('layouts.layout')

@section('content')
    @csrf
    <div class="main-container"> 
        <div id="sexDiv">
            <div id="sex-hombre" class="selected">Hombre</div>
            <div id="sex-mujer">Mujer</div>
        </div>
        
        <div id="listaCategory">
            <h2>Seleccione el tipo de prenda:</h2>
            <ul>
                <li>Zapatillas</li>
                <li>Camisetas</li>
                <li>Polos</li>
                <li>Vaqueros</li>
                <li>Pantalones</li>
                <li>Chaquetas</li>               
            </ul>
            <div class="containerBuscador">
                <input type="text" id="buscador" name="buscador" placeholder="Buscar prenda" required>
                <div class="resultadosDiv" id="resultadosDiv"></div>
            </div>
        </div>

        
        
        <div id="product-container">
            
        </div>

        <div id="snackbar"></div>
    </div>
    
@endsection