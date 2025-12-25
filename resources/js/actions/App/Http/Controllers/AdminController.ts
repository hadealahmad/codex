import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:14
* @route '/admin/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:14
* @route '/admin/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:14
* @route '/admin/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminController::index
* @see app/Http/Controllers/AdminController.php:14
* @route '/admin/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::approveVerification
* @see app/Http/Controllers/AdminController.php:132
* @route '/admin/verifications/{id}/approve'
*/
export const approveVerification = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveVerification.url(args, options),
    method: 'post',
})

approveVerification.definition = {
    methods: ["post"],
    url: '/admin/verifications/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::approveVerification
* @see app/Http/Controllers/AdminController.php:132
* @route '/admin/verifications/{id}/approve'
*/
approveVerification.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return approveVerification.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::approveVerification
* @see app/Http/Controllers/AdminController.php:132
* @route '/admin/verifications/{id}/approve'
*/
approveVerification.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveVerification.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::rejectVerification
* @see app/Http/Controllers/AdminController.php:141
* @route '/admin/verifications/{id}/reject'
*/
export const rejectVerification = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectVerification.url(args, options),
    method: 'post',
})

rejectVerification.definition = {
    methods: ["post"],
    url: '/admin/verifications/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::rejectVerification
* @see app/Http/Controllers/AdminController.php:141
* @route '/admin/verifications/{id}/reject'
*/
rejectVerification.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return rejectVerification.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::rejectVerification
* @see app/Http/Controllers/AdminController.php:141
* @route '/admin/verifications/{id}/reject'
*/
rejectVerification.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectVerification.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::verifyUser
* @see app/Http/Controllers/AdminController.php:149
* @route '/admin/users/{id}/verify'
*/
export const verifyUser = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyUser.url(args, options),
    method: 'post',
})

verifyUser.definition = {
    methods: ["post"],
    url: '/admin/users/{id}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::verifyUser
* @see app/Http/Controllers/AdminController.php:149
* @route '/admin/users/{id}/verify'
*/
verifyUser.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return verifyUser.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::verifyUser
* @see app/Http/Controllers/AdminController.php:149
* @route '/admin/users/{id}/verify'
*/
verifyUser.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::unverifyUser
* @see app/Http/Controllers/AdminController.php:157
* @route '/admin/users/{id}/unverify'
*/
export const unverifyUser = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unverifyUser.url(args, options),
    method: 'post',
})

unverifyUser.definition = {
    methods: ["post"],
    url: '/admin/users/{id}/unverify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::unverifyUser
* @see app/Http/Controllers/AdminController.php:157
* @route '/admin/users/{id}/unverify'
*/
unverifyUser.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return unverifyUser.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::unverifyUser
* @see app/Http/Controllers/AdminController.php:157
* @route '/admin/users/{id}/unverify'
*/
unverifyUser.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unverifyUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::banUser
* @see app/Http/Controllers/AdminController.php:165
* @route '/admin/users/{id}/ban'
*/
export const banUser = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: banUser.url(args, options),
    method: 'post',
})

banUser.definition = {
    methods: ["post"],
    url: '/admin/users/{id}/ban',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::banUser
* @see app/Http/Controllers/AdminController.php:165
* @route '/admin/users/{id}/ban'
*/
banUser.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return banUser.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::banUser
* @see app/Http/Controllers/AdminController.php:165
* @route '/admin/users/{id}/ban'
*/
banUser.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: banUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::unbanUser
* @see app/Http/Controllers/AdminController.php:173
* @route '/admin/users/{id}/unban'
*/
export const unbanUser = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unbanUser.url(args, options),
    method: 'post',
})

unbanUser.definition = {
    methods: ["post"],
    url: '/admin/users/{id}/unban',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::unbanUser
* @see app/Http/Controllers/AdminController.php:173
* @route '/admin/users/{id}/unban'
*/
unbanUser.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return unbanUser.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::unbanUser
* @see app/Http/Controllers/AdminController.php:173
* @route '/admin/users/{id}/unban'
*/
unbanUser.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unbanUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminController::deleteUser
* @see app/Http/Controllers/AdminController.php:181
* @route '/admin/users/{id}'
*/
export const deleteUser = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteUser.url(args, options),
    method: 'delete',
})

deleteUser.definition = {
    methods: ["delete"],
    url: '/admin/users/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminController::deleteUser
* @see app/Http/Controllers/AdminController.php:181
* @route '/admin/users/{id}'
*/
deleteUser.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteUser.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::deleteUser
* @see app/Http/Controllers/AdminController.php:181
* @route '/admin/users/{id}'
*/
deleteUser.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteUser.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\AdminController::bulkAction
* @see app/Http/Controllers/AdminController.php:189
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
* @see app/Http/Controllers/AdminController.php:189
* @route '/admin/users/bulk-action'
*/
bulkAction.url = (options?: RouteQueryOptions) => {
    return bulkAction.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::bulkAction
* @see app/Http/Controllers/AdminController.php:189
* @route '/admin/users/bulk-action'
*/
bulkAction.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAction.url(options),
    method: 'post',
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
* @see \App\Http\Controllers\AdminController::deletePost
* @see app/Http/Controllers/AdminController.php:224
* @route '/admin/posts/{id}'
*/
export const deletePost = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePost.url(args, options),
    method: 'delete',
})

deletePost.definition = {
    methods: ["delete"],
    url: '/admin/posts/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminController::deletePost
* @see app/Http/Controllers/AdminController.php:224
* @route '/admin/posts/{id}'
*/
deletePost.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deletePost.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::deletePost
* @see app/Http/Controllers/AdminController.php:224
* @route '/admin/posts/{id}'
*/
deletePost.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePost.url(args, options),
    method: 'delete',
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

/**
* @see \App\Http\Controllers\AdminController::deleteRepo
* @see app/Http/Controllers/AdminController.php:232
* @route '/admin/repos/{id}'
*/
export const deleteRepo = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteRepo.url(args, options),
    method: 'delete',
})

deleteRepo.definition = {
    methods: ["delete"],
    url: '/admin/repos/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminController::deleteRepo
* @see app/Http/Controllers/AdminController.php:232
* @route '/admin/repos/{id}'
*/
deleteRepo.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteRepo.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::deleteRepo
* @see app/Http/Controllers/AdminController.php:232
* @route '/admin/repos/{id}'
*/
deleteRepo.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteRepo.url(args, options),
    method: 'delete',
})

const AdminController = { index, approveVerification, rejectVerification, verifyUser, unverifyUser, banUser, unbanUser, deleteUser, bulkAction, posts, deletePost, repos, deleteRepo }

export default AdminController