import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Posts\Pages\EditPost::__invoke
* @see app/Filament/Resources/Posts/Pages/EditPost.php:7
* @route '/admin/posts/{record}/edit'
*/
const EditPost = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPost.url(args, options),
    method: 'get',
})

EditPost.definition = {
    methods: ["get","head"],
    url: '/admin/posts/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Posts\Pages\EditPost::__invoke
* @see app/Filament/Resources/Posts/Pages/EditPost.php:7
* @route '/admin/posts/{record}/edit'
*/
EditPost.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    if (Array.isArray(args)) {
        args = {
            record: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        record: args.record,
    }

    return EditPost.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Posts\Pages\EditPost::__invoke
* @see app/Filament/Resources/Posts/Pages/EditPost.php:7
* @route '/admin/posts/{record}/edit'
*/
EditPost.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditPost.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Posts\Pages\EditPost::__invoke
* @see app/Filament/Resources/Posts/Pages/EditPost.php:7
* @route '/admin/posts/{record}/edit'
*/
EditPost.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditPost.url(args, options),
    method: 'head',
})

export default EditPost