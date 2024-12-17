<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products,200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new Product();

        $product->name = $request->name;
        $product->category = $request->category;
        $product->sex = $request->sex;
        $product->brand = $request->brand;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->save();

        return response()->json(["nombre" => $product->name], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json($product,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product->name = $request->name;
        $product->category = $request->category;
        $product->sex = $request->sex;
        $product->brand = $request->brand;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->save();

        return response()->json(["nombre" => $product->name], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(["eliminado"=>$product],201);
    }

    public function updatestock(Request $request, Product $product)
    {
        $product->stock = $request->get('stock');
        $product->save();

        return response()->json($product,201);
    }

    public function mediaProduct($product_id){
        $product = Product::where('id', $product_id)->get();
        return response()->json($product, 200);
    }

    public function productCategorySex($sex, $category){
        $products = Product::where('category', $category)
                            ->where('sex', $sex)
                            ->get();
        return response()->json($products, 200);
    }

    public function getProductById($product_id)
    {
        $product = Product::findOrFail($product_id);
        return response()->json($product, 200);
    }
}
