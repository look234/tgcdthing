<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel React application</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css">
</head>
<body>
<h2 style="text-align: center"> Laravel and React applications </h2>
<div id="root"></div>
<script src="{{asset('js/app.js')}}" ></script>
</body>
</html>
