"use client"
import {Pagination} from "@mui/material";
import {useRouter} from "next/navigation";

export function Paginator({page, totalPages, size}: {page: number, totalPages: number, size: number}) {
    const router = useRouter();
    const handlePageChange = (event: any, page: number) => {
        router.push(`/?page=${page}`);
    }

    return <Pagination
        count={Number(Math.floor(totalPages / size))}
        page={Number(page || 1)}
        onChange={handlePageChange}
        color="primary"
    />
}
