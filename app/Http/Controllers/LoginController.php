<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function formRegistro(){
        return view('auth.registro');
    }

    public function registro(Request $request){
        
        $user = User::create([
            'dni' => $request->dni,
            'name' => $request->name,
            'surname' => $request->surname,
            'surname2' => $request->surname2,
            'phone' => $request->phone,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birthdate' => $request->birthdate,
        ]);
        Auth::login($user);
        return redirect('cuenta');
    }

    public function formLogin(){
        return view('auth.login');
    }

    public function login(Request $request){
        $datosLogin = $request->only('username', 'password');
        if(Auth::attempt($datosLogin)){

            if(Auth::user()->is_admin){
                return redirect('admin');
            }
            else{
                return redirect('cuenta');
            }
        }
        else{
            $error = 'Error al acceder a la aplicación';
            return view('auth.login', compact('error'));
        }
        
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    public function cuenta()
    {
        $user = Auth::user();
        return view('auth.cuenta', compact('user'));
    }
}
