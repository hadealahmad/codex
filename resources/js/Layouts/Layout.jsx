import React from 'react';
import { Toaster, toast } from "sonner"
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, LayoutDashboard, PlusSquare, Bell, Edit2, FolderPlus } from 'lucide-react';
import NotificationBox from '@/components/NotificationBox.jsx';
import { ModeToggle } from '@/components/ModeToggle.jsx';
import AddRepoDialog from '@/components/AddRepoDialog.jsx';

export default function Layout({ children }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isAddRepoOpen, setIsAddRepoOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans" dir="rtl">
            <nav className="border-b bg-card">
                <div className="container mx-auto flex items-center justify-between h-16 px-4">
                    <Link href="/" className="flex items-center">
                        <img
                            src={mounted && resolvedTheme === 'dark' ? '/images/logo-dark.svg' : '/images/logo.svg'}
                            alt="Codex"
                            className="h-16 w-auto"
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                {/* Add Content Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="cursor-pointer">
                                            <PlusSquare className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48" dir="rtl">
                                        <DropdownMenuItem asChild className="cursor-pointer gap-2">
                                            <Link href="/posts/create" className="w-full flex items-center justify-start gap-2">
                                                <Edit2 className="h-4 w-4" />
                                                <span>تدوينة جديدة</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer gap-2">
                                            <button
                                                onClick={() => setIsAddRepoOpen(true)}
                                                className="w-full flex items-center justify-start gap-2 text-start"
                                            >
                                                <FolderPlus className="h-4 w-4" />
                                                <span>إضافة مشروع</span>
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <ModeToggle />

                                <div className="hidden md:block">
                                    <NotificationBox />
                                </div>
                                <div className="md:hidden">
                                    <Link href="/notifications">
                                        <Button variant="ghost" size="icon" className="cursor-pointer">
                                            <Bell className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.avatar_url} alt={user.name} />
                                                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none text-right">{user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground text-right">
                                                    @{user.username}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup dir="rtl">
                                            <DropdownMenuItem asChild className="flex justify-start gap-2 cursor-pointer">
                                                <Link href={`/@${user.username}`} className="w-full flex items-center justify-start gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span>ملفي الشخصي</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            {user.is_admin && (
                                                <DropdownMenuItem asChild className="flex justify-start gap-2 cursor-pointer">
                                                    <a href="/admin/dashboard" className="w-full flex items-center justify-start gap-2">
                                                        <LayoutDashboard className="h-4 w-4" />
                                                        <span>لوحة التحكم</span>
                                                    </a>
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem dir="rtl" asChild className="flex justify-start gap-2 cursor-pointer text-red-600 focus:text-red-500">
                                            <Link href="/logout" method="post" as="button" className="w-full flex justify-start items-center gap-2">
                                                <LogOut className="h-4 w-4" />
                                                <span>تسجيل الخروج</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <Button asChild size="sm" className="cursor-pointer">
                                <a href="/auth/github/redirect">تسجيل الدخول</a>
                            </Button>
                        )}
                    </div>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-8 max-w-5xl min-h-[calc(100vh-4rem)]">
                {children}
            </main>
            <Toaster />
            <AddRepoDialog open={isAddRepoOpen} onOpenChange={setIsAddRepoOpen} />
        </div>
    );
}
