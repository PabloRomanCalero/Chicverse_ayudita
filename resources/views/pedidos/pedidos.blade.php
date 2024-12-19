<link rel="stylesheet" href="{{asset('css/pedidos/pedidos.css')}}">
@extends('layouts.layout')

@section('content')
<div class="container">
    <h1>Mis Pedidos</h1>

    @foreach ($orders as $order)
        <div class="cardContainer">
            <div class="cardHeader">
                <strong>Pedido #{{ $order->id }}</strong> - Estado: {{ $order->status }} - Total: {{ $order->totalPrice }} €
            </div>
            <div class="cardBody">
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
                        @php
                            $productSum = 0;
                        @endphp
                        @foreach ($order->orderLines as $line)
                            @php
                                $lineTotal = $line->quantity * $line->product->price;
                                $productSum += $lineTotal;
                            @endphp
                            <tr>
                                <td>{{ $line->product->name }}</td>
                                <td>{{ $line->quantity }}</td>
                                <td>{{ $line->talla }}</td>
                                <td>{{ $lineTotal }} €</td>
                            </tr>
                        @endforeach
                        @php
                            $shippingCost = $order->totalPrice - $productSum;
                        @endphp
                        <tr>
                            <td colspan="3" class="text-end"><strong>Costes de Envío:</strong></td>
                            <td>{{ $shippingCost }} €</td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-end"><strong>Total:</strong></td>
                            <td><strong>{{ $order->totalPrice }} €</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    @endforeach
</div>
@endsection