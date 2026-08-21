import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FeedController::index
* @see app/Http/Controllers/FeedController.php:16
* @route '/'
*/
const index980bb49ee7ae63891f1d891d2fbcf1c9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

index980bb49ee7ae63891f1d891d2fbcf1c9.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FeedController::index
* @see app/Http/Controllers/FeedController.php:16
* @route '/'
*/
index980bb49ee7ae63891f1d891d2fbcf1c9.url = (options?: RouteQueryOptions) => {
    return index980bb49ee7ae63891f1d891d2fbcf1c9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeedController::index
* @see app/Http/Controllers/FeedController.php:16
* @route '/'
*/
index980bb49ee7ae63891f1d891d2fbcf1c9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FeedController::index
* @see app/Http/Controllers/FeedController.php:16
* @route '/'
*/
index980bb49ee7ae63891f1d891d2fbcf1c9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FeedController::index
* @see app/Http/Controllers/FeedController.php:16
* @route '/feed'
*/
const index8b72587d67a3b9f33de91798fece91d9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8b72587d67a3b9f33de91798fece91d9.url(options),
    method: 'get',
})

index8b72587d67a3b9f33de91798fece91d9.definition = {
    methods: ["get","head"],
    url: '/feed',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FeedController::index
* @see app/Http/Controllers/FeedController.php:16
* @route '/feed'
*/
index8b72587d67a3b9f33de91798fece91d9.url = (options?: RouteQueryOptions) => {
    return index8b72587d67a3b9f33de91798fece91d9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeedController::index
* @see app/Http/Controllers/FeedController.php:16
* @route '/feed'
*/
index8b72587d67a3b9f33de91798fece91d9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8b72587d67a3b9f33de91798fece91d9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FeedController::index
* @see app/Http/Controllers/FeedController.php:16
* @route '/feed'
*/
index8b72587d67a3b9f33de91798fece91d9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index8b72587d67a3b9f33de91798fece91d9.url(options),
    method: 'head',
})

/**
* Multiple routes resolve to \App\Http\Controllers\FeedController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/': index980bb49ee7ae63891f1d891d2fbcf1c9,
    '/feed': index8b72587d67a3b9f33de91798fece91d9,
}

const FeedController = { index }

export default FeedController