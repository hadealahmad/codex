<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('github_id'),
                TextInput::make('username')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                Toggle::make('is_admin')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('avatar_url')
                    ->url(),
                TextInput::make('github_avatar_url')
                    ->url(),
                Textarea::make('bio')
                    ->columnSpanFull(),
                TextInput::make('website_url')
                    ->url(),
                TextInput::make('social_links'),
                Toggle::make('is_verified')
                    ->required(),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                DateTimePicker::make('email_verified_at'),
                TextInput::make('password')
                    ->password(),
            ]);
    }
}
