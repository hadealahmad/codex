<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageService
{
    protected $manager;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
    }

    /**
     * Store and optimize an image.
     *
     * @param UploadedFile $file
     * @param string $path
     * @param int|null $quality
     * @return string
     */
    public function store(UploadedFile $file, string $path, int $quality = 80): string
    {
        $filename = uniqid() . '.webp';
        $fullPath = $path . '/' . $filename;

        $image = $this->manager->read($file);

        // Cap dimensions to avoid decoding huge images at full resolution
        $image->scaleDown(width: 2000, height: 2000);

        // Strip metadata and encode to WebP
        $encoded = $image->toWebp($quality);

        Storage::disk('public')->put($fullPath, (string) $encoded);

        return $fullPath;
    }
}
