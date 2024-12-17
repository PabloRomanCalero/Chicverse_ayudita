<?php

namespace App\Http\Controllers;

use App\Models\media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class mediaController extends Controller
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
    public function formMedia(){
        return view('media');
    }

    public function uploadMedia(Request $request)
    {
        $media = new media();
        $userId = Auth::user()->id;
        
        if ($request->hasFile('file')) {
            $userFolder = public_path('media');
            $fileName = $request->file('file')->getClientOriginalName();
            $request->file('file')->move($userFolder, $fileName);
            $media->user_id = $userId;
            $media->product_id = $request->get('buscador');
            $media->url = 'media/' . $fileName;
            $media->description = $request->get('description');
            $media->save();
            return redirect('cuenta');
        }
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
