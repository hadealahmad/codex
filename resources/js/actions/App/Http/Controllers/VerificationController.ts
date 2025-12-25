import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VerificationController::show
* @see app/Http/Controllers/VerificationController.php:14
* @route '/verification'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/verification',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VerificationController::show
* @see app/Http/Controllers/VerificationController.php:14
* @route '/verification'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationController::show
* @see app/Http/Controllers/VerificationController.php:14
* @route '/verification'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VerificationController::show
* @see app/Http/Controllers/VerificationController.php:14
* @route '/verification'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VerificationController::store
* @see app/Http/Controllers/VerificationController.php:30
* @route '/verification'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VerificationController::store
* @see app/Http/Controllers/VerificationController.php:30
* @route '/verification'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationController::store
* @see app/Http/Controllers/VerificationController.php:30
* @route '/verification'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const VerificationController = { show, store }

export default VerificationController