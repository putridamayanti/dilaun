<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Order $order)
    {
        if ($request->get('keyword')) {
            $keyword    = $request->get('keyword');
            $order      = $order->where('name', 'like', "%{$keyword}%");
        }

        if ($request->get('sort') === 'Oldest') {
            $order   = $order->orderBy('created_at', 'asc');
        } elseif ($request->get('sort') === 'Newest') {
            $order   = $order->orderBy('created_at', 'desc');
        } elseif ($request->get('sort') === 'Name') {
            $order   = $order->orderBy('name');
        }

        if ($request->get('start_date') && $request->get('end_date')) {
            $start      = $request->get('start_date');
            $end        = $request->get('end_date');
            $order      = $order->whereBetween('created_at', [$start, $end]);
        }

        $order   = $order->get();

        return response([
            'status'    => 'success',
            'data'      => $order
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
            'user_id'       => 'required',
            'qty'           => 'required',
            'total'         => 'required',
            'items'         => 'required'
        ]);

        if ($validation->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validation->errors()
            ]);
        }

        $data               = new Order();
        $data->user_id      = $request->get('user_id');
        $data->qty          = $request->get('qty');
        $data->total        = $request->get('total');
        $data->save();

        foreach ($request->get('items') as $item) {
            $orderItem              = new OrderItem();
            $orderItem->order_id    = $data->id;
            $orderItem->product_id  = $item['product_id'];
            $orderItem->price       = $item['price'];
            $orderItem->unit        = $item['unit'];
            $orderItem->qty         = $item['qty'];
            $orderItem->total       = $item['total'];
            $orderItem->save();

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
        $data       = Order::where('id', $id)
                        ->with(['items', 'items.product'])
                        ->first();

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
            'user_id'       => 'required',
            'qty'           => 'required',
            'total'         => 'required',
            'items'         => 'required'
        ]);

        if ($validation->fails()) {
            return response([
                'status'    => 'failed',
                'errors'    => $validation->errors()
            ]);
        }

        $data               = Order::find($id);
        $data->user_id      = $request->get('user_id');
        $data->qty          = $request->get('qty');
        $data->total        = $request->get('total');
        $data->save();

        foreach ($request->get('items') as $item) {
            $orderItem              = new OrderItem();

            if ($item['id']) {
                $orderItem          = OrderItem::find($item['id']);
            }

            $orderItem->order_id    = $data->id;
            $orderItem->product_id  = $item['product_id'];
            $orderItem->price       = $item['price'];
            $orderItem->unit        = $item['unit'];
            $orderItem->qty         = $item['qty'];
            $orderItem->total       = $item['total'];
            $orderItem->save();

        }

        return response([
            'status'    => 'success',
            'message'   => 'Successfully added data.'
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
        //
    }
}
