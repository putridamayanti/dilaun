<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductService;
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

        $product   = $product->with(['services', 'services.service'])
                        ->paginate(20);

        foreach ($product as $item) {
            if ($item->image != null) $item->image = 'http://localhost:8000/storage/'.$item->image;
        }

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
            'name'          => 'required',
            'services'      => 'required'
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

        $data->save();

        foreach($request->get('services') as $item) {
            $productService                 = new ProductService();
            $productService->service_id     = $item['service_id'];
            $productService->product_id     = $data->id;
            $productService->price_per_kg   = $item['price_per_kg'];
            $productService->price_per_pcs  = $item['price_per_pcs'];
            $productService->save();
        }

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
        $data       = Product::where('id', $id)->with(['services'])->first();

        if ($data->image) $data->image = 'http://localhost:8000/storage/'.$data->image;

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

        $data->save();

        foreach($request->get('services') as $item) {
            if (array_key_exists('deleted', $item)) {
                $productService             = ProductService::find($item['id']);
                $productService->delete();
            } else {
                $productService             = new ProductService();

                if (array_key_exists('id', $item)) {
                    $productService         = ProductService::find($item['id']);
                }

                $productService->service_id = $item['service_id'];
                $productService->product_id = $data->id;
                $productService->price_per_kg   = $item['price_per_kg'];
                $productService->price_per_pcs  = $item['price_per_pcs'];
                $productService->save();
            }
        }

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

        ProductService::where('product_id', $data->id)->delete();

        $data->delete();

        return \response([
            'status'    => 'success',
            'message'   => 'Successfully deleted data.'
        ]);
    }
}
