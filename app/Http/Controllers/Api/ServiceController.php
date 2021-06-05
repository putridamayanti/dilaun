<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param Service $service
     * @return Response
     */
    public function index(Request $request, Service $service)
    {
        if ($request->get('sort') === 'Oldest') {
            $service   = $service->orderBy('created_at', 'asc');
        } elseif ($request->get('sort') === 'Newest') {
            $service   = $service->orderBy('created_at', 'desc');
        } elseif ($request->get('sort') === 'Name') {
            $service   = $service->orderBy('name');
        }

        $service   = $service->paginate(20);

        foreach ($service as $item) {
            $item->image = 'http://localhost:8000/storage/'.$item->image;
        }

        return response([
            'status'    => 'success',
            'data'      => $service
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
            'name'      => 'required'
        ]);

        if ($validation->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validation->messages()->all()
            ]);
        }

        $data               = new Service();
        $data->name         = $request->get('name');

        if ($request->get('image')) {
            $image_parts = explode(";base64,", $request->get('image'));
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $image_name = uniqid();
            $file = $image_name . '.'.$image_type;

            Storage::disk('public')->put($file, $image_base64);

            $data->image = $image_name . '.'.$image_type;
        }

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
        $data       = Service::find($id);

        $data->image = 'http://localhost:8000/storage/'.$data->image;

        return response([
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
            'name'      => 'required'
        ]);

        if ($validation->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validation->messages()->all()
            ]);
        }

        $data               = Service::find($id);
        $data->name         = $request->get('name');

        if ($request->get('image')) {
            $fileExists = Storage::disk('public')->exists($data->image);
            if ($fileExists) {
                Storage::disk('public')->delete($data->image);
            }

            $image_parts = explode(";base64,", $request->get('image'));
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $image_name = uniqid();
            $file = $image_name . '.'.$image_type;

            Storage::disk('public')->put($file, $image_base64);

            $data->image = $image_name . '.'.$image_type;
        }

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
        $data       = Service::find($id);

        $fileExists = Storage::disk('public')->exists($data->image);
        if ($fileExists) {
            Storage::disk('public')->delete($data->image);
        }

        $data->delete();

        return \response([
            'status'    => 'success',
            'message'   => 'Successfully deleted data.'
        ]);
    }
}
