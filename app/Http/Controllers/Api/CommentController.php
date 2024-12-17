<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
    public function show(Comments $comment)
    {
        return response()->json($comment,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comments $comments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comments $comment)
    {
        $comment->delete();
        return response()->json(["eliminado"=>$comment],200);
    }

    public function createComment(Request $request){
        $comment = new Comments; 
        $comment->user_id = Auth::user()->id;
        $comment->media_id = $request->get('media_id');
        $comment->comment = $request->get('comment');
        $comment->save();
        return response()->json(["created" => $comment]);
    }
    public function mediaComments(Request $request){
        $media_id = $request->get('media_id');
        $comments = Comments::where('media_id', $media_id)->get();
        return response()->json([$comments], 200);
    }
}
