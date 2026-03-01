import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Markdown from 'react-markdown';
import { toast } from "sonner";

export default function Edit({ post }) {
    const { data, setData, post: submitPost, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
        thumbnail: null,
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();
        submitPost(`/posts/${post.id}`, {
            forceFormData: true,
            onSuccess: () => toast.success('تم تحديث المنشور بنجاح.'),
            onError: () => toast.error('يرجى التحقق من المحتوى.'),
        });
    };

    return (
        <Layout>
            <Head title="تعديل المنشور" />
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">تعديل المنشور</h1>
                    <Button onClick={submit} disabled={processing || data.content.length < 10 || !data.title} className="cursor-pointer">
                        {processing ? 'جاري التحديث...' : 'تحديث'}
                    </Button>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    صورة مصغرة
                                </label>
                                {post.thumbnail && (
                                    <div className="mb-2 w-32 h-20 rounded overflow-hidden border">
                                        <img src={post.thumbnail} alt="Current" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    onChange={e => setData('thumbnail', e.target.files[0])}
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    الحد الأقصى: 512KB. اتركها فارغة للإبقاء على الصورة الحالية.
                                </p>
                                {errors.thumbnail && <p className="text-destructive text-xs">{errors.thumbnail}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    عنوان التدوينة
                                </label>
                                <input
                                    type="text"
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-lg font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="أدخل عنواناً مميزاً..."
                                />
                                {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="write" className="w-full" dir="rtl">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="write" className="cursor-pointer">كتابة</TabsTrigger>
                            <TabsTrigger value="preview" className="cursor-pointer">معاينة</TabsTrigger>
                        </TabsList>
                        <TabsContent value="write">
                            <Card className="min-h-[500px]">
                                <CardContent className="p-0 h-full">
                                    <Textarea
                                        placeholder="اكتب هنا باستخدام Markdown... (# عنوان, **عريض**, - قائمة)"
                                        className="min-h-[500px] border-0 focus-visible:ring-0 resize-none text-lg p-6"
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        dir="auto"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="preview">
                            <Card className="min-h-[500px]">
                                <CardContent className="p-8 prose dark:prose-invert max-w-none break-words" dir="auto">
                                    {data.content ? (
                                        <Markdown>{data.content}</Markdown>
                                    ) : (
                                        <p className="text-muted-foreground text-center mt-20">لا يوجد محتوى للمعاينة.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    {errors.content && <p className="text-destructive font-medium">{errors.content}</p>}
                </div>
            </div>
        </Layout >
    );
}
