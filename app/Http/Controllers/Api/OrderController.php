<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders, 200);
    }

    public function orderCart()
    {
        if (Auth::user()) {
            $userId = Auth::user()->id;
            $orderCart = Order::where([['user_id', $userId], ['status', 'carrito']])->get();
            return response()->json($orderCart, 200);
        } else {
            return response()->json('no registrado', 200);
        }
    } 

    public function paidOrderList()
    {
        $userId = Auth::user()->id;
        $orderCart = Order::where([['user_id', $userId], ['status', 'pagado']])->get();

        return response()->json($orderCart, 200);
    } 

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order = new Order();
        $order->status = 'carrito';
        $order->type_payment = null;
        //$totalPrice = null;
        $currentTime = date('Y-m-d');
        $order->date = $currentTime;
        $order->user_id = Auth::user()->id;
        $order->save();

        return response()->json(['orderUser' => $order->user_id], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return response()->json($order,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->status = 'pagado';
        $order->address_id = $request->get('address_id');
        $order->totalPrice = $request->get('totalPrice');
        $order->save();
        return response()->json($order, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(["eliminado" => $order], 200);
    }
}
