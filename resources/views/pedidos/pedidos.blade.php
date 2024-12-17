<link rel="stylesheet" href="{{asset('css/pedidos/pedidos.css')}}">
@extends('layouts.layout')

@section('content')
<div class="container">
    <h1>Mis Pedidos</h1>

    @foreach ($orders as $order)
        <div class="card mb-4">
            <div class="card-header">
                <strong>Pedido #{{ $order->id }}</strong> - Estado: {{ $order->status }} - Total: {{ $order->totalPrice }} €
            </div>
            <div class="card-body">
                <p><strong>Tipo de Pago:</strong> {{ $order->type_payment }}</p>
                <p><strong>Fecha:</strong> {{ $order->date }}</p>

                <h5>Líneas del Pedido</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Talla</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($order->orderLines as $line)
                            <tr>
                                <td>{{ $line->product->name }}</td> 
                                <td>{{ $line->quantity }}</td>       
                                <td>{{ $line->talla }}</td>          
                                <td>{{ $line->quantity * $line->product->price }} €</td> 
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endforeach
</div>
@endsection