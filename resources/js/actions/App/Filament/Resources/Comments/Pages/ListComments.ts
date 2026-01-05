import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Comments\Pages\ListComments::__invoke
* @see app/Filament/Resources/Comments/Pages/ListComments.php:7
* @route '/admin/comments'
*/
const ListComments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListComments.url(options),
    method: 'get',
})

ListComments.definition = {
    methods: ["get","head"],
    url: '/admin/comments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Comments\Pages\ListComments::__invoke
* @see app/Filament/Resources/Comments/Pages/ListComments.php:7
* @route '/admin/comments'
*/
ListComments.url = (options?: RouteQueryOptions) => {
    return ListComments.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Comments\Pages\ListComments::__invoke
* @see app/Filament/Resources/Comments/Pages/ListComments.php:7
* @route '/admin/comments'
*/
ListComments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListComments.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Comments\Pages\ListComments::__invoke
* @see app/Filament/Resources/Comments/Pages/ListComments.php:7
* @route '/admin/comments'
*/
ListComments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListComments.url(options),
    method: 'head',
})

export default ListComments