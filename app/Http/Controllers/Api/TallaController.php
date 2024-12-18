<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tallas;
use Illuminate\Http\Request;

class TallaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tallas = Tallas::all();
        return response()->json($tallas,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $talla = new Tallas();

        $talla->product_id = $request->product_id;
        $talla->talla = $request->talla;
        $talla->stock = $request->stock;
        
        $talla->save();

        return response()->json(["nombre" => $talla->talla], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tallas $talla)
    {
        return response()->json($talla,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tallas $talla)
    {
        $talla->stock = $request->stock;
        $talla->save();

        return response()->json(["stock" => $talla->stock], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function tallasOfProduct(Request $request)
    {
        $tallas = Tallas::where('product_id', $request->product_id)->get();
        return response()->json($tallas,200);
    }

    public function getStockOfTalla($product_id, $size)
    {
        $talla = Tallas::where('product_id', $product_id)->where('talla', $size)->first();
        if ($talla) {
            return response()->json([
                'talla' => $talla->talla,
                'stock' => $talla->stock
            ], 200);
        } else {
            return response()->json(['error' => 'Talla no encontrada'], 404);
        }
    }

    public function updatestock(Request $request)
    {
        $talla = Tallas::where('product_id', $request->product_id)->where('talla', $request->talla)->first();
        $talla->stock = $request->get('stock');
        $talla->save();

        return response()->json($talla,201);
    }
}
