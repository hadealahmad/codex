import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Posts\Pages\CreatePost::__invoke
* @see app/Filament/Resources/Posts/Pages/CreatePost.php:7
* @route '/admin/posts/create'
*/
const CreatePost = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePost.url(options),
    method: 'get',
})

CreatePost.definition = {
    methods: ["get","head"],
    url: '/admin/posts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Posts\Pages\CreatePost::__invoke
* @see app/Filament/Resources/Posts/Pages/CreatePost.php:7
* @route '/admin/posts/create'
*/
CreatePost.url = (options?: RouteQueryOptions) => {
    return CreatePost.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Posts\Pages\CreatePost::__invoke
* @see app/Filament/Resources/Posts/Pages/CreatePost.php:7
* @route '/admin/posts/create'
*/
CreatePost.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreatePost.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Posts\Pages\CreatePost::__invoke
* @see app/Filament/Resources/Posts/Pages/CreatePost.php:7
* @route '/admin/posts/create'
*/
CreatePost.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreatePost.url(options),
    method: 'head',
})

export default CreatePost