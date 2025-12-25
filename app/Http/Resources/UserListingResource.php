<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserListingResource extends JsonResource
{
    public function toArray($request)
    {
        return $this->objectToResource($request);
    }

    private function objectToResource($request)
    {
        $keep = ['id', 'name', 'username', 'avatar_url', 'github_avatar_url', 'bio', 'social_links', 'is_verified', 'followers_count', 'following_count'];
        $attr = array_intersect_key($this->resource->toArray($request), array_flip($keep));

        $array = array_merge($attr, [
            'is_following' => $request->user() ? $this->resource->isFollowing($request->user()->id) : false,
        ]);

        return $array;
    }
}
