import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, router } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';

export default function UserHoverCard({ user, children }) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4" align="start">
                <div className="flex justify-between items-start mb-3">
                    <Link href={`/@${user.username}`}>
                        <Avatar className="w-14 h-14 border-2 border-background shadow-sm">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <Button
                        variant={user.is_following ? "secondary" : "default"}
                        size="sm"
                        className={`font-bold rounded-full px-5 h-9 ${!user.is_following ? 'bg-primary hover:bg-primary/90' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            router.post(`/users/${user.id}/follow`, {}, {
                                preserveScroll: true,
                                preserveState: true,
                            });
                        }}
                    >
                        {user.is_following ? "متابع" : "متابعة"}
                    </Button>
                </div>

                <div className="space-y-1 mb-3">
                    <Link href={`/@${user.username}`} className="font-bold text-lg hover:underline flex items-center gap-1" dir="ltr">
                        {user.name}
                        {user.is_verified && (
                            <span className="text-blue-500 text-[10px] bg-blue-50 px-1 rounded-sm" title="Verified">موثق</span>
                        )}
                    </Link>
                    <Link href={`/@${user.username}`} className="text-muted-foreground text-sm block" dir="ltr">
                        @{user.username}
                        {user.follows_you && (
                            <span className="ml-2 bg-muted text-muted-foreground text-[10px] px-1 rounded">يتابعك</span>
                        )}
                    </Link>
                </div>

                {user.bio && (
                    <p className="text-sm mb-3 text-pretty" dir="auto">
                        {user.bio}
                    </p>
                )}

                <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1 hover:underline cursor-pointer">
                        <span className="font-bold text-foreground">{user.following_count || 0}</span>
                        <span className="text-muted-foreground">متابِعًا</span>
                    </div>
                    <div className="flex items-center gap-1 hover:underline cursor-pointer">
                        <span className="font-bold text-foreground">{user.followers_count || 0}</span>
                        <span className="text-muted-foreground">متابِع</span>
                    </div>
                </div>

                {/* Only show joined date if we have it, mostly generic metadata */}
                {user.created_at && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-4">
                        <CalendarDays className="mr-1 h-3 w-3 opacity-70" />
                        <span>انضم في {new Date(user.created_at).toLocaleDateString('ar-SY', { month: 'long', year: 'numeric' })}</span>
                    </div>
                )}

            </HoverCardContent>
        </HoverCard>
    );
}
