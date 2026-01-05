import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Comments\Pages\CreateComment::__invoke
* @see app/Filament/Resources/Comments/Pages/CreateComment.php:7
* @route '/admin/comments/create'
*/
const CreateComment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateComment.url(options),
    method: 'get',
})

CreateComment.definition = {
    methods: ["get","head"],
    url: '/admin/comments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Comments\Pages\CreateComment::__invoke
* @see app/Filament/Resources/Comments/Pages/CreateComment.php:7
* @route '/admin/comments/create'
*/
CreateComment.url = (options?: RouteQueryOptions) => {
    return CreateComment.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Comments\Pages\CreateComment::__invoke
* @see app/Filament/Resources/Comments/Pages/CreateComment.php:7
* @route '/admin/comments/create'
*/
CreateComment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateComment.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Comments\Pages\CreateComment::__invoke
* @see app/Filament/Resources/Comments/Pages/CreateComment.php:7
* @route '/admin/comments/create'
*/
CreateComment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateComment.url(options),
    method: 'head',
})

export default CreateComment