import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Markdown from 'react-markdown';
import { toast } from "sonner";
import {
    PenLine,
    Eye,
    ChevronRight,
    HelpCircle,
    Bold,
    Italic,
    List as ListIcon,
    Link as LinkIcon,
    Image as ImageIcon,
    Code
} from 'lucide-react';

const MarkdownTip = ({ icon: Icon, label, example }) => (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors text-xs">
        <Icon className="w-3.5 h-3.5 text-primary opacity-70" />
        <span className="font-medium text-muted-foreground">{label}</span>
        <code className="bg-muted px-1.5 py-0.5 rounded ml-auto font-mono text-[10px]">{example}</code>
    </div>
);

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body_markdown: '',
        cover_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/posts', {
            forceFormData: true,
            onError: () => toast.error('يرجى التحقق من المحتوى (يجب أن يكون 10 أحرف على الأقل).'),
            onSuccess: () => toast.success('تم نشر تدوينتك بنجاح!'),
        });
    };

    return (
        <Layout>
            <Head title="كتابة منشور جديد" />

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                    <div className="space-y-1">
                        <Link
                            href="/"
                            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors mb-2"
                        >
                            <ChevronRight className="w-3 h-3" />
                            العودة للرئيسية
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            شارك معرفتك
                        </h1>
                        <p className="text-muted-foreground">
                            اكتب تدوينة تقنية، شارك مشروعك، أو اطرح فكرة جديدة للنقاش.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            className="cursor-pointer font-medium"
                            disabled={processing}
                            asChild
                        >
                            <Link href="/">إلغاء</Link>
                        </Button>
                        <Button
                            onClick={submit}
                            disabled={processing || data.body_markdown.length < 10 || !data.title}
                            className="cursor-pointer px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                        >
                            {processing ? 'جاري النشر...' : 'نشر التدوينة'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Editor Section */}
                    <div className="lg:col-span-3 space-y-4">
                        <Tabs defaultValue="write" className="w-full" dir="rtl">
                            <TabsList className="bg-muted/50 p-1 mb-4 h-auto">
                                <TabsTrigger value="write" className="gap-2 py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                    <PenLine className="w-4 h-4" />
                                    <span>تحرير</span>
                                </TabsTrigger>
                                <TabsTrigger value="preview" className="gap-2 py-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                    <Eye className="w-4 h-4" />
                                    <span>معاينة العرض</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="write" className="mt-0">
                                <Card className="border-2 focus-within:border-primary/30 transition-all min-h-[600px] flex flex-col">
                                    <div className="p-6 pb-0">
                                        <input
                                            type="text"
                                            placeholder="عنوان التدوينة"
                                            className="w-full text-3xl font-bold bg-transparent border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 placeholder:text-muted-foreground/50 px-0 py-2 transition-all"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            autoFocus
                                        />
                                        {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
                                    </div>
                                    <CardContent className="p-0 flex-1">
                                        <Textarea
                                            placeholder="اكتب المحتوى هنا... يمكنك استخدام Markdown للتنسيق.\n\nمثال:\n## عنوان فرعي\nابدأ بالكتابة..."
                                            className="min-h-[600px] border-0 focus-visible:ring-0 resize-none text-lg p-8 leading-relaxed font-arabic bg-transparent"
                                            value={data.body_markdown}
                                            onChange={e => setData('body_markdown', e.target.value)}
                                            dir="auto"
                                        />
                                    </CardContent>
                                    <div className="border-t p-3 bg-muted/5 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                                        <span>يدعم تنسيق Markdown بشكل كامل</span>
                                        <span>{data.body_markdown.length} حرف</span>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="preview" className="mt-0">
                                <Card className="border-2 min-h-[600px] bg-card/50 backdrop-blur-sm">
                                    <CardContent className="p-8 md:p-12 prose dark:prose-invert max-w-none break-words" dir="auto">
                                        {data.body_markdown ? (
                                            <Markdown>{data.body_markdown}</Markdown>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground opacity-50">
                                                <Eye className="w-12 h-12 mb-4" />
                                                <p>المعاينة ستظهر هنا عند كتابة شيء ما</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {errors.body_markdown && (
                            <div className="p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium flex items-center gap-2">
                                <HelpCircle className="w-4 h-4" />
                                {errors.body_markdown}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Tips */}
                    <div className="lg:col-span-1 space-y-4">
                        <Card className="border-2 border-dashed shadow-sm">
                            <CardHeader className="pb-3 border-b bg-muted/30 p-4">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-primary" />
                                    صورة مصغرة (اختياري)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-2">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        onChange={e => setData('cover_image', e.target.files[0])}
                                    />
                                    <p className="text-[10px] text-muted-foreground">
                                        الحد الأقصى: 512KB. سيتم تحويلها إلى WebP تلقائياً.
                                    </p>
                                </div>
                                {errors.cover_image && <p className="text-destructive text-xs">{errors.cover_image}</p>}
                            </CardContent>
                        </Card>

                        <Card className="sticky top-6">
                            <CardHeader className="pb-3 border-b bg-muted/30 p-4">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-primary" />
                                    دليل التنسيق السريع
                                </CardTitle>
                                <CardDescription className="text-[10px]">
                                    استخدم Markdown لإضافة لمسات إبداعية
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 space-y-1">
                                <MarkdownTip icon={PenLine} label="عنوان رئيسي" example="# عنوان" />
                                <MarkdownTip icon={PenLine} label="عنوان فرعي" example="## عنوان" />
                                <MarkdownTip icon={Bold} label="نص عريض" example="**نص**" />
                                <MarkdownTip icon={Italic} label="نص مائل" example="*نص*" />
                                <MarkdownTip icon={ListIcon} label="قائمة نقاط" example="- عنصر" />
                                <MarkdownTip icon={LinkIcon} label="رابط" example="[نص](رابط)" />
                                <MarkdownTip icon={ImageIcon} label="صورة" example="![وصف](رابط)" />
                                <MarkdownTip icon={Code} label="كود سطر" example="`code`" />
                                <MarkdownTip icon={Code} label="بلوك كود" example="```js" />

                                <div className="mt-4 pt-4 border-t px-2">
                                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">نصائح للنشر</h5>
                                    <ul className="text-[10px] space-y-2 text-muted-foreground leading-relaxed list-disc list-inside">
                                        <li>ابدأ المقال دائماً بعنوان (#).</li>
                                        <li>استخدم العناوين الفرعية لتقسيم النص.</li>
                                        <li>أضف روابط لمشاريعك من GitHub.</li>
                                        <li>تأكد من مراجعة المعاينة قبل النشر.</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
