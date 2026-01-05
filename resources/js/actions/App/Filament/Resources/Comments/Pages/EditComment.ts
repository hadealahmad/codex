import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Comments\Pages\EditComment::__invoke
* @see app/Filament/Resources/Comments/Pages/EditComment.php:7
* @route '/admin/comments/{record}/edit'
*/
const EditComment = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditComment.url(args, options),
    method: 'get',
})

EditComment.definition = {
    methods: ["get","head"],
    url: '/admin/comments/{record}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Comments\Pages\EditComment::__invoke
* @see app/Filament/Resources/Comments/Pages/EditComment.php:7
* @route '/admin/comments/{record}/edit'
*/
EditComment.url = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return EditComment.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Filament\Resources\Comments\Pages\EditComment::__invoke
* @see app/Filament/Resources/Comments/Pages/EditComment.php:7
* @route '/admin/comments/{record}/edit'
*/
EditComment.get = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: EditComment.url(args, options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Comments\Pages\EditComment::__invoke
* @see app/Filament/Resources/Comments/Pages/EditComment.php:7
* @route '/admin/comments/{record}/edit'
*/
EditComment.head = (args: { record: string | number } | [record: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: EditComment.url(args, options),
    method: 'head',
})

export default EditComment