<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderLine;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderLineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()) {
            $userId = Auth::user()->id;
            $orderCart = Order::where([['user_id', $userId], ['status', 'carrito']])->get();
            if(!$orderCart->isEmpty()){
                $orderLine = $orderCart[0]->id;
                $orderLines = OrderLine::where('order_id', $orderLine)->get();
            
                return response()->json($orderLines, 200);
            }else{
                return response()->json('no hay order', 200);
            }
        } else {
            return response()->json('error', 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $orderLine = new OrderLine();
        $orderLine->order_id = $request->get('order_id');
        $orderLine->product_id = $request->get('product_id');
        $orderLine->quantity = $request->get('quantity');
        $orderLine->talla = $request->get('talla');
        $orderLine->save();
        return response()->json($orderLine, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderLine $orderLine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderLine $orderLine)
    {
        $orderLine->quantity = $request->get('quantity');
        $orderLine->save();
        return response()->json($orderLine, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderLine $orderLine)
    {
        $orderLine->delete();
        return response()->json(["eliminado" => $orderLine], 200);
    }

    public function listOrdersWithProducts($id_order)
    {
        $arrayOrderProductos = array();
        $order_lines = OrderLine::where('order_id', $id_order)->get();
        foreach ($order_lines as $orderLine) {
            $orderLineProductId = $orderLine->product_id;
            $product = Product::where('id', $orderLineProductId)->get();
            array_push($arrayOrderProductos, [$product[0]->name, $product[0]->price, $orderLine->quantity]);
        }
        return response()->json([$arrayOrderProductos], 200);
    }
}
