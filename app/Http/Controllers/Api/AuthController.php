<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Login user.
     *
     * @param Request $request
     * @return Response
     */
    public function login(Request $request)
    {
        $validator  = Validator::make($request->all(), [
            'username'      => 'required',
            'password'      => 'required'
        ]);

        if ($validator->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validator->messages()->all()
            ]);
        }

        $user       = User::where('email', $request->username)
                        ->orWhere('username', $request->username)
                        ->first();

        if (!$user) {
            return \response([
                'status'    => 'failed',
                'errors'    => 'User not found! Please contact admin.'
            ]);
        } else {
            if (!Auth::attempt($request->all())) {
                return \response([
                    'status'    => 'failed',
                    'errors'    => 'Wrong password!'
                ]);
            }
        }

        $token      = $user->createToken($user->username);

        return \response([
            'status'    => 'success',
            'data'      => [
                'token'     => $token->plainTextToken,
                'user_id'   => $user->id,
                'message'   => 'Successfully logged in.'
            ]
        ]);
    }
}
