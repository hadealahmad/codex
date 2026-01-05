import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Users, FileText, GitBranch, CheckCircle, ExternalLink, Check, X, MoreVertical, Ban, Trash2, ShieldCheck, ShieldOff, ArrowUpDown, Search } from 'lucide-react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Pagination from '@/components/Pagination.jsx';

export default function Dashboard({ stats, users, filters }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [bulkAction, setBulkAction] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ open: false, title: '', description: '', onConfirm: null });
    const [search, setSearch] = useState(filters.search || '');
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });

    const showConfirmDialog = (title, description, onConfirm) => {
        setConfirmDialog({ open: true, title, description, onConfirm });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/dashboard', { search, filter: filters.filter, per_page: filters.per_page }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handleFilterChange = (newFilter) => {
        router.get('/admin/dashboard', { search, filter: newFilter, per_page: filters.per_page }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handlePerPageChange = (newPerPage) => {
        router.get('/admin/dashboard', { search, filter: filters.filter, per_page: newPerPage }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedUsers(users.data.map(u => u.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId, checked) => {
        if (checked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
    };

    const handleBulkAction = () => {
        if (!bulkAction || selectedUsers.length === 0) {
            toast.error('يرجى اختيار إجراء ومستخدمين.');
            return;
        }

        const actionLabels = {
            verify: 'توثيق',
            unverify: 'إلغاء توثيق',
            ban: 'حظر',
            unban: 'إلغاء حظر',
            delete: 'حذف'
        };

        showConfirmDialog(
            `تأكيد ${actionLabels[bulkAction]}`,
            `هل أنت متأكد من ${actionLabels[bulkAction]} ${selectedUsers.length} مستخدم؟`,
            () => {
                router.post('/admin/users/bulk-action', {
                    action: bulkAction,
                    user_ids: selectedUsers,
                }, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedUsers([]);
                        setBulkAction('');
                        toast.success('تم تنفيذ الإجراء بنجاح.');
                    },
                });
            }
        );
    };

    const handleUserAction = (userId, action, title, description) => {
        showConfirmDialog(title, description, () => {
            const method = action === 'delete' ? 'delete' : 'post';
            const url = action === 'delete' ? `/admin/users/${userId}` : `/admin/users/${userId}/${action}`;
            router[method](url, {}, {
                preserveScroll: true,
                onSuccess: () => toast.success('تم تنفيذ الإجراء بنجاح.'),
            });
        });
    };

    const handleVerificationAction = (verificationId, action) => {
        const actionLabel = action === 'approve' ? 'قبول' : 'رفض';
        showConfirmDialog(
            `تأكيد ${actionLabel} التوثيق`,
            `هل أنت متأكد من ${actionLabel} طلب التوثيق هذا؟`,
            () => {
                router.post(`/admin/verifications/${verificationId}/${action}`, {}, {
                    preserveScroll: true,
                    onSuccess: () => toast.success('تم تحديث التوثيق.'),
                });
            }
        );
    };

    // Sort users (only sorts the current page client-side)
    const sortedUsers = [...users.data].sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for nested or boolean values
        if (sortConfig.key === 'is_verified') {
            aValue = a.is_verified ? 1 : 0;
            bValue = b.is_verified ? 1 : 0;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <Layout>
            <Head title="لوحة التحكم" />

            <div>
                <h1 className="text-3xl font-bold mb-8">لوحة تحكم المشرف</h1>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatCard
                        title="المستخدمين"
                        value={stats.users}
                        icon={Users}
                        onClick={() => handleFilterChange('all')}
                        active={!filters.filter || filters.filter === 'all'}
                    />
                    <StatCard
                        title="المنشورات"
                        value={stats.posts}
                        icon={FileText}
                        onClick={() => {
                            console.log('Navigating to: /admin/posts');
                            router.visit('/admin/posts');
                        }}
                    />
                    <StatCard
                        title="المشاريع"
                        value={stats.repos}
                        icon={GitBranch}
                        onClick={() => {
                            console.log('Navigating to: /admin/repos');
                            router.visit('/admin/repos');
                        }}
                    />
                    <StatCard
                        title="طلبات التوثيق"
                        value={stats.pending_verifications}
                        icon={CheckCircle}
                        className="text-yellow-600"
                        onClick={() => handleFilterChange('pending')}
                        active={filters.filter === 'pending'}
                    />
                </div>

                {/* Users Table */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold whitespace-nowrap">إدارة المستخدمين</h2>

                        {/* Search Box */}
                        <form onSubmit={handleSearch} className="relative max-w-sm w-full">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="بحث عن مستخدم..."
                                className="pr-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        router.get('/admin/dashboard', { search: '', filter: filters.filter }, {
                                            preserveState: true,
                                            preserveScroll: true,
                                            replace: true
                                        });
                                    }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </form>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground whitespace-nowrap">الصفوف:</span>
                                <Select
                                    value={filters.per_page?.toString() || "15"}
                                    onValueChange={handlePerPageChange}
                                >
                                    <SelectTrigger className="w-[80px] h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="15">15</SelectItem>
                                        <SelectItem value="30">30</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedUsers.length > 0 && (
                                <div className="flex items-center gap-2 border-r pr-4 mr-2">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedUsers.length} محدد
                                    </span>
                                    <Select value={bulkAction} onValueChange={setBulkAction}>
                                        <SelectTrigger className="w-[140px] h-8">
                                            <SelectValue placeholder="إجراء" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="verify">توثيق</SelectItem>
                                            <SelectItem value="unverify">إلغاء التوثيق</SelectItem>
                                            <SelectItem value="ban">حظر</SelectItem>
                                            <SelectItem value="unban">إلغاء الحظر</SelectItem>
                                            <SelectItem value="delete">حذف</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={handleBulkAction} size="sm" className="h-8">
                                        تطبيق
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {users.data.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground bg-card border rounded-lg">
                            لا توجد نتائج
                        </div>
                    ) : (
                        <div className="border rounded-lg bg-card overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={selectedUsers.length === users.data.length && users.data.length > 0}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead className="text-right">
                                            <Button variant="ghost" className="h-8 px-2 hover:bg-transparent pr-0" onClick={() => handleSort('name')}>
                                                المستخدم
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right">
                                            <Button variant="ghost" className="h-8 px-2 hover:bg-transparent pr-0" onClick={() => handleSort('status')}>
                                                الحالة
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right">
                                            <Button variant="ghost" className="h-8 px-2 hover:bg-transparent pr-0" onClick={() => handleSort('is_verified')}>
                                                التوثيق
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right">طلب التوثيق</TableHead>
                                        <TableHead className="text-right whitespace-nowrap">
                                            <Button variant="ghost" className="h-8 px-2 hover:bg-transparent pr-0" onClick={() => handleSort('created_at')}>
                                                التاريخ
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-left w-20">إجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedUsers.map(user => {
                                        const isBanned = user.status === 'banned';
                                        const pendingVerification = user.verifications?.[0];

                                        return (
                                            <TableRow
                                                key={user.id}
                                                className={`${pendingVerification ? 'bg-yellow-50/50 dark:bg-yellow-950/10' : ''} group`}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedUsers.includes(user.id)}
                                                        onCheckedChange={(checked) => handleSelectUser(user.id, checked)}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <Link href={`/@${user.username}`} className="hover:underline font-semibold text-sm">
                                                                {user.name}
                                                            </Link>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground font-mono" dir="ltr">@{user.username}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {isBanned ? (
                                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive flex items-center w-fit gap-1">
                                                            <Ban className="w-2.5 h-2.5" />
                                                            محظور
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 flex items-center w-fit gap-1">
                                                            نشط
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {user.is_verified ? (
                                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary flex items-center w-fit gap-1">
                                                            <Check className="w-2.5 h-2.5" />
                                                            موثق
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground flex items-center w-fit gap-1">
                                                            غير موثق
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {pendingVerification ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600">
                                                                معلق
                                                            </span>
                                                            <a
                                                                href={pendingVerification.gist_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-primary hover:underline"
                                                            >
                                                                <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                            <div className="flex gap-1">
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="h-6 w-6 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleVerificationAction(pendingVerification.id, 'approve');
                                                                    }}
                                                                >
                                                                    <Check className="w-3 h-3" />
                                                                </Button>
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleVerificationAction(pendingVerification.id, 'reject');
                                                                    }}
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground font-mono">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground">
                                                    {new Date(user.created_at).toLocaleDateString('ar-SY')}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" dir="rtl">
                                                                {user.is_verified ? (
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleUserAction(
                                                                            user.id,
                                                                            'unverify',
                                                                            'إلغاء التوثيق',
                                                                            'هل تريد إلغاء توثيق هذا المستخدم؟'
                                                                        )}
                                                                    >
                                                                        <ShieldOff className="ml-2 h-4 w-4" />
                                                                        إلغاء التوثيق
                                                                    </DropdownMenuItem>
                                                                ) : (
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleUserAction(
                                                                            user.id,
                                                                            'verify',
                                                                            'توثيق المستخدم',
                                                                            'هل تريد توثيق هذا المستخدم؟'
                                                                        )}
                                                                    >
                                                                        <ShieldCheck className="ml-2 h-4 w-4" />
                                                                        توثيق
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuSeparator />
                                                                {isBanned ? (
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleUserAction(
                                                                            user.id,
                                                                            'unban',
                                                                            'إلغاء الحظر',
                                                                            'هل تريد إلغاء حظر هذا المستخدم؟'
                                                                        )}
                                                                    >
                                                                        <Check className="ml-2 h-4 w-4" />
                                                                        إلغاء الحظر
                                                                    </DropdownMenuItem>
                                                                ) : (
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleUserAction(
                                                                            user.id,
                                                                            'ban',
                                                                            'حظر المستخدم',
                                                                            'هل تريد حظر هذا المستخدم؟'
                                                                        )}
                                                                    >
                                                                        <Ban className="ml-2 h-4 w-4" />
                                                                        حظر
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() => handleUserAction(
                                                                        user.id,
                                                                        'delete',
                                                                        'حذف المستخدم',
                                                                        'هل تريد حذف هذا المستخدم نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.'
                                                                    )}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash2 className="ml-2 h-4 w-4" />
                                                                    حذف
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination links={users.links} />
                </div>
            </div>

            {/* Confirmation Dialog */}
            {confirmDialog.open && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setConfirmDialog({ open: false, title: '', description: '', onConfirm: null })}
                >
                    <div
                        className="bg-background p-6 rounded-lg shadow-lg max-w-md border"
                        dir="rtl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-right mb-2">{confirmDialog.title}</h3>
                        <p className="text-right text-muted-foreground mb-6">
                            {confirmDialog.description}
                        </p>
                        <div className="flex gap-2 justify-start">
                            <Button
                                onClick={(e) => {
                                    console.log('Confirm button clicked');
                                    e.stopPropagation();
                                    if (confirmDialog.onConfirm) {
                                        console.log('Executing onConfirm callback');
                                        confirmDialog.onConfirm();
                                    }
                                    setConfirmDialog({ open: false, title: '', description: '', onConfirm: null });
                                }}
                            >
                                تأكيد
                            </Button>
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    console.log('Cancel button clicked');
                                    e.stopPropagation();
                                    setConfirmDialog({ open: false, title: '', description: '', onConfirm: null });
                                }}
                            >
                                إلغاء
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

function StatCard({ title, value, icon: Icon, className = "", onClick, active = false }) {
    return (
        <Card
            className={`cursor-pointer transition-all hover:shadow-md ${active ? 'ring-2 ring-primary' : ''}`}
            onClick={onClick}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 text-muted-foreground ${className}`} />
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
