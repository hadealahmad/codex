import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus, Github, DownloadCloud } from 'lucide-react';
import { toast } from 'sonner';

export default function AddRepoDialog({ open, onOpenChange }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        url: '',
        folder: '',
        user_notes: '',
    });

    const [isImporting, setIsImporting] = useState(false);

    const submitRepo = (e) => {
        e.preventDefault();
        post('/repos', {
            onSuccess: () => {
                toast.success('تمت إضافة المشروع بنجاح');
                reset();
                onOpenChange(false);
            },
            onError: () => {
                toast.error('فشل إضافة المشروع. يرجى التأكد من الرابط.');
            }
        });
    };

    const handleImportAll = () => {
        setIsImporting(true);
        router.post('/repos/import', {}, {
            onSuccess: () => {
                toast.success('بدأت عملية استيراد المشاريع. سيتم تحديث القائمة قريباً.');
                setIsImporting(false);
                onOpenChange(false);
            },
            onError: () => {
                toast.error('فشل بدء الاستيراد.');
                setIsImporting(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-right">إضافة مشروع جديد</DialogTitle>
                    <DialogDescription className="text-right">
                        أضف رابط مشروعك من GitHub أو استورد جميع مشاريعك دفعة واحدة.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <form onSubmit={submitRepo} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="url" className="text-right block">رابط GitHub</Label>
                            <Input
                                id="url"
                                placeholder="https://github.com/username/repo"
                                value={data.url}
                                onChange={e => setData('url', e.target.value)}
                                className="text-left"
                                dir="ltr"
                                required
                            />
                            {errors.url && <p className="text-xs text-red-500 text-right">{errors.url}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="folder" className="text-right flex items-center gap-2">
                                <FolderPlus className="w-4 h-4" />
                                المجلد (اختياري)
                            </Label>
                            <Input
                                id="folder"
                                placeholder="مثلاً: تطبيقات الهاتف"
                                value={data.folder}
                                onChange={e => setData('folder', e.target.value)}
                                maxLength={50}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-right block">ملاحظاتك (اختياري)</Label>
                            <Input
                                id="notes"
                                placeholder="ماذا تعلمت من هذا المشروع؟"
                                value={data.user_notes}
                                onChange={e => setData('user_notes', e.target.value)}
                                maxLength={240}
                            />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button type="submit" disabled={processing} className="flex-1 cursor-pointer">
                                {processing ? 'جاري الإضافة...' : 'إضافة المشروع'}
                            </Button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">أو</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleImportAll}
                        disabled={isImporting}
                        className="w-full cursor-pointer gap-2 border-primary/50 hover:bg-primary/5 hover:border-primary transition-all"
                    >
                        {isImporting ? (
                            <>
                                <DownloadCloud className="w-4 h-4 animate-bounce" />
                                جاري الاستيراد...
                            </>
                        ) : (
                            <>
                                <Github className="w-4 h-4" />
                                <span>استيراد الكل من GitHub</span>
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
