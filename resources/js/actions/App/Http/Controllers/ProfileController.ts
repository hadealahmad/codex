import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:75
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
* @see app/Http/Controllers/ProfileController.php:75
* @route '/profile/update'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::update
* @see app/Http/Controllers/ProfileController.php:75
* @route '/profile/update'
*/
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::revertAvatar
* @see app/Http/Controllers/ProfileController.php:112
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
* @see app/Http/Controllers/ProfileController.php:112
* @route '/profile/revert-avatar'
*/
revertAvatar.url = (options?: RouteQueryOptions) => {
    return revertAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::revertAvatar
* @see app/Http/Controllers/ProfileController.php:112
* @route '/profile/revert-avatar'
*/
revertAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revertAvatar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::updateSocialLinks
* @see app/Http/Controllers/ProfileController.php:124
* @route '/profile/social-links'
*/
export const updateSocialLinks = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSocialLinks.url(options),
    method: 'post',
})

updateSocialLinks.definition = {
    methods: ["post"],
    url: '/profile/social-links',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileController::updateSocialLinks
* @see app/Http/Controllers/ProfileController.php:124
* @route '/profile/social-links'
*/
updateSocialLinks.url = (options?: RouteQueryOptions) => {
    return updateSocialLinks.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::updateSocialLinks
* @see app/Http/Controllers/ProfileController.php:124
* @route '/profile/social-links'
*/
updateSocialLinks.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSocialLinks.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::downloadData
* @see app/Http/Controllers/ProfileController.php:140
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
* @see app/Http/Controllers/ProfileController.php:140
* @route '/profile/download-data'
*/
downloadData.url = (options?: RouteQueryOptions) => {
    return downloadData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::downloadData
* @see app/Http/Controllers/ProfileController.php:140
* @route '/profile/download-data'
*/
downloadData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadData.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::downloadData
* @see app/Http/Controllers/ProfileController.php:140
* @route '/profile/download-data'
*/
downloadData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::destroy
* @see app/Http/Controllers/ProfileController.php:180
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
* @see app/Http/Controllers/ProfileController.php:180
* @route '/profile'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::destroy
* @see app/Http/Controllers/ProfileController.php:180
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

/**
* @see \App\Http\Controllers\ProfileController::explore
* @see app/Http/Controllers/ProfileController.php:158
* @route '/u/explore'
*/
export const explore = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: explore.url(options),
    method: 'get',
})

explore.definition = {
    methods: ["get","head"],
    url: '/u/explore',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::explore
* @see app/Http/Controllers/ProfileController.php:158
* @route '/u/explore'
*/
explore.url = (options?: RouteQueryOptions) => {
    return explore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::explore
* @see app/Http/Controllers/ProfileController.php:158
* @route '/u/explore'
*/
explore.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: explore.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::explore
* @see app/Http/Controllers/ProfileController.php:158
* @route '/u/explore'
*/
explore.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: explore.url(options),
    method: 'head',
})

const ProfileController = { update, revertAvatar, updateSocialLinks, downloadData, destroy, show, explore }

export default ProfileController