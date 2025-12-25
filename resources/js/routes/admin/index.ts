import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import verifications from './verifications'
import users from './users'
import postsD8dc7a from './posts'
import reposD858bf from './repos'
/**
* @see \App\Http\Controllers\AdminController::dashboard
* @see app/Http/Controllers/AdminController.php:14
* @route '/admin/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::dashboard
* @see app/Http/Controllers/AdminController.php:14
* @route '/admin/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::dashboard
* @see app/Http/Controllers/AdminController.php:14
* @route '/admin/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::dashboard
* @see app/Http/Controllers/AdminController.php:14
* @route '/admin/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::posts
* @see app/Http/Controllers/AdminController.php:65
* @route '/admin/posts'
*/
export const posts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: posts.url(options),
    method: 'get',
})

posts.definition = {
    methods: ["get","head"],
    url: '/admin/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::posts
* @see app/Http/Controllers/AdminController.php:65
* @route '/admin/posts'
*/
posts.url = (options?: RouteQueryOptions) => {
    return posts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::posts
* @see app/Http/Controllers/AdminController.php:65
* @route '/admin/posts'
*/
posts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: posts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::posts
* @see app/Http/Controllers/AdminController.php:65
* @route '/admin/posts'
*/
posts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: posts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::repos
* @see app/Http/Controllers/AdminController.php:98
* @route '/admin/repos'
*/
export const repos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: repos.url(options),
    method: 'get',
})

repos.definition = {
    methods: ["get","head"],
    url: '/admin/repos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::repos
* @see app/Http/Controllers/AdminController.php:98
* @route '/admin/repos'
*/
repos.url = (options?: RouteQueryOptions) => {
    return repos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::repos
* @see app/Http/Controllers/AdminController.php:98
* @route '/admin/repos'
*/
repos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: repos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::repos
* @see app/Http/Controllers/AdminController.php:98
* @route '/admin/repos'
*/
repos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: repos.url(options),
    method: 'head',
})

const admin = {
    dashboard: Object.assign(dashboard, dashboard),
    verifications: Object.assign(verifications, verifications),
    users: Object.assign(users, users),
    posts: Object.assign(posts, postsD8dc7a),
    repos: Object.assign(repos, reposD858bf),
}

export default admin