import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2, Users, Star, TrendingUp, Github, Sparkles, UserPlus, BadgeCheck } from 'lucide-react';
import Markdown from 'react-markdown';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from 'sonner';
import TopProjects from '@/components/TopProjects';


export default function ExploreUsers({ users, topRepos, auth }) {

    return (
        <Layout>
            <Head title="استكشف المستخدمين" />

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Feed (66%) */}
                <div className="md:col-span-2 border rounded-xl bg-card">
                    <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b p-4">
                        <h1 className="text-xl font-bold">المستخدمون</h1>
                    </div>

                    <div className="divide-y divide-border">
                        {users.data.map((user) => (
                            <Link
                                key={user.id}
                                href={String(user.id)} // Assuming this links to profile, currently just ID based on existing code
                                className="flex gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                            >
                                <Avatar className="w-12 h-12 border">
                                    <AvatarImage src={user.avatar_url} alt={user.name} className="object-cover" />
                                    <AvatarFallback className="">{user.name?.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1">
                                                <span className="font-bold text-foreground group-hover:underline decoration-primary">
                                                    {user.name}
                                                </span>
                                                {user.is_verified && (
                                                    <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                                                )}
                                            </div>
                                            <span className="text-muted-foreground text-sm ml-auto" dir="ltr">
                                                @{user.username}
                                            </span>
                                        </div>

                                        {/* Action Button - Stop propagation to prevent clicking the row when clicking button */}
                                        {user.id !== auth.user.id && (
                                            <div onClick={(e) => e.preventDefault()}>
                                                <Button
                                                    variant={user.is_following ? "outline" : "default"}
                                                    size="sm"
                                                    className={`rounded-full font-bold ${user.is_following ? 'hover:border-red-500 hover:text-red-500 hover:bg-red-500/10' : ''}`}
                                                >
                                                    {user.is_following ? 'تتابع' : 'متابعة'}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    {user.bio && (
                                        <p className="mt-2 text-foreground whitespace-pre-wrap break-words dir-rtl">
                                            {user.bio}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {(users.links.prev || users.links.next) && (
                        <div className="p-4 border-t flex justify-center gap-4">
                            {users.links.prev && (
                                <Button variant="outline" size="sm" className="rounded-full" asChild>
                                    <Link href={users.links.prev}>السابق</Link>
                                </Button>
                            )}
                            {users.links.next && (
                                <Button variant="outline" size="sm" className="rounded-full" asChild>
                                    <Link href={users.links.next}>التالي</Link>
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar (33%) */}
                <div className="space-y-8">
                    {/* Top Projects (Verified) */}
                    <TopProjects topRepos={topRepos} />
                </div>
            </div>
        </Layout>
    );
}