<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Descuento;
use App\Models\media;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DescuentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $descuentosUser = Descuento::where('user_id', $userId)->get();
        return response()->json($descuentosUser, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Descuento $descuento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Descuento $descuento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Descuento $descuento)
    {
        //
    }
    public function verificarLikesDescuento(Request $request)
    {
        $userId = $request->get('user_id');
        $medios = media::where('user_id', $userId)->get();

        foreach ($medios as $medio) {
            $likes = $medio->likes;
            $descuentoPorcentaje = 0;

            if ($likes == 5000) {
                $descuentoPorcentaje = 0.15;
            } elseif ($likes == 1500) {
                $descuentoPorcentaje = 0.10;
            } elseif ($likes == 1) {//esta en 1 para poder ver su funcionamiento facilmente, podriamos ponerlo a los 150 likes
                $descuentoPorcentaje = 0.05;
            }

            if ($descuentoPorcentaje > 0) {
                $fechaExpiracion = Carbon::now()->addDays(30);
                echo($fechaExpiracion);
                $descuento = new Descuento();
                $descuento->user_id = $userId;
                $descuento->descuento = $descuentoPorcentaje;
                $descuento->fecha_expiracion = $fechaExpiracion;
                $descuento->save();
            }
        }
    }
}
