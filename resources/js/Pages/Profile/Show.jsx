import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, usePage, useForm, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    Github, Star, Trash2, ExternalLink, Edit2, DownloadCloud,
    Folder, AlertTriangle,
    Camera, Settings, Share2, Globe,
    Twitter, Linkedin, Youtube, Instagram, MessageCircle, Phone, Check,
    Facebook, Palette, RotateCcw
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

const socialPlatforms = [
    { name: 'facebook', icon: Facebook, label: 'Facebook', domain: ['facebook.com', 'fb.com'] },
    { name: 'twitter', icon: Twitter, label: 'X (Twitter)', domain: ['twitter.com', 'x.com'] },
    { name: 'linkedin', icon: Linkedin, label: 'LinkedIn', domain: 'linkedin.com' },
    { name: 'youtube', icon: Youtube, label: 'YouTube', domain: ['youtube.com', 'youtu.be'] },
    { name: 'instagram', icon: Instagram, label: 'Instagram', domain: 'instagram.com' },
    { name: 'telegram', icon: MessageCircle, label: 'Telegram', domain: ['t.me', 'telegram.me', 'telegram.org'] },
    { name: 'whatsapp', icon: Phone, label: 'WhatsApp', domain: ['wa.me', 'whatsapp.com'] },
    { name: 'behance', icon: Palette, label: 'Behance', domain: 'behance.net' },
    { name: 'website', icon: Globe, label: 'Website', domain: [] },
    { name: 'github', icon: Github, label: 'GitHub', domain: 'github.com', fixed: true },
];

const detectPlatformIcon = (url) => {
    if (!url) return Globe;
    const lowerUrl = url.toLowerCase();
    const platform = socialPlatforms.find(p => {
        if (p.name === 'website') return false;
        if (Array.isArray(p.domain)) return p.domain.some(d => lowerUrl.includes(d));
        return lowerUrl.includes(p.domain);
    });
    return platform ? platform.icon : Globe;
};

const getPlatformIcon = (platformName) => {
    const platform = socialPlatforms.find(p => p.name === platformName);
    return platform ? platform.icon : Globe;
};

export default function Show({ profile, activeTab }) {
    const { auth } = usePage().props;
    const isOwner = auth.user && auth.user.id === profile.id;

    const stripMarkdown = (text) => {
        if (!text) return '';
        return text
            .replace(/#{1,6}\s?/g, '') // Headings
            .replace(/\*\*/g, '') // Bold
            .replace(/\*/g, '') // Italic
            .replace(/__?|~~|`|\[.*?\]\(.*?\)/g, '') // Other syntax
            .replace(/!\[.*?\]\(.*?\)/g, ''); // Images
    };

    // ... handleLike same ...
    const handleLike = (postId) => {
        router.post(`/posts/${postId}/like`, {}, {
            preserveScroll: true,
        });
    };

    const [editingRepo, setEditingRepo] = React.useState(null);
    const [isImporting, setIsImporting] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState('all');
    const [selectedFolder, setSelectedFolder] = React.useState('all');
    const [viewMode, setViewMode] = React.useState('table');
    const [sortConfig, setSortConfig] = React.useState({ key: 'id', direction: 'desc' });
    const [deleteDialog, setDeleteDialog] = React.useState({ open: false, repoId: null });

    // Unified Settings State
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

    const settingsForm = useForm({
        name: profile.name,
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        avatar: null,
        social_links: profile.social_links || [],
    });

    // Sync form when props change
    React.useEffect(() => {
        settingsForm.setData({
            name: profile.name,
            bio: profile.bio || '',
            avatar_url: profile.avatar_url || '',
            avatar: null,
            social_links: profile.social_links || [],
        });
    }, [profile.name, profile.bio, profile.avatar_url, profile.social_links]);

    const handleSettingsUpdate = (e) => {
        e.preventDefault();

        settingsForm.clearErrors();

        settingsForm.transform((data) => {
            const transformed = { ...data };
            if (!(transformed.avatar instanceof File)) {
                delete transformed.avatar;
            }
            return transformed;
        });

        settingsForm.post('/profile/update', {
            forceFormData: true,
            preserveScroll: true,
            onStart: () => toast.loading('جاري حفظ التغييرات...', { id: 'settings-save' }),
            onSuccess: () => {
                setIsSettingsOpen(false);
                toast.success('تم تحديث الملف الشخصي', { id: 'settings-save' });
            },
            onError: (errs) => {
                console.error('Settings update error:', errs);
                const firstError = Object.values(errs)[0];
                toast.error(firstError || 'فشل تحديث البيانات', { id: 'settings-save' });
            },
            onFinish: () => toast.dismiss('settings-save'),
        });
    };

    const handleRevertAvatar = () => {
        settingsForm.setData('avatar', null);
        settingsForm.setData('avatar_url', profile.github_avatar_url);

        router.post('/profile/revert-avatar', {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تمت استعادة الصورة الرمزية من GitHub');
            }
        });
    };

    const handleToggleFeature = (repoId) => {
        router.post(`/repos/${repoId}/toggle-feature`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('تم تحديث قائمة المشاريع المميزة'),
            onError: (err) => {
                const firstError = Object.values(err)[0];
                toast.error(firstError || 'فشل تحديث التمييز');
            }
        });
    };

    const handleAddSocialLink = () => {
        if (settingsForm.data.social_links.length >= 10) {
            toast.error('يمكنك إضافة 10 روابط كحد أقصى');
            return;
        }
        settingsForm.setData('social_links', [...settingsForm.data.social_links, { platform: 'website', url: '' }]);
    };

    const handleRemoveSocialLink = (index) => {
        const newLinks = [...settingsForm.data.social_links];
        newLinks.splice(index, 1);
        settingsForm.setData('social_links', newLinks);
    };

    const handleSocialLinkChange = (index, value) => {
        const lowerValue = value.toLowerCase();
        const detected = socialPlatforms.find(p => {
            if (p.fixed || p.name === 'website') return false;
            return Array.isArray(p.domain)
                ? p.domain.some(d => lowerValue.includes(d))
                : lowerValue.includes(p.domain);
        });

        const newLinks = settingsForm.data.social_links.map((link, i) => {
            if (i === index) {
                return {
                    ...link,
                    url: value,
                    platform: detected ? detected.name : link.platform
                };
            }
            return link;
        });
        settingsForm.setData('social_links', newLinks);
    };

    const handleDownloadData = () => {
        try {
            const downloadUrl = '/profile/download-data';
            const win = window.open(downloadUrl, '_blank');
            if (!win || win.closed || typeof win.closed === 'undefined') {
                window.location.href = downloadUrl;
            }
            toast.success('بدء تحميل البيانات...');
        } catch (e) {
            console.error('Download error:', e);
            window.location.href = '/profile/download-data';
            toast.success('بدء تحميل البيانات...');
        }
    };

    const handleDeleteAccount = () => {
        if (confirm('هل أنت متأكد من حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.')) {
            router.delete('/profile', {
                onSuccess: () => toast.success('تم حذف الحساب نهائياً'),
            });
        }
    };

    const languages = ['all', ...new Set(profile.repos.map(r => r.language).filter(Boolean))];
    const folders = ['all', ...new Set(profile.repos.map(r => r.folder).filter(Boolean))];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredRepos = [...profile.repos]
        .filter(repo => {
            const langMatch = selectedLanguage === 'all' || repo.language === selectedLanguage;
            const folderMatch = selectedFolder === 'all' || repo.folder === selectedFolder;
            return langMatch && folderMatch;
        })
        .sort((a, b) => {
            const valA = a[sortConfig.key] || '';
            const valB = b[sortConfig.key] || '';

            if (valA < valB) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    const handleRefreshVerification = (repoId) => {
        router.post(`/repos/${repoId}/refresh-verification`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('تم تحديث حالة التوثيق'),
            onError: () => toast.error('فشل تحديث حالة التوثيق'),
        });
    };

    const {
        data: editData,
        setData: setEditData,
        put: putEdit,
        processing: editProcessing,
        errors: editErrors,
        reset: resetEdit
    } = useForm({
        url: '',
        user_notes: '',
        folder: '',
    });

    const openEditDialog = (repo) => {
        setEditingRepo(repo);
        setEditData({
            url: repo.url,
            user_notes: repo.user_notes || '',
            folder: repo.folder || '',
        });
    };

    const handleUpdateRepo = (e) => {
        e.preventDefault();
        putEdit(`/repos/${editingRepo.id}`, {
            onSuccess: () => {
                setEditingRepo(null);
                resetEdit();
                toast.success('تم تحديث المشروع بنجاح');
            },
            onError: () => toast.error('حدث خطأ أثناء تحديث المشروع'),
        });
    };

    // Form for adding repos
    const { data, setData, post, processing, reset, errors } = useForm({
        url: '',
        user_notes: '',
        folder: '',
    });

    const submitRepo = (e) => {
        e.preventDefault();
        post('/repos', {
            onSuccess: () => {
                toast.success('تم إضافة المشروع بنجاح');
                reset();
            },
            onError: () => toast.error('حدث خطأ أثناء إضافة المشروع'),
        });
    };

    const handleDeleteRepo = (repoId) => {
        router.delete(`/repos/${repoId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تم حذف المشروع بنجاح');
                setDeleteDialog({ open: false, repoId: null });
            },
        });
    };

    const handleImportAll = () => {
        setIsImporting(true);
        router.post('/repos/import', {}, {
            preserveScroll: true,
            onFinish: () => setIsImporting(false),
            onSuccess: () => toast.success('تم استيراد المشاريع بنجاح'),
            onError: () => toast.error('حدث خطأ أثناء استيراد المشاريع'),
        });
    };

    return (
        <Layout>
            <Head title={profile.name} />

            <div>
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="relative group shrink-0">
                            <Avatar className="w-32 h-32 border-4 border-background shadow-lg rounded-full">
                                <AvatarImage src={profile.avatar_url} alt={profile.name} className="object-cover" />
                                <AvatarFallback className="text-4xl">{profile.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            {isOwner && (
                                <button
                                    onClick={() => setIsSettingsOpen(true)}
                                    className="absolute bottom-1 right-1 bg-primary text-primary-foreground p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                                    title="إعدادات الملف الشخصي"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 w-full text-center md:text-right space-y-4">
                            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
                                        {profile.name}
                                        {profile.is_verified && (
                                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 gap-1 px-2 py-0.5">
                                                <span className="text-blue-500">✓</span> موثق
                                            </Badge>
                                        )}
                                    </h1>
                                    <p className="text-muted-foreground text-lg" dir="ltr">@{profile.username}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                    {isOwner ? (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setIsSettingsOpen(true)}
                                                className="rounded-full h-10 w-10 flex items-center justify-center"
                                                title="إعدادات الملف الشخصي"
                                            >
                                                <Settings className="w-5 h-5" />
                                            </Button>
                                        </>
                                    ) : (
                                        auth.user && (
                                            <Button
                                                variant={profile.is_following ? "outline" : "default"}
                                                onClick={() => router.post(`/users/${profile.id}/follow`)}
                                            >
                                                {profile.is_following ? 'إلغاء المتابعة' : 'متابعة'}
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>

                            <p className="text-lg leading-relaxed text-foreground/90 max-w-3xl">
                                {profile.bio || "لا يوجد نبذة تعريفية."}
                            </p>

                            {/* Social Links Row */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                                {/* Always show GitHub */}
                                <a
                                    href={`https://github.com/${profile.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors group relative"
                                    title="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </a>

                                {/* Other Links */}
                                {profile.social_links?.map((link, idx) => {
                                    const Icon = getPlatformIcon(link.platform);
                                    return (
                                        <a
                                            key={idx}
                                            href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Section (Latest Post & Featured Repos) */}
                {/* Featured Section (Latest Post & Featured Repos) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch" dir="rtl">
                    {/* Latest Post - 66% */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Edit2 className="w-4 h-4" />
                                <span>آخر تدوينة</span>
                            </div>
                            <Button asChild variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                                <Link href={`/@${profile.username}/blog`}>عرض المدونة كاملة &larr;</Link>
                            </Button>
                        </div>
                        {profile.latest_post ? (
                            <Card className="flex-1 overflow-hidden hover:border-primary/30 transition-all bg-card/50 backdrop-blur-sm group border flex flex-col">
                                <Link href={`/u/${profile.username}/${profile.latest_post.slug}`} className="flex flex-col md:flex-row h-full">
                                    {/* Image (33%) - Moved to Start for RTL Right Side */}
                                    <div className="w-full md:w-1/3 h-56 md:h-auto relative bg-muted shrink-0 order-last md:order-first">
                                        {(profile.latest_post.cover_image_path) ? (
                                            <img
                                                src={profile.latest_post.cover_image_path}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                                                alt=""
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 absolute inset-0">
                                                <Edit2 className="w-10 h-10 text-primary/20" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content (66%) */}
                                    <div className="w-full md:w-2/3 p-6 flex flex-col justify-start relative">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-[10px] px-2 h-5">
                                                جديد
                                            </Badge>
                                            <span className="text-[10px] text-muted-foreground font-medium">
                                                {new Date(profile.latest_post.published_at).toLocaleDateString('ar-SY', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                            {profile.latest_post.title || "بدون عنوان"}
                                        </h3>
                                        <div className="prose prose-sm dark:prose-invert max-w-none line-clamp-3 leading-relaxed opacity-90 text-sm">
                                            {stripMarkdown(profile.latest_post.body_markdown)}
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        ) : (
                            <Card className="flex-1 min-h-[250px] flex flex-col items-center justify-center border-dashed border-2 bg-muted/5 gap-4">
                                <div className="p-4 rounded-full bg-muted/30 mb-3">
                                    <Edit2 className="w-8 h-8 text-muted-foreground/50" />
                                </div>
                                <p className="text-muted-foreground">لا توجد منشورات بعد.</p>
                                {isOwner && (
                                    <Button asChild variant="outline" size="sm" className="mt-4">
                                        <Link href="/posts/create">اكتب تدوينتك الأولى</Link>
                                    </Button>
                                )}
                            </Card>
                        )}
                    </div>

                    {/* Featured Repos - 33% */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Star className="w-4 h-4" />
                                <span>مشاريع مختارة</span>
                            </div>
                            <Button asChild variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                                <Link href={`/@${profile.username}/repos`}>عرض كل المشاريع &larr;</Link>
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {profile.featured_repos?.length > 0 ? (
                                profile.featured_repos.map(repo => (
                                    <Card key={repo.id} className="p-4 hover:border-primary/30 transition-all bg-card/50 backdrop-blur-sm group flex flex-col">
                                        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="block space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors font-mono dir-ltr">{repo.name}</h4>
                                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                            </div>
                                            {repo.description && (
                                                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{repo.description}</p>
                                            )}
                                            <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
                                                {/* Folder Badge if exists */}
                                                {repo.folder && (
                                                    <span className="inline-flex items-center gap-1 text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                                        <Folder className="w-2.5 h-2.5" />
                                                        {repo.folder}
                                                    </span>
                                                )}
                                                {repo.language && (
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-primary/40 block"></span>
                                                        {repo.language}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1">
                                                    <Star className="w-3 h-3" />
                                                    {repo.stars}
                                                </span>
                                            </div>
                                        </a>
                                    </Card>
                                ))
                            ) : (
                                <Card className="h-[250px] flex flex-col items-center justify-center border-dashed border-2 bg-muted/5 p-6 text-center gap-2">
                                    <div className="p-4 rounded-full bg-muted/30 mb-3">
                                        <Star className="w-8 h-8 text-muted-foreground/50" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">المشاريع المميزة ستظهر هنا.</p>
                                    {isOwner && (
                                        <p className="text-[10px] text-muted-foreground/60 mt-1">يمكنك تمييز حتى 3 مشاريع من قائمة مشاريعك.</p>
                                    )}
                                </Card>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs Removed */}
            </div>
            <Dialog open={!!editingRepo} onOpenChange={(open) => !open && setEditingRepo(null)}>
                <DialogContent className="sm:max-w-[425px]" dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-right">تعديل المشروع</DialogTitle>
                        <DialogDescription className="text-right">قم بتعديل بيانات المشروع أو نقله إلى مجلد آخر.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateRepo} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-url" className="block text-right">رابط المشروع (GitHub)</Label>
                            <Input
                                id="edit-url"
                                type="url"
                                placeholder="https://github.com/..."
                                value={editData.url}
                                onChange={e => setEditData('url', e.target.value)}
                                className="text-left"
                                dir="ltr"
                                required
                            />
                            {editErrors.url && <p className="text-xs text-red-500 text-right">{editErrors.url}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-notes" className="block text-right">ملاحظات إضافية (اختياري)</Label>
                            <Textarea
                                id="edit-notes"
                                placeholder="ما المختلف في هذا المشروع؟"
                                value={editData.user_notes}
                                onChange={e => setEditData('user_notes', e.target.value)}
                                className="resize-none"
                                maxLength={240}
                            />
                            <p className="text-right text-xs text-muted-foreground">
                                {editData.user_notes?.length || 0} / 240
                            </p>
                        </div>
                        {profile.is_verified && (
                            <div className="space-y-2">
                                <Label htmlFor="edit-folder" className="block text-right">المجلد</Label>
                                <Input
                                    id="edit-folder"
                                    placeholder="مثلاً: مشاريع التخرج"
                                    value={editData.folder}
                                    onChange={e => setEditData('folder', e.target.value)}
                                    maxLength={50}
                                />
                            </div>
                        )}
                        <DialogFooter className="flex-row-reverse justify-start gap-2">
                            <Button type="submit" className="cursor-pointer" disabled={editProcessing}>
                                {editProcessing ? 'جاري التحديث...' : 'تحديث'}
                            </Button>
                            <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setEditingRepo(null)}>
                                إلغاء
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            {deleteDialog.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteDialog({ open: false, repoId: null })}>
                    <div className="bg-background p-6 rounded-lg shadow-lg max-w-md border" dir="rtl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-right mb-2">تأكيد الحذف</h3>
                        <p className="text-right text-muted-foreground mb-6">
                            هل أنت متأكد من حذف هذا المشروع؟ هذا الإجراء لا يمكن التراجع عنه.
                        </p>
                        <div className="flex gap-2 justify-start">
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    console.log('Confirm delete repo');
                                    handleDeleteRepo(deleteDialog.repoId);
                                }}
                            >
                                حذف
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setDeleteDialog({ open: false, repoId: null })}
                            >
                                إلغاء
                            </Button>
                        </div>
                    </div>
                </div>
            )}


            {/* Unified Settings Dialog */}
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden" dir="rtl">
                    <DialogHeader className="p-6 pb-2 border-b">
                        <DialogTitle className="text-right flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            إعدادات الحساب
                        </DialogTitle>
                        <DialogDescription className="text-right">
                            أدر معلوماتك الشخصية، روابط التواصل، وإجراءات الحساب من مكان واحد.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSettingsUpdate} className="flex flex-col max-h-[85vh]">
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Profile Section */}
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                                    <Edit2 className="w-4 h-4" />
                                    المعلومات الشخصية
                                </h3>

                                <div className="space-y-4">
                                    {/* Compact Avatar Selector */}
                                    <div className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30">
                                        <div className="relative">
                                            <Avatar className="w-16 h-16 shadow-sm border-2 border-background ring-2 ring-primary/5">
                                                <AvatarImage src={settingsForm.data.avatar_url} />
                                                <AvatarFallback className="text-lg font-bold bg-primary/5 text-primary">
                                                    {profile.username?.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full shadow-lg border-2 border-background">
                                                <Camera className="w-3 h-3" />
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-2">
                                            <div className="flex gap-2">
                                                <Label
                                                    htmlFor="s-avatar-upload"
                                                    className="flex-1 flex items-center justify-center gap-2 h-9 px-3 rounded-md border bg-background hover:bg-accent cursor-pointer text-xs font-medium transition-colors"
                                                >
                                                    <DownloadCloud className="w-3.5 h-3.5" />
                                                    رفع صورة
                                                </Label>
                                                {!!profile.github_avatar_url && settingsForm.data.avatar_url !== profile.github_avatar_url && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-9 px-3 gap-2 text-[10px]"
                                                        onClick={handleRevertAvatar}
                                                    >
                                                        <RotateCcw className="w-3 h-3" />
                                                        استعادة
                                                    </Button>
                                                )}
                                            </div>
                                            <p className="text-[10px] text-muted-foreground">الحد الأقصى: 1 ميجابايت.</p>
                                        </div>
                                        <Input
                                            id="s-avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={e => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    settingsForm.setData('avatar', file);
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => settingsForm.setData('avatar_url', e.target.result);
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="hidden"
                                        />
                                    </div>
                                    {settingsForm.errors.avatar && <p className="text-xs text-red-500 text-right">{settingsForm.errors.avatar}</p>}

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="s-name" className="text-xs">الاسم الظاهر</Label>
                                            <Input
                                                id="s-name"
                                                value={settingsForm.data.name}
                                                onChange={e => settingsForm.setData('name', e.target.value)}
                                                required
                                                className="h-9"
                                            />
                                            {settingsForm.errors.name && <p className="text-xs text-red-500 text-right">{settingsForm.errors.name}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="s-bio" className="text-xs">النبذة التعريفية</Label>
                                                <span className="text-[10px] text-muted-foreground mr-auto">{(settingsForm.data.bio || '').length} / 120</span>
                                            </div>
                                            <Textarea
                                                id="s-bio"
                                                value={settingsForm.data.bio || ''}
                                                onChange={e => settingsForm.setData('bio', e.target.value)}
                                                className="resize-none h-20 text-sm"
                                                maxLength={120}
                                            />
                                            {settingsForm.errors.bio && <p className="text-xs text-red-500 text-right">{settingsForm.errors.bio}</p>}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Social Links Section */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                                        <Share2 className="w-4 h-4" />
                                        روابط التواصل
                                    </h3>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleAddSocialLink}
                                        className="h-7 px-2 text-[11px] gap-1 hover:bg-primary/5 hover:text-primary transition-colors"
                                        disabled={settingsForm.data.social_links.length >= 10}
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        إضافة رابط
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {settingsForm.data.social_links.map((link, index) => {
                                        const Icon = detectPlatformIcon(link.url);
                                        return (
                                            <div key={index} className="flex gap-2 items-center group">
                                                <Select
                                                    value={link.platform}
                                                    onValueChange={(val) => {
                                                        const newLinks = settingsForm.data.social_links.map((l, i) =>
                                                            i === index ? { ...l, platform: val } : l
                                                        );
                                                        settingsForm.setData('social_links', newLinks);
                                                    }}
                                                >
                                                    <SelectTrigger className="w-[120px] h-9 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {socialPlatforms.map(p => (
                                                            <SelectItem key={p.name} value={p.name} disabled={p.fixed}>
                                                                <div className="flex items-center gap-2">
                                                                    <p.icon className="w-3.5 h-3.5" />
                                                                    <span>{p.label}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <div className="relative flex-1">
                                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground">
                                                        <Icon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <Input
                                                        value={link.url}
                                                        onChange={e => handleSocialLinkChange(index, e.target.value)}
                                                        placeholder="رابط الحساب..."
                                                        className="h-9 pr-9 text-xs text-left font-mono"
                                                        dir="ltr"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveSocialLink(index)}
                                                    className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        );
                                    })}
                                    {settingsForm.data.social_links.length === 0 && (
                                        <div className="text-center py-6 border rounded-lg border-dashed bg-muted/20">
                                            <p className="text-xs text-muted-foreground">لم تقم بإضافة أي روابط تواصل بعد.</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Account Actions Section */}
                            <section className="space-y-4 pt-4 border-t">
                                <h3 className="text-sm font-semibold flex items-center gap-2 text-destructive">
                                    <AlertTriangle className="w-4 h-4" />
                                    إجراءات الحساب
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {!profile.is_verified && (
                                        <Button asChild variant="outline" className="h-10 justify-start gap-3 border-dashed hover:border-primary hover:text-primary transition-all">
                                            <Link href="/verification">
                                                <div className="w-7 h-7 rounded-sm bg-primary/5 flex items-center justify-center">
                                                    <Check className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-semibold">توثيق الحساب</span>
                                            </Link>
                                        </Button>
                                    )}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleDownloadData}
                                        className="h-10 justify-start gap-3 border-dashed hover:border-blue-500 hover:text-blue-500 transition-all"
                                    >
                                        <div className="w-7 h-7 rounded-sm bg-blue-500/5 flex items-center justify-center">
                                            <DownloadCloud className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-semibold">تحميل بياناتي</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleDeleteAccount}
                                        className="h-10 justify-start gap-3 border-dashed border-red-200 text-red-600 hover:bg-red-50 hover:border-red-500 transition-all"
                                    >
                                        <div className="w-7 h-7 rounded-sm bg-red-500/5 flex items-center justify-center">
                                            <Trash2 className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-semibold">حذف الحساب نهائياً</span>
                                    </Button>
                                </div>
                            </section>
                        </div>

                        <DialogFooter className="p-4 border-t bg-muted/5 gap-2 sm:justify-start flex-row-reverse">
                            <Button type="submit" disabled={settingsForm.processing} className="min-w-[120px]">
                                {settingsForm.processing ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                            </Button>
                            <Button type="button" variant="ghost" onClick={() => setIsSettingsOpen(false)}>
                                إلغاء
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>




        </Layout >
    );
}
