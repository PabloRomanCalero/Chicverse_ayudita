<script type="text/javascript" src="{!! asset('js/searchedUser/searchedUser.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/searchedUser.css')}}"> 

@extends('layouts.layout')

@section('content')
@csrf
    <section class="section-profile" id="section-profile">
        <div class="profile-info" id="profile-info">
        </div>
        <div class="profile-actions">
            <button class="botonForm" id="followUserButton" data-user-id="{{ $user_id }}">Seguir</button>
            <button class="botonForm" id="unfollowUserButton" data-user-id="{{ $user_id }}" style="display: none;">Dejar de seguir</button>
        </div>
        <div class="media-container" id="media-container"></div>
    </section>
@endsection
