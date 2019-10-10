<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['login','signUp']);
    }

    public function login(Request $request) {
       $input = $request->all();
       try {
           if ($token = $this->guard()->attempt($input)) {
               return response()->json([
                   'auth_token' => $token,
               ],200);
           } else {
               return response()->json([
                   'message' => 'Invalid credentials'
               ],422);
           }
       }catch (JWTException $exception) {
           return response()->json([
               'message' => 'Oops! something went wrong, Pls try again.'
           ],500);
       }
    }

    public function me()
    {
        return response()->json([
            'user' => auth()->user()
        ],200);
    }

    public function signUp(Request $request)
    {
        $input = $request->all();
        User::create($input);
        return response()->json([
            'message' => 'user created successfully'
        ],200);
    }

    public function logout()
    {
        $this->guard()->logout();
        return response()->json([
            'message' => 'logout successfully'
        ],200);
    }

    public function guard()
    {
        return Auth::guard('api');
    }

}
