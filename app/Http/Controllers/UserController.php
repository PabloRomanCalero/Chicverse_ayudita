<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller
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
    public function profilePhoto(Request $request)
    {
        $user = Auth::user();

        if ($request->hasFile('profile_image')) {
            $userFolder = public_path('img/profilePhotos/' . $user->id);
            if (!file_exists($userFolder)) {
                mkdir($userFolder, 0755, true);
            }
            $fileName = $request->file('profile_image')->getClientOriginalName();
            $request->file('profile_image')->move($userFolder, $fileName);
            $user->profile_photo = 'img/profilePhotos/' . $user->id . '/' . $fileName;
            $user->save();
            return redirect()->back();
        }

        return redirect()->back()->with('error', 'No se proporcionó ninguna imagen válida.');
    }
    public function deleteUser()
    {
        $user = Auth::user();
        $user->delete();
        return redirect('/');
    }
    public function showSearchedUser(Request $request)
    {
        $user_id = $request->get('searchedUser');
        return view('searchedUser', compact('user_id'));
    }

}
