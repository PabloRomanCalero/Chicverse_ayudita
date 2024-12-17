<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $image = Image::get();
        return response()->json($image,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $image = new Image();
        $image->url = $request->url;
        $image->product_id = $request->product_id;
        $image->save();
        return response()->json(["url" => $image->url], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        return response()->json($image,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        $image->url = $request->get('url');
        $image->save();
        return response()->json([ $image], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }

    public function productImage($product_id){
        $image = Image::where('product_id', $product_id)->get();
        return response()->json($image, 200);
    }
}
