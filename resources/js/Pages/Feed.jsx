import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2, Users, Star, TrendingUp, Github, Sparkles, UserPlus } from 'lucide-react';
import Markdown from 'react-markdown';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from 'sonner';
import TopProjects from '@/components/TopProjects.jsx';
import UserHoverCard from '@/components/UserHoverCard.jsx';

export default function Feed({ posts, tab, recommendedUsers, topRepos }) {
    const { auth } = usePage().props;

    const stripMarkdown = (text) => {
        if (!text) return '';
        return text
            .replace(/#{1,6}\s?/g, '') // Headings
            .replace(/\*\*/g, '') // Bold
            .replace(/\*/g, '') // Italic
            .replace(/__?|~~|`|\[.*?\]\(.*?\)/g, '') // Other syntax
            .replace(/!\[.*?\]\(.*?\)/g, ''); // Images
    };

    const handleLike = (postId) => {
        router.post(`/posts/${postId}/like`, {}, {
            preserveScroll: true,
        });
    };

    const handleShare = (post) => {
        const url = `${window.location.origin}/u/${post.user.username}/${post.slug}`;
        if (navigator.share) {
            navigator.share({
                title: post.slug,
                url: url,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url);
            toast.success('تم نسخ الرابط إلى الحافظة.');
        }
    };

    return (
        <Layout>
            <Head title="آخر الأخبار" />

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Feed (66%) */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold tracking-tight">آخر الأخبار</h1>
                            {auth.user && (
                                <Button asChild size="sm" className="rounded-full shadow-sm">
                                    <Link href="/posts/create" className="gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        اكتب منشوراً
                                    </Link>
                                </Button>
                            )}
                        </div>

                        {auth.user && (
                            <Tabs defaultValue={tab} className="w-full" dir="rtl">
                                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                                    <TabsTrigger
                                        value="global"
                                        className="cursor-pointer"
                                        onClick={() => router.get('/', { tab: 'global' }, { preserveScroll: true, preserveState: true })}
                                    >
                                        التغذية العالمية
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="following"
                                        className="cursor-pointer"
                                        onClick={() => router.get('/', { tab: 'following' }, { preserveScroll: true, preserveState: true })}
                                    >
                                        أشخاص تتابعهم
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        )}
                    </div>

                    <div className="space-y-6">
                        {posts.data.length === 0 ? (
                            <Card className="border-dashed py-12 text-center flex flex-col gap-4">
                                <CardContent className="space-y-4 p-6">
                                    <p className="text-muted-foreground">
                                        {tab === 'following'
                                            ? "لا توجد منشورات من المطورين الذين تتابعهم بعد."
                                            : "لا توجد منشورات حتى الآن."}
                                    </p>
                                    <Button variant="outline" asChild>
                                        <Link href={tab === 'following' ? "/feed?tab=global" : "/u/explore"}>
                                            {tab === 'following' ? "استكشف التغذية العالمية" : "استكشف المطورين"}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            posts.data.map(post => (
                                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow group border-none bg-card shadow-sm flex flex-col">
                                    <CardHeader className="flex flex-row items-center justify-between pb-3 p-6">
                                        {/* Right Side: Metadata Group */}
                                        <div className="flex items-center gap-4 min-w-0">
                                            <Link href={`/@${post.user.username}`}>
                                                <Avatar className="w-10 h-10 border shadow-sm">
                                                    <AvatarImage src={post.user.avatar_url} />
                                                    <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <Link href={`/@${post.user.username}`} className="font-bold hover:underline truncate text-sm">
                                                        {post.user.name}
                                                    </Link>
                                                    {post.user.is_verified && (
                                                        <span className="text-blue-500 text-[10px] bg-blue-50 px-1 rounded" title="Verified">موثق</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                                    <span className="truncate" dir="ltr">@{post.user.username}</span>
                                                    <span>•</span>
                                                    <span className="whitespace-nowrap">
                                                        {new Date(post.published_at).toLocaleDateString('ar-SY')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Left Side: Actions */}
                                        <div className="flex-shrink-0">
                                            {auth.user?.id === post.user.id ? (
                                                <Button variant="outline" size="sm" className="h-8 rounded-full text-xs shadow-sm cursor-pointer" asChild>
                                                    <Link href={`/@${post.user.username}`}>
                                                        ملفي الشخصي
                                                    </Link>
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant={post.user.is_following ? "secondary" : "default"}
                                                    size="sm"
                                                    className={`h-8 rounded-full text-xs shadow-sm cursor-pointer gap-2 ${!post.user.is_following ? 'bg-primary hover:bg-primary/90' : ''}`}
                                                    onClick={() => router.post(`/users/${post.user.id}/follow`, {}, { preserveScroll: true })}
                                                >
                                                    {post.user.is_following ? (
                                                        "متابع"
                                                    ) : (
                                                        <>
                                                            <UserPlus className="w-3.5 h-3.5" />
                                                            متابعة
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-3 px-6">
                                        <Link href={`/u/${post.user.username}/${post.slug}`} className="block group-hover:opacity-90 transition-opacity space-y-2">
                                            <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors" dir="auto">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed" dir="auto">
                                                {stripMarkdown(post.body_markdown)}
                                            </p>
                                        </Link>

                                        {(post.cover_image_path) && (
                                            <Link href={`/u/${post.user.username}/${post.slug}`} className="block mt-4 overflow-hidden rounded-xl border group-hover:border-primary/20 transition-colors">
                                                <div className="relative aspect-video">
                                                    <img
                                                        src={post.cover_image_path}
                                                        alt={post.slug}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </Link>
                                        )}
                                    </CardContent>
                                    <CardFooter className="pt-2 px-6 pb-4 flex justify-between border-t bg-muted/5 p-6">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`gap-2 cursor-pointer h-8 px-3 rounded-full ${post.is_liked ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'hover:bg-muted'}`}
                                                onClick={() => handleLike(post.id)}
                                            >
                                                <Heart className={`w-4 h-4 ${post.is_liked ? 'fill-current' : ''}`} />
                                                <span className="text-xs font-semibold">{post.likes_count > 0 ? post.likes_count : ''} إعجاب</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="gap-2 h-8 px-3 rounded-full hover:bg-muted" asChild>
                                                <Link href={`/u/${post.user.username}/${post.slug}`}>
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span className="text-xs font-semibold">تعليق</span>
                                                </Link>
                                            </Button>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full cursor-pointer hover:bg-muted" onClick={() => handleShare(post)}>
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center gap-4">
                        {posts.prev_page_url && (
                            <Button variant="outline" size="sm" className="rounded-full" asChild>
                                <Link href={posts.prev_page_url}>السابق</Link>
                            </Button>
                        )}
                        {posts.next_page_url && (
                            <Button variant="outline" size="sm" className="rounded-full" asChild>
                                <Link href={posts.next_page_url}>التالي</Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Sidebar (33%) */}
                <div className="space-y-8">
                    {/* Recommendations */}
                    <Card className="border-none shadow-sm bg-gradient-to-br from-card to-muted/20 flex flex-col">
                        <CardHeader className="pb-4 p-5">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                مطورون مقترحون
                            </CardTitle>
                            <CardDescription>تعرف على الحسابات الموثقة</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-5 pt-0">
                            {recommendedUsers.map(user => (
                                <div key={user.id} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <UserHoverCard user={user}>
                                            <Link href={`/@${user.username}`}>
                                                <Avatar className="w-10 h-10 border-2 border-background shadow-sm">
                                                    <AvatarImage src={user.avatar_url} />
                                                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        </UserHoverCard>
                                        <div className="min-w-0 text-right">
                                            <div className="flex items-center justify-start gap-1.5">
                                                {user.is_verified && (
                                                    <span className="text-blue-500 text-[9px] bg-blue-50 px-1 rounded flex-shrink-0 order-2">موثق</span>
                                                )}
                                                <UserHoverCard user={user}>
                                                    <Link href={`/@${user.username}`} className="font-bold text-sm hover:underline block truncate leading-tight order-1">
                                                        {user.name}
                                                    </Link>
                                                </UserHoverCard>
                                            </div>
                                            <UserHoverCard user={user}>
                                                <p className="text-[10px] text-muted-foreground truncate cursor-pointer" dir="ltr">@{user.username}</p>
                                            </UserHoverCard>
                                        </div>
                                    </div>
                                    <Button
                                        variant={user.is_following ? "secondary" : "outline"}
                                        size="sm"
                                        className={`h-7 text-[10px] px-3 rounded-full cursor-pointer transition-colors ${!user.is_following ? 'hover:bg-primary hover:text-white' : ''}`}
                                        onClick={() => router.post(`/users/${user.id}/follow`, {}, {
                                            preserveScroll: true,
                                            preserveState: true,
                                            only: ['recommendedUsers']
                                        })}
                                    >
                                        {user.is_following ? "متابع" : "متابعة"}
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Top Projects (Verified) */}
                    <TopProjects topRepos={topRepos} />
                </div>
            </div>
        </Layout>
    );
}
