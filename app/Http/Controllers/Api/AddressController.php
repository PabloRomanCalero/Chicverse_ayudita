<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $addresses = Address::where('user_id', $userId)->get();
        return response()->json([$addresses], 200);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function addressOrder($order_id)
    {
        $address = Address::where('order_id', $order_id)->get();
        return response()->json([$address], 200);
    }

    public function store(Request $request)
    {
        $userId = Auth::user()->id;
        $address = new Address();

        $address->userId = $userId;
        $address->nombre = $request->get('nombre');
        $address->patio = $request->get('patio');
        $address->puerta = $request->get('puerta');
        $address->piso = $request->get('piso');
        $address->cp = $request->get('cp');
        $address->localidad = $request->get('localidad');
        $address->pais = $request->get('pais');
        $address->user_id = $userId;

        $address->save();
        return response()->json([$address], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        $address->delete();
        return response()->json([$address, 200]);
    }
}
