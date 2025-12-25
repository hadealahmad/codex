import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomPagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                {links.map((link, index) => {
                    // Skip 'Previous' and 'Next' links to handle them separately or specifically
                    if (index === 0) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href={link.url || '#'}
                                    className={!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                                    preserveState
                                />
                            </PaginationItem>
                        );
                    }

                    if (index === links.length - 1) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href={link.url || '#'}
                                    className={!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                                    preserveState
                                />
                            </PaginationItem>
                        );
                    }

                    // Handle ellipsis
                    if (link.label === '...') {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href={link.url}
                                isActive={link.active}
                                preserveState
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
