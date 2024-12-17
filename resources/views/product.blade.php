<script type="text/javascript" src="{!! asset('js/tienda/product.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/product.css')}}">

@extends('layouts.layout')

@section('content')
    @csrf
    
    <div class="product-container" id="product-container" data-product-id="{{$product_id}}"> 
    </div>
    <div id="snackbar"></div>
    <script>
        const tiendaUrl = "{{ route('tienda') }}";
    </script>
@endsection