import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Posts\Pages\ListPosts::__invoke
* @see app/Filament/Resources/Posts/Pages/ListPosts.php:7
* @route '/admin/posts'
*/
const ListPosts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPosts.url(options),
    method: 'get',
})

ListPosts.definition = {
    methods: ["get","head"],
    url: '/admin/posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Posts\Pages\ListPosts::__invoke
* @see app/Filament/Resources/Posts/Pages/ListPosts.php:7
* @route '/admin/posts'
*/
ListPosts.url = (options?: RouteQueryOptions) => {
    return ListPosts.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Posts\Pages\ListPosts::__invoke
* @see app/Filament/Resources/Posts/Pages/ListPosts.php:7
* @route '/admin/posts'
*/
ListPosts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListPosts.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Posts\Pages\ListPosts::__invoke
* @see app/Filament/Resources/Posts/Pages/ListPosts.php:7
* @route '/admin/posts'
*/
ListPosts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListPosts.url(options),
    method: 'head',
})

export default ListPosts