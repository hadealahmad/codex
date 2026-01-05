<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'body_markdown' => 'required|string|min:10',
            'cover_image' => 'nullable|image|max:512',
            'excerpt' => 'nullable|string|max:160',
            'title' => 'required|string|max:255',
            'canonical_url' => 'nullable|url|max:255',
        ];
    }
}
