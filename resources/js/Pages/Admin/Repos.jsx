import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, GitBranch, CheckCircle, ExternalLink, Star, Trash2, ArrowUpDown, Search, X } from 'lucide-react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Pagination from '@/components/Pagination.jsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Repos({ repos, stats, filters }) {
    const [deleteDialog, setDeleteDialog] = useState({ open: false, repoId: null });
    const [search, setSearch] = useState(filters.search || '');
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/repos', { search, per_page: filters.per_page }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handlePerPageChange = (newPerPage) => {
        router.get('/admin/repos', { search, per_page: newPerPage }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedRepos = [...repos.data].sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aValue, bValue;

        if (sortConfig.key === 'owner') {
            aValue = a.user.name.toLowerCase();
            bValue = b.user.name.toLowerCase();
        } else {
            aValue = a[sortConfig.key];
            bValue = b[sortConfig.key];
            if (typeof aValue === 'string') aValue = aValue.toLowerCase();
            if (typeof bValue === 'string') bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleDelete = (repoId) => {
        router.delete(`/admin/repos/${repoId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تم حذف المشروع بنجاح.');
                setDeleteDialog({ open: false, repoId: null });
            },
        });
    };

    return (
        <Layout>
            <Head title="إدارة المشاريع" />

            <div>
                <h1 className="text-3xl font-bold mb-8">إدارة المشاريع</h1>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatCard
                        title="المستخدمين"
                        value={stats.users}
                        icon={Users}
                        onClick={() => router.visit('/admin/dashboard')}
                    />
                    <StatCard
                        title="المنشورات"
                        value={stats.posts}
                        icon={FileText}
                        onClick={() => router.visit('/admin/posts')}
                    />
                    <StatCard
                        title="المشاريع"
                        value={stats.repos}
                        icon={GitBranch}
                        active={true}
                    />
                    <StatCard
                        title="طلبات التوثيق"
                        value={stats.pending_verifications}
                        icon={CheckCircle}
                        className="text-yellow-600"
                        onClick={() => router.visit('/admin/dashboard')}
                    />
                </div>

                {/* Projects Table */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold">جميع المشاريع ({stats.repos})</h2>

                        {/* Search Box */}
                        <form onSubmit={handleSearch} className="relative max-w-sm w-full">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="بحث في المشاريع..."
                                className="pr-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        router.get('/admin/repos', { search: '' }, {
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
                    </div>

                    {repos.data.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground bg-card border rounded-lg">
                            لا توجد مشاريع
                        </div>
                    ) : (
                        <div className="border rounded-lg bg-card overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">
                                            <Button variant="ghost" className="h-8 px-2 hover:bg-transparent pr-0" onClick={() => handleSort('name')}>
                                                المشروع
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right">
                                            <Button variant="ghost" className="h-8 px-2 hover:bg-transparent pr-0" onClick={() => handleSort('owner')}>
                                                المالك
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right">اللغة</TableHead> {/* Kept language column as non-sortable */}
                                        <TableHead className="text-center">
                                            <Button variant="ghost" className="h-8 px-2 hover:bg-transparent pr-0" onClick={() => handleSort('stars')}>
                                                النجوم
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right whitespace-nowrap">
                                            <Button variant="ghost" className="h-8 px-2 hover:bg-transparent pr-0" onClick={() => handleSort('created_at')}>
                                                التاريخ
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-left w-24">الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedRepos.map(repo => (
                                        <TableRow key={repo.id} className="group">
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <a
                                                            href={repo.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline font-semibold text-sm"
                                                        >
                                                            {repo.name}
                                                        </a>
                                                        {repo.is_own_repo && (
                                                            <Badge variant="secondary" className="text-[10px] h-4">خاص</Badge>
                                                        )}
                                                    </div>
                                                    {repo.description && (
                                                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
                                                            {repo.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/@${repo.user.username}`}
                                                    className="hover:underline flex items-center gap-2"
                                                >
                                                    <span className="text-sm">{repo.user.name}</span>
                                                    <span className="text-xs text-muted-foreground" dir="ltr">
                                                        @{repo.user.username}
                                                    </span>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {repo.language ? (
                                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary">
                                                        {repo.language}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground text-xs font-mono">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-1 text-yellow-500 text-xs">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    <span>{repo.stars || 0}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {new Date(repo.created_at).toLocaleDateString('ar-SY')}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 justify-end">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        asChild
                                                    >
                                                        <a href={repo.url} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                                        onClick={() => setDeleteDialog({ open: true, repoId: repo.id })}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination links={repos.links} />
                </div>
            </div>

            {/* Delete Confirmation */}
            {deleteDialog.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteDialog({ open: false, repoId: null })}>
                    <div className="bg-background p-6 rounded-lg shadow-lg max-w-md" dir="rtl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-right mb-4">تأكيد الحذف</h3>
                        <p className="text-right text-muted-foreground mb-6">
                            هل أنت متأكد من حذف هذا المشروع؟ هذا الإجراء لا يمكن التراجع عنه.
                        </p>
                        <div className="flex gap-2 justify-start">
                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(deleteDialog.repoId)}
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
