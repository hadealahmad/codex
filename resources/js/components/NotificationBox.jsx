import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotificationBox() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            axios.get('/notifications/recent')
                .then(response => {
                    setNotifications(response.data.notifications);
                })
                .catch(error => {
                    console.error("Failed to fetch notifications:", error);
                });
        }
    }, [isOpen]);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative cursor-pointer">
                    <Bell className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                    <h4 className="font-semibold text-right">الإشعارات</h4>
                </div>
                <ScrollArea className="h-80">
                    {notifications.length > 0 ? (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="p-4 border-b last:border-0 hover:bg-muted/50 transition-colors text-right relative group cursor-pointer">
                                    <p className="text-sm">{notification.data.message || 'إشعار جديد'}</p>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(notification.created_at).toLocaleDateString('ar-SY')}
                                    </span>
                                    {!notification.read_at && (
                                        <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            لا توجد إشعارات جديدة
                        </div>
                    )}
                </ScrollArea>
                <div className="p-2 border-t text-center">
                    <Button asChild variant="link" size="sm" onClick={() => setIsOpen(false)} className="cursor-pointer">
                        <Link href="/notifications">عرض كل الإشعارات</Link>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
