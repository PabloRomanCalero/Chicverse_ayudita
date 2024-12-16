<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderLine;

class OrderLineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//         $pedidos = OrderLine::all();
        $pedidos = [
            [
                "id" => 0,
                "name" => "Zapatillas",
                "estado" => 0,
                "fecha" => "2024-12-16"
            ],
            [
                "id" => 1,
                "name" => "Camisa",
                "estado" => 1,
                "fecha" => "2024-12-17"
            ],
            [
                "id" => 2,
                "name" => "Pantalones",
                "estado" => 2,
                "fecha" => "2024-12-18"
            ],
            [
                "id" => 3,
                "name" => "Chaqueta",
                "estado" => 0,
                "fecha" => "2024-12-19"
            ],
            [
                "id" => 4,
                "name" => "Gorro",
                "estado" => 1,
                "fecha" => "2024-12-20"
            ],
            [
                "id" => 5,
                "name" => "Guantes",
                "estado" => 2,
                "fecha" => "2024-12-21"
            ],
            [
                "id" => 6,
                "name" => "Bufanda",
                "estado" => 1,
                "fecha" => "2024-12-22"
            ],
            [
                "id" => 7,
                "name" => "Botines",
                "estado" => 0,
                "fecha" => "2024-12-23"
            ],
            [
                "id" => 8,
                "name" => "Mochila",
                "estado" => 2,
                "fecha" => "2024-12-24"
            ],
            [
                "id" => 9,
                "name" => "Cinturón",
                "estado" => 1,
                "fecha" => "2024-12-25"
            ]
        ];

        return view('lineaPedido.index', compact('pedidos'));
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
        //
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
}
