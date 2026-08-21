import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import verifications from './verifications'
import users from './users'
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
* @see \App\Http\Controllers\AdminController::repos
* @see app/Http/Controllers/AdminController.php:65
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
* @see app/Http/Controllers/AdminController.php:65
* @route '/admin/repos'
*/
repos.url = (options?: RouteQueryOptions) => {
    return repos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::repos
* @see app/Http/Controllers/AdminController.php:65
* @route '/admin/repos'
*/
repos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: repos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::repos
* @see app/Http/Controllers/AdminController.php:65
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
    repos: Object.assign(repos, reposD858bf),
}

export default admin