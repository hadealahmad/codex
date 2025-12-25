import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Show({ token, status }) {
    const { data, setData, post, processing, errors } = useForm({
        gist_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/verification', {
            onSuccess: () => toast.success('تم إرسال الرابط للتحقق.'),
            onError: () => toast.error('حدث خطأ، يرجى التأكد من الرابط.'),
        });
    };

    return (
        <Layout>
            <Head title="توثيق الحساب" />
            <div className="flex justify-center mt-12">
                <Card className="w-full max-w-lg">
                    <CardHeader className="p-6">
                        <CardTitle>توثيق حسابك</CardTitle>
                        <CardDescription>
                            للحصول على الشارة الموثقة، يرجى إثبات ملكيتك لحساب GitHub.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6 pt-0">
                        {status === 'approved' ? (
                            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md text-green-700 dark:text-green-300 text-center">
                                حسابك موثق بالفعل! 🎉
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label>1. أنشئ Gist عام (Public Gist) يحتوي على هذا الكود فقط:</Label>
                                    <div className="bg-muted p-2 rounded-md font-mono text-center select-all cursor-pointer"
                                        onClick={() => { navigator.clipboard.writeText(token); toast.info('تم نسخ الكود') }}>
                                        {token}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">

                                    <div className="space-y-4 pt-4">
                                        <div className="flex gap-4 items-center">
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    post('/verification/scan');
                                                }}
                                                disabled={processing}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                {processing ? 'جاري الفحص...' : 'فحص Gists تلقائياً ⚡️'}
                                            </Button>
                                        </div>
                                        <p className="text-sm text-muted-foreground text-center">
                                            يجب أن يكون الـ Gist عاماً (Public) ليتم العثور عليه.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
