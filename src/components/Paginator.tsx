"use client"
import {Pagination} from "@mui/material";
import {useRouter} from "next/navigation";

export function Paginator({page, totalCount, size}: {page: number, totalCount: number, size: number}) {
    const router = useRouter();
    const handlePageChange = (event: any, page: number) => {
        router.push(`/?page=${page}`);
    }
    return <Pagination
        count={Number(Math.ceil(totalCount / size))}
        page={Number(page || 1)}
        onChange={handlePageChange}
        color="primary"
    />
}
