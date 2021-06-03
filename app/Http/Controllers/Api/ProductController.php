<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Product $product)
    {
        if ($request->get('sort') === 'Oldest') {
            $product   = $product->orderBy('created_at', 'asc');
        } elseif ($request->get('sort') === 'Newest') {
            $product   = $product->orderBy('created_at', 'desc');
        } elseif ($request->get('sort') === 'Name') {
            $product   = $product->orderBy('name');
        }

        $product   = $product->get();

        return response([
            'status'    => 'success',
            'data'      => $product
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name'          => 'required'
        ]);

        if ($validation->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validation->errors()
            ]);
        }

        $data               = new Product();
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

        $data->price_per_kg     = $request->get('price_per_kg');
        $data->price_per_pcs    = $request->get('price_per_pcs');
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
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data       = Product::find($id);

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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'name'          => 'required'
        ]);

        if ($validation->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validation->errors()
            ]);
        }

        $data               = Product::find($id);
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

        $data->price_per_kg     = $request->get('price_per_kg');
        $data->price_per_pcs    = $request->get('price_per_pcs');
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
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data       = Product::find($id);

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
