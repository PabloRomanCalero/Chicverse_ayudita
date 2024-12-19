<script type="text/javascript" src="{!! asset('js/carrito/carrito.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/carrito/carrito.css')}}">


@extends('layouts.layout')

@section('content')
    @csrf   
    <section class="section-carrito" id="section-carrito">
    </section>
    <script>
        var rutaDireccion = @json(route('formAddress'));
        var publicPath = "{{ asset('img/metodosPago') }}";
    </script>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://sandbox.paypal.com/sdk/js?client-id=AQicOrbA1lWUzcNVRIod-BAfgvDWdDes6JLNn6Q7NlipMPV1da9z9wl8Dgb9OYPfDYcjfZ5zpCzTpl5y&currency=EUR"></script>

@endsection