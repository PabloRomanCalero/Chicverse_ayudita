<link rel="stylesheet" href="{{asset('css/direccion.css')}}">
@extends('layouts.layout')

@section('content')
    <section class="section-address">
        <h2>Crear Dirección</h2>
        <form action="{{route('crearDireccion')}}" method="POST">
            @csrf
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br>
            
            <label for="patio">Patio:</label>
            <input type="text" id="patio" name="patio" required><br>
            
            <label for="puerta">Puerta:</label>
            <input type="text" id="puerta" name="puerta" required><br>
            
            <label for="piso">Piso:</label>
            <input type="text" id="piso" name="piso" required><br>
            
            <label for="cp">Código Postal:</label>
            <input type="number" id="cp" name="cp" required><br>
            
            <label for="localidad">Localidad:</label>
            <input type="text" id="localidad" name="localidad" required><br>
            
            <label for="pais">País:</label>
            <input type="text" id="pais" name="pais" required><br>
            
            <button class="botonForm" type="submit">Guardar</button>        
        </form>
    </section>
@endsection