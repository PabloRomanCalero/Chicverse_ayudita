<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
        $media = media::get();
        return response()->json($media,200);
    }

    public function mediaLogedUser()
    {
        $userId = Auth::user()->id;
        $media = media::where('user_id', $userId)->get();
        return response()->json($media,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = Auth::user()->id;
        $media = new media();

        $media->user_id = $userId;
        
    }

    /**
     * Display the specified resource.
     */
    public function show(media $medium)
    {
        return response()->json($medium,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, media $medium)
    {
        $medium->likes = $request->likes;
        $medium->description = $request->description;
        $medium->save();
        return response()->json($medium, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(media $medium)
    {
        $medium->delete();
        return response()->json(["eliminado"=>$medium],200);
    }

    public function userExceptMedia(){
        if (Auth::check()) {
            $userId = Auth::user()->id;
            $media = Media::where('user_id', '!=', $userId)->get();
        } else {
            $media = Media::all();
        }
        return response()->json($media, 200);
    }
    public function likesByMedia(Request $request){
        $media = Media::findOrFail($request->get('media_id'));
        $media->likes = $request->get('likes');
        $media->save();
        return response()->json(["likes" => $media->likes], 200);
    }

    public function mediaSearchedUser($userId){
        $media = Media::where('user_id', $userId)->get();
        return response()->json($media, 200);
    }
}
