@if (isset($page['props']['post']))
    @php
        $canonicalUrl = $page['props']['post']['canonical_url'] ?? redirect()->route('posts.show',[$page['props']['post']['user']['username'], $page['props']['post']['slug']])->getTargetUrl();
    @endphp
    <!-- Native Tags -->
    <meta name="description" content="{{ $page['props']['post']['excerpt'] }}">
    <link rel="canonical" href="{{ $canonicalUrl }}">

    <!-- OG Tags -->
    <meta name="og:title" content="{{ $page['props']['post']['title'] }}">
    <meta name="og:description" content="{{ $page['props']['post']['excerpt'] }}">
    <meta name="og:type" content="article">
    <meta name="og:url" content="{{ $canonicalUrl }}">
    <meta name="og:image" content="{{ $page['props']['post']['cover_image_path'] }}">

    <!-- Twitter Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $page['props']['post']['title'] }}">
    <meta name="twitter:description" content="{{ $page['props']['post']['excerpt'] }}">
    <meta name="twitter:image" content="{{ $page['props']['post']['cover_image_path'] }}">
    <meta name="twitter:site" content="@codex">
@else
    <title inertia>{{ config('app.name') }}</title>
    <meta name="description" content="{{ config('app.name') }}">
    <meta name="canonical" content="{{ config('app.url') }}">
    <meta name="og:title" content="{{ config('app.name') }}">
    <meta name="og:description" content="{{ config('app.name') }}">
    <meta name="og:type" content="website">
    <meta name="og:url" content="{{ config('app.url') }}">
    <meta name="og:image" content="{{ config('app.url') }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ config('app.name') }}">
    <meta name="twitter:description" content="{{ config('app.name') }}">
    <meta name="twitter:image" content="{{ config('app.url') }}">
    <meta name="twitter:site" content="@codex">
@endif