import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    ArrowRight,
    Share2,
    Edit2,
    Trash2,
    Heart,
    MessageSquare,
    Calendar,
    Clock,
    Send,
    MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Show({ post }) {
    const { user, comments = [] } = post;
    const { auth } = usePage().props;
    const isOwner = auth.user && auth.user.id === post.user_id;
    const [isDeleting, setIsDeleting] = useState(false);

    const { data: commentData, setData: setCommentData, post: postComment, processing: commentProcessing, reset: resetComment } = useForm({
        content: '',
    });

    const handleLike = () => {
        router.post(`/posts/${post.id}/like`, {}, {
            preserveScroll: true,
        });
    };

    const handleDeletePost = () => {
        if (confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
            router.delete(`/posts/${post.id}`, {
                onSuccess: () => toast.success('تم حذف المنشور بنجاح.'),
            });
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        postComment(`/posts/${post.id}/comments`, {
            preserveScroll: true,
            onSuccess: () => {
                resetComment();
                toast.success('تم إضافة تعليقك.');
            },
        });
    };

    const handleDeleteComment = (commentId) => {
        if (confirm('هل أنت متأكد من حذف التعليق؟')) {
            router.delete(`/comments/${commentId}`, {
                preserveScroll: true,
                onSuccess: () => toast.success('تم حذف التعليق.'),
            });
        }
    };

    const handleShare = () => {
        const url = window.location.href;
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

    const formattedDate = new Date(post.published_at).toLocaleDateString('ar-SY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Layout>
            <Head title={post.title} />

            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Top Navigation */}
                <div className="flex items-center justify-between">
                    <Link
                        href={`/@${user.username}`}
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <div className="p-1.5 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                            <ArrowRight className="w-4 h-4 ml-0" />
                        </div>
                        <span>العودة لـ @{user.username}</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={handleShare} className="rounded-full cursor-pointer">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        {isOwner && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40" dir="rtl">
                                    <DropdownMenuItem asChild className="cursor-pointer">
                                        <Link href={`/posts/${post.id}/edit`} className="flex items-center gap-2">
                                            <Edit2 className="w-3.5 h-3.5" />
                                            <span>تعديل</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleDeletePost}
                                        className="text-destructive focus:text-destructive cursor-pointer flex items-center gap-2"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>حذف</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                {/* Main Content Card */}
                <Card className="border-2 shadow-xl shadow-muted/20 overflow-hidden">
                    <CardContent className="pt-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {formattedDate}
                                </span>
                                <Separator orientation="vertical" className="h-4" />
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    {post.reading_time} دقيقة للقراءة
                                </span>
                            </div>
                        </div>
                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight text-foreground" dir="auto">
                            {post.title}
                        </h1>

                        {/* Thumbnail */}
                        {post.cover_image_path && (
                            <div className="mb-8 rounded-lg overflow-hidden border-2">
                                <img
                                    src={post.cover_image_path}
                                    alt={post.slug}
                                    className="w-full h-auto max-h-[500px] object-cover"
                                />
                            </div>
                        )}

                        {/* Article Content */}
                        <article className="prose dark:prose-invert prose-lg max-w-none overflow-hidden prose-headings:mb-6 prose-headings:mt-8 prose-p:my-4 prose-li:my-2 prose-img:rounded-xl prose-img:my-4 prose-ul:my-4 prose-ol:my-4 leading-normal" dir="auto"
                            dangerouslySetInnerHTML={{ __html: post.body_html }}
                        >
                        </article>

                        <div className="flex items-center justify-between mt-12 py-6 border-y border-dashed">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`gap-2 h-10 px-6 rounded-full cursor-pointer transition-all ${post.is_liked ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'hover:bg-primary/5'}`}
                                onClick={handleLike}
                            >
                                <Heart className={`w-5 h-5 ${post.is_liked ? 'fill-current' : ''}`} />
                                <span className="font-bold">{post.likes_count || 0}</span>
                            </Button>

                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <MessageSquare className="w-4 h-4" />
                                <span>{comments.length} تعليق</span>
                            </div>
                        </div>

                        {/* Author Info */}
                        <div className="mt-8 bg-muted/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
                            <Link href={`/@${user.username}`}>
                                <Avatar className="w-20 h-20 border-4 border-background shadow-lg group">
                                    <AvatarImage src={user.avatar_url} />
                                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-2">
                                    <Link href={`/@${user.username}`} className="font-bold text-xl hover:text-primary transition-colors">
                                        {user.name}
                                    </Link>
                                    <span className="text-muted-foreground text-sm md:mr-2">@{user.username}</span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                                    {user.bio || "مطور يشارك أفكاره على كودكس."}
                                </p>
                            </div>
                            <Button asChild variant="outline" className="rounded-full px-6 cursor-pointer">
                                <Link href={`/@${user.username}`}>عرض الملف</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Comments Section */}
                <div className="space-y-6 pt-8 pb-12" id="comments">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">التعليقات</h2>
                        <span className="bg-muted px-2 py-0.5 rounded text-xs font-mono text-muted-foreground">{comments.length}</span>
                    </div>

                    {auth.user ? (
                        <Card className="border-2 overflow-hidden shadow-md">
                            <CardContent className="p-0">
                                <form onSubmit={handleCommentSubmit} className="space-y-0">
                                    <Textarea
                                        placeholder="اكتب تعليقك هنا..."
                                        className="border-0 focus-visible:ring-0 resize-none min-h-[100px] p-4 text-base"
                                        value={commentData.content}
                                        onChange={e => setCommentData('content', e.target.value)}
                                        required
                                    />
                                    <div className="flex items-center justify-between p-3 bg-muted/30 border-t">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-6 h-6">
                                                <AvatarImage src={auth.user.avatar_url} />
                                                <AvatarFallback>{auth.user.username[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-[10px] text-muted-foreground">تكتب بصفتك @{auth.user.username}</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            disabled={commentProcessing || !commentData.content.trim()}
                                            className="cursor-pointer gap-2"
                                        >
                                            {commentProcessing ? 'جاري الإرسال...' : 'إرسال التعليق'}
                                            <Send className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="bg-muted/10 border-dashed border-2 p-8 text-center flex flex-col items-center justify-center gap-4">
                            <p className="text-muted-foreground">يجب أن تكون مسجلاً للدخول لتتمكن من التعليق.</p>
                            <Button asChild variant="secondary" className="cursor-pointer">
                                <Link href="/auth/github/redirect">سجل دخولك عبر GitHub</Link>
                            </Button>
                        </Card>
                    )}

                    <div className="space-y-4">
                        {comments.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground bg-muted/5 rounded-xl border border-dashed">
                                لا توجد تعليقات بعد. كن أول من يعلق!
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <Card key={comment.id} className="border hover:border-primary/20 transition-all bg-card/50">
                                    <CardContent className="p-5 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Link href={`/@${comment.user.username}`} className="flex items-center gap-3 group">
                                                <Avatar className="w-9 h-9 border group-hover:border-primary/30 transition-all">
                                                    <AvatarImage src={comment.user.avatar_url} />
                                                    <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold group-hover:text-primary transition-colors">{comment.user.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">{new Date(comment.created_at).toLocaleDateString('ar-SY', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                            </Link>

                                            {(auth.user && (auth.user.id === comment.user_id || auth.user.username === 'hadealahmad')) && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-8 h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="text-sm text-foreground/90 leading-relaxed pr-12" dir="auto">
                                            {comment.content}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
