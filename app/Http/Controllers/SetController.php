<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Set;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;

class SetController extends Controller
{

    public function get(Request $request, $id) {
        return Set::where('id', $id)
            ->with('cards')
            ->with('game')
            ->with('parent_sets')
            ->with('child_sets')
            ->get();
    }

    public function searchWithFilters(Request $request) {
        $pageSize = $request->input('pageSize');
        $page = $request->input('page') + 1;

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $sortedColumnName = 'release_date';
        $sortDirection = 'desc';

        if ($request->has('sorted') && is_array($request->input('sorted'))
            && !empty($request->input('sorted'))) {
            $rawSorted = $request->input('sorted');

            foreach($rawSorted as $key => $value) {
                $sortedColumnName = $value['id'];
                $sortDirection = ($value['desc'] ? 'desc' : 'asc');
            }
        }

        $filters = [];
        $setFilters = [];
        $nameFilters = [];

        if ($request->has('filtered') && is_array($request->input('filtered'))
            && !empty($request->input('filtered'))) {
            $rawFilters = $request->input('filtered');
            foreach($rawFilters as $key => $value) {
                if ($value['id'] === 'printed_name') {
                    $nameFilters[] = ['name', 'like', '%' . $value['value'] . '%'];

                } else if ($value['id'] === 'set') {
                    $setFilters[] = ['eng_name', 'like', '%' . $value['value'] . '%'];
                }

                $filters[] = [$value['id'], 'like', '%' . $value['value'] . '%'];
            }
        }

        $cards = Set::where($filters)->orderBy($sortedColumnName, $sortDirection);

//        if (!empty($setFilters)) {
////            $cards->load(['sets' => function ($query) use ($setFilters) {
////                $query->where($setFilters);
////            }]);
//            //$cards->doesntHave('sets');
//            //$cards->with('sets')->having('sets.eng_name', 'like', '%Week%');
//            $cards->with('sets')->whereHas('sets', function ($query) use ($setFilters) {
//                $query->where($setFilters);
//            });
//        } else {
//            $cards->with('sets');
//        }

//        if (!empty($nameFilters)) {
//            $cards->with('names')->orWhereHas('names', function ($query) use ($nameFilters) {
//                $query->where($nameFilters);
//            });
//        } else {
//            $cards->with('names');
//        }


        return $cards->withCount('child_sets')
            ->withCount('parent_sets')
            ->withCount('cards')
            ->with('game')
            ->paginate($pageSize);
    }
}
