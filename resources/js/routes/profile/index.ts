import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:74
* @route '/profile/update'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/profile/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:74
* @route '/profile/update'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:74
* @route '/profile/update'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::revertAvatar
* @see app/Http/Controllers/ProfileController.php:111
* @route '/profile/revert-avatar'
*/
export const revertAvatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revertAvatar.url(options),
    method: 'post',
})

revertAvatar.definition = {
    methods: ["post"],
    url: '/profile/revert-avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileController::revertAvatar
* @see app/Http/Controllers/ProfileController.php:111
* @route '/profile/revert-avatar'
*/
revertAvatar.url = (options?: RouteQueryOptions) => {
    return revertAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::revertAvatar
* @see app/Http/Controllers/ProfileController.php:111
* @route '/profile/revert-avatar'
*/
revertAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revertAvatar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::socialLinks
* @see app/Http/Controllers/ProfileController.php:123
* @route '/profile/social-links'
*/
export const socialLinks = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: socialLinks.url(options),
    method: 'post',
})

socialLinks.definition = {
    methods: ["post"],
    url: '/profile/social-links',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileController::socialLinks
* @see app/Http/Controllers/ProfileController.php:123
* @route '/profile/social-links'
*/
socialLinks.url = (options?: RouteQueryOptions) => {
    return socialLinks.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::socialLinks
* @see app/Http/Controllers/ProfileController.php:123
* @route '/profile/social-links'
*/
socialLinks.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: socialLinks.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::downloadData
* @see app/Http/Controllers/ProfileController.php:139
* @route '/profile/download-data'
*/
export const downloadData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadData.url(options),
    method: 'get',
})

downloadData.definition = {
    methods: ["get","head"],
    url: '/profile/download-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::downloadData
* @see app/Http/Controllers/ProfileController.php:139
* @route '/profile/download-data'
*/
downloadData.url = (options?: RouteQueryOptions) => {
    return downloadData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::downloadData
* @see app/Http/Controllers/ProfileController.php:139
* @route '/profile/download-data'
*/
downloadData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::downloadData
* @see app/Http/Controllers/ProfileController.php:139
* @route '/profile/download-data'
*/
downloadData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::destroy
* @see app/Http/Controllers/ProfileController.php:179
* @route '/profile'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProfileController::destroy
* @see app/Http/Controllers/ProfileController.php:179
* @route '/profile'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::destroy
* @see app/Http/Controllers/ProfileController.php:179
* @route '/profile'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:24
* @route '/@{username}'
*/
export const show = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/@{username}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:24
* @route '/@{username}'
*/
show.url = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{username}', parsedArgs.username.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:24
* @route '/@{username}'
*/
show.get = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:24
* @route '/@{username}'
*/
show.head = (args: { username: string | number } | [username: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const profile = {
    update: Object.assign(update, update),
    revertAvatar: Object.assign(revertAvatar, revertAvatar),
    socialLinks: Object.assign(socialLinks, socialLinks),
    downloadData: Object.assign(downloadData, downloadData),
    destroy: Object.assign(destroy, destroy),
    show: Object.assign(show, show),
}

export default profile