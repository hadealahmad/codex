import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::verify
* @see app/Http/Controllers/AdminController.php:116
* @route '/admin/users/{id}/verify'
*/
export const verify = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/admin/users/{id}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::verify
* @see app/Http/Controllers/AdminController.php:116
* @route '/admin/users/{id}/verify'
*/
verify.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return verify.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::verify
* @see app/Http/Controllers/AdminController.php:116
* @route '/admin/users/{id}/verify'
*/
verify.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::unverify
* @see app/Http/Controllers/AdminController.php:124
* @route '/admin/users/{id}/unverify'
*/
export const unverify = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unverify.url(args, options),
    method: 'post',
})

unverify.definition = {
    methods: ["post"],
    url: '/admin/users/{id}/unverify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::unverify
* @see app/Http/Controllers/AdminController.php:124
* @route '/admin/users/{id}/unverify'
*/
unverify.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return unverify.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::unverify
* @see app/Http/Controllers/AdminController.php:124
* @route '/admin/users/{id}/unverify'
*/
unverify.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unverify.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::ban
* @see app/Http/Controllers/AdminController.php:132
* @route '/admin/users/{id}/ban'
*/
export const ban = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ban.url(args, options),
    method: 'post',
})

ban.definition = {
    methods: ["post"],
    url: '/admin/users/{id}/ban',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::ban
* @see app/Http/Controllers/AdminController.php:132
* @route '/admin/users/{id}/ban'
*/
ban.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return ban.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::ban
* @see app/Http/Controllers/AdminController.php:132
* @route '/admin/users/{id}/ban'
*/
ban.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ban.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::unban
* @see app/Http/Controllers/AdminController.php:140
* @route '/admin/users/{id}/unban'
*/
export const unban = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unban.url(args, options),
    method: 'post',
})

unban.definition = {
    methods: ["post"],
    url: '/admin/users/{id}/unban',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::unban
* @see app/Http/Controllers/AdminController.php:140
* @route '/admin/users/{id}/unban'
*/
unban.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return unban.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::unban
* @see app/Http/Controllers/AdminController.php:140
* @route '/admin/users/{id}/unban'
*/
unban.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unban.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::deleteMethod
* @see app/Http/Controllers/AdminController.php:148
* @route '/admin/users/{id}'
*/
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/admin/users/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminController::deleteMethod
* @see app/Http/Controllers/AdminController.php:148
* @route '/admin/users/{id}'
*/
deleteMethod.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return deleteMethod.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::deleteMethod
* @see app/Http/Controllers/AdminController.php:148
* @route '/admin/users/{id}'
*/
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\AdminController::bulkAction
* @see app/Http/Controllers/AdminController.php:156
* @route '/admin/users/bulk-action'
*/
export const bulkAction = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAction.url(options),
    method: 'post',
})

bulkAction.definition = {
    methods: ["post"],
    url: '/admin/users/bulk-action',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::bulkAction
* @see app/Http/Controllers/AdminController.php:156
* @route '/admin/users/bulk-action'
*/
bulkAction.url = (options?: RouteQueryOptions) => {
    return bulkAction.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::bulkAction
* @see app/Http/Controllers/AdminController.php:156
* @route '/admin/users/bulk-action'
*/
bulkAction.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAction.url(options),
    method: 'post',
})

const users = {
    verify: Object.assign(verify, verify),
    unverify: Object.assign(unverify, unverify),
    ban: Object.assign(ban, ban),
    unban: Object.assign(unban, unban),
    delete: Object.assign(deleteMethod, deleteMethod),
    bulkAction: Object.assign(bulkAction, bulkAction),
}

export default users