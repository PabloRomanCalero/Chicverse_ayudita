<script type="text/javascript" src="{!! asset('js/media/media.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/media.css')}}">
@extends('layouts.layout')

@section('content')
    <section class="section-media">
        <h1>Subir Publicación</h1>
        <form action="{{route('uploadMedia')}}" method="post" class="formMedia" enctype="multipart/form-data">
            @csrf

            <label for="description">Descripción:</label>
            <textarea id="description" name="description" rows="4" maxlength="120" required></textarea>

            <div class="inputFileWrapper">
                <label class="botonForm" for="file">Cargar media</label>
                <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png, .mp4, .mov" required>

                <div class="progress-container">
                    <div class="progress-bar" id="progressBar">0%</div>
                </div>
            </div>

            <div class="containerBuscador">
                <label for="prenda">Prenda:</label>
                <input type="text" id="buscador" name="buscador" placeholder="Seleccione la prenda" required>
                <div class="resultadosDiv" id="resultadosDiv"></div>
            </div>
        
            <button class="botonForm" type="submit" id="botonForm" disabled>Subir Contenido</button>
        </form>
    </section>
@endsection