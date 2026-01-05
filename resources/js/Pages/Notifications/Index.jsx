import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Index({ notifications }) {
    const { post } = useForm();

    const markRead = (id) => {
        post(`/notifications/${id}/read`, { preserveScroll: true });
    };

    return (
        <Layout>
            <Head title="الإشعارات" />

            <div>
                <h1 className="text-2xl font-bold mb-6">الإشعارات</h1>

                <div className="space-y-4">
                    {notifications.data.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            لا توجد إشعارات جديدة.
                        </div>
                    ) : (
                        notifications.data.map(notification => (
                            <Card key={notification.id} className={`${notification.read_at ? 'opacity-60' : 'border-primary'}`}>
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Link href={`/@${notification.data.follower_username}`}>
                                            <Avatar>
                                                <AvatarImage src={notification.data.follower_avatar} />
                                                <AvatarFallback>?</AvatarFallback>
                                            </Avatar>
                                        </Link>
                                        <div>
                                            <p className="font-medium">{notification.data.message}</p>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(notification.created_at).toLocaleDateString('ar-SY')}
                                            </span>
                                        </div>
                                    </div>
                                    {!notification.read_at && (
                                        <Button size="sm" variant="ghost" onClick={() => markRead(notification.id)}>
                                            تحديد كمقروء
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-4">
                    {notifications.prev_page_url && (
                        <Button variant="outline" asChild>
                            <Link href={notifications.prev_page_url}>السابق</Link>
                        </Button>
                    )}
                    {notifications.next_page_url && (
                        <Button variant="outline" asChild>
                            <Link href={notifications.next_page_url}>التالي</Link>
                        </Button>
                    )}
                </div>
            </div>
        </Layout>
    );
}
