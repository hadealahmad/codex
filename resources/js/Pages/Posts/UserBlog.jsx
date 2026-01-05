import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

export default function UserBlog({ user, posts }) {

    // Helper to extract plain text excerpt
    const stripMarkdown = (text) => {
        if (!text) return '';
        return text
            .replace(/#{1,6}\s?/g, '') // Headings
            .replace(/\*\*/g, '') // Bold
            .replace(/\*/g, '') // Italic
            .replace(/__?|~~|`|\[.*?\]\(.*?\)/g, '') // Other syntax
            .replace(/!\[.*?\]\(.*?\)/g, ''); // Images
    };

    return (
        <Layout>
            <Head title={`مدونة ${user.name}`} />

            <div className="space-y-12">
                <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/@${user.username}`}
                            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            <div className="p-1.5 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                                <ArrowRight className="w-4 h-4 ml-0" />
                            </div>
                            <span>العودة لـ @{user.username}</span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4 border-b pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-primary to-foreground">
                            مدونة {user.name}
                        </h1>
                        <p className="text-xl text-muted-foreground font-light">
                            أرشيف التدوينات، المقالات، والأفكار.
                        </p>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {posts.data.length > 0 ? (
                        posts.data.map((post) => (
                            <Card key={post.id} className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-muted/60 bg-card/50 backdrop-blur-sm">
                                <Link href={`/u/${user.username}/${post.slug}`} className="block h-52 overflow-hidden bg-muted relative">
                                    {(post.thumbnail || (post.og_data && post.og_data.image)) ? (
                                        <>
                                            <img
                                                src={post.thumbnail || post.og_data.image}
                                                alt={post.slug}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-secondary/50 text-muted-foreground/20 group-hover:bg-secondary/70 transition-colors">
                                            <div className="text-6xl font-black opacity-10 select-none">{'</>'}</div>
                                        </div>
                                    )}
                                </Link>
                                <CardContent className="flex-1 p-6 space-y-4">
                                    <div className="flex items-center gap-2 text-xs font-medium text-primary/80">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <time dateTime={post.published_at}>
                                            {new Date(post.published_at).toLocaleDateString('ar-SY', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </time>
                                    </div>

                                    <Link href={`/u/${user.username}/${post.slug}`} className="block space-y-3">
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2" dir="auto">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed" dir="auto">
                                            {stripMarkdown(post.content)}
                                        </p>
                                    </Link>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 mt-auto">
                                    <Button variant="secondary" className="w-full group/btn justify-between hover:bg-primary hover:text-primary-foreground transition-colors" asChild>
                                        <Link href={`/u/${user.username}/${post.slug}`}>
                                            <span className="font-bold">اقرأ المقال</span>
                                            <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-24 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/5">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-bold mb-2">لا توجد تدوينات بعد</h3>
                            <p>لم يقم {user.name} بنشر أي محتوى حتى الآن.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {posts.links.length > 3 && (
                    <div className="flex justify-center gap-2 mt-16 pb-8">
                        {posts.links.map((link, i) => (
                            link.url ? (
                                <Button
                                    key={i}
                                    variant={link.active ? "default" : "outline"}
                                    size="icon"
                                    className={`w-10 h-10 ${link.active ? 'shadow-md' : ''}`}
                                    asChild
                                >
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            ) : (
                                <Button
                                    key={i}
                                    variant="ghost"
                                    size="icon"
                                    className="w-10 h-10 text-muted-foreground opacity-50"
                                    disabled
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
