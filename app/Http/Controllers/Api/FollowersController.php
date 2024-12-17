<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Followers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FollowersController extends Controller
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
    public function show(Followers $followers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Followers $followers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Followers $followers)
    {
        //
    }

    
    public function followUser(Request $request)
    {
        $follower = new Followers();
        $authUserid = Auth::user()->id;
        $user_id = $request->get('searchedUserId');
        $follower->user_id = $user_id;
        $follower->follower_id = $authUserid;
        $follower->save();
    }

    public function unfollowUser(Request $request)
    {
        $authUserId = Auth::user()->id;
        $user_id = $request->get('searchedUserId2');
        $followers = Followers::where('user_id', $user_id)->where('follower_id', $authUserId);
        $followers->delete();
    }

    public function getFollowers($userId)
    {
        $user = User::find($userId); 
        $followers = $user->followers()->count();
        return response()->json($followers, 200);
    }
}
