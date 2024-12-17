<?php

namespace App\Http\Controllers;

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
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $address = new Address();
        $address->user_id = Auth::user()->id;
        $address->nombre = $request->get('nombre');
        $address->patio = $request->get('patio');
        $address->puerta = $request->get('puerta');
        $address->piso = $request->get('piso');
        $address->cp = $request->get('cp');
        $address->localidad = $request->get('localidad');
        $address->pais = $request->get('pais');

        $address->save();

        return redirect('cuenta');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function formAddress(){
        return view('direccion');
    }
}
