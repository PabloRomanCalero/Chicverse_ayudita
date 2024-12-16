<link rel="stylesheet" href="{{asset('css/carrito/lineaPedido.css')}}">

@extends('layouts.layout')

@section('content')
    @csrf
    <section class="section-lineaPedido" id="section-lineaPedido">
        <div>Conexión con la base de datos y estado del pedido</div>
        <h2>Estados de los Pedidos</h2>

        <table class="table">
            <thead>
                <tr>
                    <th>ID del Pedido</th>
                    <th>Producto</th>
                    <th>Estado</th>
                    <th>Fecha de Pedido</th>
                </tr>
            </thead>
            <tbody id="tbody-estadoPedidos">
                @foreach ($pedidos as $pedido)
                    <tr
                     class="
                            @if ($pedido['estado'] == 0)
                                estado-completado
                            @elseif ($pedido['estado'] == 1)
                                estado-pendiente
                            @elseif ($pedido['estado'] == 2)
                                estado-cancelado
                            @else
                                estado-desconocido
                            @endif">
                        <td>{{ $pedido['id'] }}</td>
                        <td>{{ $pedido['name'] }}</td>
                        <td>
                            @if ($pedido['estado'] == 0)
                                Correcto
                            @elseif ($pedido['estado'] == 1)
                                Pendiente
                            @elseif ($pedido['estado'] == 2)
                                Fallido
                            @else
                                Desconocido
                            @endif
                        </td>

                        <td>{{ $pedido['fecha'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>
@endsection

