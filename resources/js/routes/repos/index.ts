import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RepoController::store
* @see app/Http/Controllers/RepoController.php:85
* @route '/repos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/repos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepoController::store
* @see app/Http/Controllers/RepoController.php:85
* @route '/repos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepoController::store
* @see app/Http/Controllers/RepoController.php:85
* @route '/repos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RepoController::update
* @see app/Http/Controllers/RepoController.php:128
* @route '/repos/{repo}'
*/
export const update = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/repos/{repo}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RepoController::update
* @see app/Http/Controllers/RepoController.php:128
* @route '/repos/{repo}'
*/
update.url = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { repo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            repo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        repo: typeof args.repo === 'object'
        ? args.repo.id
        : args.repo,
    }

    return update.definition.url
            .replace('{repo}', parsedArgs.repo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepoController::update
* @see app/Http/Controllers/RepoController.php:128
* @route '/repos/{repo}'
*/
update.put = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RepoController::update
* @see app/Http/Controllers/RepoController.php:128
* @route '/repos/{repo}'
*/
update.patch = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RepoController::destroy
* @see app/Http/Controllers/RepoController.php:219
* @route '/repos/{repo}'
*/
export const destroy = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/repos/{repo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RepoController::destroy
* @see app/Http/Controllers/RepoController.php:219
* @route '/repos/{repo}'
*/
destroy.url = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { repo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            repo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        repo: typeof args.repo === 'object'
        ? args.repo.id
        : args.repo,
    }

    return destroy.definition.url
            .replace('{repo}', parsedArgs.repo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepoController::destroy
* @see app/Http/Controllers/RepoController.php:219
* @route '/repos/{repo}'
*/
destroy.delete = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RepoController::importMethod
* @see app/Http/Controllers/RepoController.php:72
* @route '/repos/import'
*/
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/repos/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepoController::importMethod
* @see app/Http/Controllers/RepoController.php:72
* @route '/repos/import'
*/
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepoController::importMethod
* @see app/Http/Controllers/RepoController.php:72
* @route '/repos/import'
*/
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RepoController::toggleFeature
* @see app/Http/Controllers/RepoController.php:204
* @route '/repos/{repo}/toggle-feature'
*/
export const toggleFeature = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleFeature.url(args, options),
    method: 'post',
})

toggleFeature.definition = {
    methods: ["post"],
    url: '/repos/{repo}/toggle-feature',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepoController::toggleFeature
* @see app/Http/Controllers/RepoController.php:204
* @route '/repos/{repo}/toggle-feature'
*/
toggleFeature.url = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { repo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            repo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        repo: typeof args.repo === 'object'
        ? args.repo.id
        : args.repo,
    }

    return toggleFeature.definition.url
            .replace('{repo}', parsedArgs.repo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepoController::toggleFeature
* @see app/Http/Controllers/RepoController.php:204
* @route '/repos/{repo}/toggle-feature'
*/
toggleFeature.post = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleFeature.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RepoController::refreshVerification
* @see app/Http/Controllers/RepoController.php:181
* @route '/repos/{repo}/refresh-verification'
*/
export const refreshVerification = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refreshVerification.url(args, options),
    method: 'post',
})

refreshVerification.definition = {
    methods: ["post"],
    url: '/repos/{repo}/refresh-verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepoController::refreshVerification
* @see app/Http/Controllers/RepoController.php:181
* @route '/repos/{repo}/refresh-verification'
*/
refreshVerification.url = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { repo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            repo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        repo: typeof args.repo === 'object'
        ? args.repo.id
        : args.repo,
    }

    return refreshVerification.definition.url
            .replace('{repo}', parsedArgs.repo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepoController::refreshVerification
* @see app/Http/Controllers/RepoController.php:181
* @route '/repos/{repo}/refresh-verification'
*/
refreshVerification.post = (args: { repo: number | { id: number } } | [repo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refreshVerification.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RepoController::user_repos
* @see app/Http/Controllers/RepoController.php:26
* @route '/@{username}/repos'
*/
export const user_repos = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user_repos.url(args, options),
    method: 'get',
})

user_repos.definition = {
    methods: ["get","head"],
    url: '/@{username}/repos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepoController::user_repos
* @see app/Http/Controllers/RepoController.php:26
* @route '/@{username}/repos'
*/
user_repos.url = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { username: args }
    }

    if (Array.isArray(args)) {
        args = {
            username: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        username: args.username,
    }

    return user_repos.definition.url
            .replace('{username}', parsedArgs.username.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepoController::user_repos
* @see app/Http/Controllers/RepoController.php:26
* @route '/@{username}/repos'
*/
user_repos.get = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user_repos.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RepoController::user_repos
* @see app/Http/Controllers/RepoController.php:26
* @route '/@{username}/repos'
*/
user_repos.head = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user_repos.url(args, options),
    method: 'head',
})

const repos = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    import: Object.assign(importMethod, importMethod),
    toggleFeature: Object.assign(toggleFeature, toggleFeature),
    refreshVerification: Object.assign(refreshVerification, refreshVerification),
    user_repos: Object.assign(user_repos, user_repos),
}

export default repos