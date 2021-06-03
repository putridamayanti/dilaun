<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request, User $user)
    {
        if ($request->get('role') && $request->get('role') !== 'All') {
            $user   = $user->where('role', $request->get('role'));
        }

        if ($request->get('sort') === 'Oldest') {
            $user   = $user->orderBy('created_at', 'asc');
        } elseif ($request->get('sort') === 'Newest') {
            $user   = $user->orderBy('created_at', 'desc');
        } elseif ($request->get('sort') === 'Name') {
            $user   = $user->orderBy('name');
        }

        if ($request->get('keyword')) {
            $keyword = $request->get('keyword');
            $user   = $user->where('name', 'like', "%{$keyword}%");
        }

        $user   = $user->paginate(20);

        return response([
            'status'    => 'success',
            'data'      => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name'      => 'required',
            'username'  => 'required',
            'email'     => 'email|required',
            'password'  => 'required',
            'role'      => 'required'
        ]);

        if ($validation->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validation->messages()->all()
            ]);
        }

        $data               = new User();
        $data->name         = $request->get('name');
        $data->username     = $request->get('username');
        $data->email        = $request->get('email');
        $data->password     = bcrypt($request->get('password'));
        $data->role         = $request->get('role');
        $data->save();

        return response([
            'status'    => 'success',
            'message'   => 'Successfully added data.'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $data       = User::find($id);

        return \response([
            'status'    => 'success',
            'data'      => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'name'      => 'required',
            'username'  => 'required',
            'email'     => 'email|required',
            'password'  => 'required',
            'role'      => 'required'
        ]);

        if ($validation->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validation->errors()
            ]);
        }

        $data               = User::find($id);
        $data->name         = $request->get('name');
        $data->username     = $request->get('username');
        $data->email        = $request->get('email');
        $data->password     = bcrypt($request->get('password'));
        $data->role         = $request->get('role');
        $data->save();

        return response([
            'status'    => 'success',
            'message'   => 'Successfully updated data.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $data       = User::find($id);
        $data->delete();

        return \response([
            'status'    => 'success',
            'message'   => 'Successfully deleted data.'
        ]);
    }
}
