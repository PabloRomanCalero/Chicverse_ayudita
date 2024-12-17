<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Address;
use App\Models\media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::check()) {
            $userId = Auth::user()->id;
            $users = User::where('id', '!=', $userId)->get();
        } else {
            $users = User::all();
        }
        return response()->json($users, 200);
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
    public function show(User $user)
    {
        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->surname2 = $request->surname2;
        $user->username = $request->username;
        $user->dni = $request->dni;
        $user->phone = $request->phone;
        $user->birthdate = $request->birthdate;
        $user->save();
        return response()->json(["nombre" => $user->name], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(["eliminado" => $user]);
    }

    public function viewUser()
    {
        $user = Auth::user();
        $userId = Auth::user()->id;
        $direcciones = Address::where('user_id', $userId)->get();
        $media = media::where('user_id', $userId)->get();
        $mediaCount = media::where('user_id', $userId)->count();
        $followers = $user->followers()->count();
        $following = $user->following()->count();  
        return response()->json([$user, $direcciones, $media, $mediaCount, $followers, $following], 200);
    }
    
    //sacar usuario por id, lo he utilizado tambien para sacar la imagen
    public function viewUserMedia($userId)
    {
        $user = User::find($userId); 
        $direcciones = Address::where('user_id', $userId)->get();
        $media = media::where('user_id', $userId)->get();
        $mediaCount = media::where('user_id', $userId)->count();
        $followers = $user->followers()->count();
        $following = $user->following()->count();
        return response()->json([$user, $direcciones, $media, $mediaCount, $followers, $following], 200);
    }

    public function getRandomUsers()
    {   
        if (Auth::check()) {
            $userId = Auth::user()->id;
            $users = User::where('id', '!=', $userId)
                        ->inRandomOrder()
                        ->take(5)
                        ->get();
        } else {
            $users = User::inRandomOrder()
                        ->take(5)
                        ->get();
        }
        return response()->json($users, 200);
    }

    public function getUserIdLogged()
    {   
        if (Auth::check()) {
            $userId = Auth::user()->id;
            return response()->json($userId, 200);
        } else {
            return response()->json("not_logged", 200);
        }
        
    }
}
