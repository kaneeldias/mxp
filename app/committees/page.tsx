"use client"

import {
    CircularProgress,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import {Paging} from "../_types/MemberTypes";
import styled from "@mui/material/styles/styled";
import React, {SyntheticEvent, useEffect, useState} from "react";
import Search from "@mui/icons-material/Search";
import Link from 'next/link'
import {Committee, CommitteesResponse} from "@/app/_types/CommitteeTypes";
import CommitteeListData from "@/app/committees/CommitteeListData";

const StyledTableContainer = styled(TableContainer)(() => ({
    "& .MuiPaper-root": {
        borderRadius: 0,
        boxShadow: "none"
    }
}));

const StyledTable = styled(Table)(() => ({
    "& .MuiTableCell-root": {
        padding: 15,
        border: "none"
    }
}));

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        color: "rgba(0,0,0,0.7)",
        fontWeight: "bold",
        borderBottomWidth: "1px",
        borderBottomColor: "rgba(0,0,0,0.2)",
        borderBottomStyle: "solid",
        fontSize: 18
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16
    }
}));

const StyledTableRow = styled(TableRow)(() => ({
    "&:hover": {
        backgroundColor: "#EEEEEE"
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0
    }
}));

const getCommittees = async (
    searchValue: string,
    page: number,
    signal: AbortSignal
): Promise<CommitteesResponse> => {

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/committee`);
    url.searchParams.set("page", page.toString());
    if (searchValue && searchValue !== "") {
        url.searchParams.set("search", searchValue);
    }

    const query = await fetch(url.toString(), {signal});
    return await query.json();
};

export default function Members() {
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [pagingInfo, setPagingInfo] = useState<Paging>()
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [fetchTimeout, setFetchTimeout] = useState<NodeJS.Timeout | null>(null);
    const abortController = new AbortController();

    useEffect(() => {
        return () => {
            abortController.abort(); // Abort the ongoing fetch request on component unmount
            if (fetchTimeout) {
                clearTimeout(fetchTimeout); // Clear the fetch timeout if component unmounts before 1 second
            }
        };

    }, []);

    useEffect(() => {
        fetchMembers();
    }, [searchValue, page]); // Trigger fetchMembers whenever searchValue changes


    const fetchMembers = async () => {
        setIsLoading(true);
        if (fetchTimeout) {
            clearTimeout(fetchTimeout); // Clear the previous fetch timeout
        }

        const timeout = setTimeout(async () => {
            try {
                const committeesResponse: CommitteesResponse = await getCommittees(searchValue, page, abortController.signal);
                setCommittees(committeesResponse.data);
                setPagingInfo(committeesResponse.paging)
            } catch (error) {
                console.error("Error fetching committee:", error);
            }
            setIsLoading(false);
        }, 500);

        setFetchTimeout(timeout); // Store the new fetch timeout
    };

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setSearchValue(event.target.value);
    };

    const handlePageChange = (event: SyntheticEvent, newPage: number) => {
        setPage(newPage + 1);
    };

    return (
        <>
            <CommitteeListData/>

            <div className="m-10">
                <span className="text-3xl font-bold text-gray-700 mb-10">Committees</span>
            </div>

            <div className="m-10">

                <div className="mb-5">
                    <TextField
                        id="committee-search"
                        placeholder={"Search"}
                        variant="outlined"
                        onChange={handleSearchChange}
                        size={"small"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>

                <StyledTableContainer className="max-h-[700px]">
                    <StyledTable sx={{maxHeight: 100}} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className="w-1/12 hidden md:block">ID</StyledTableCell>
                                <StyledTableCell className="w-1/3">Name</StyledTableCell>
                                <StyledTableCell className="w-1/3">Nation</StyledTableCell>
                                <StyledTableCell className="w-1/3">Type</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading &&
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row" colSpan={4}>
                                        <div className="flex justify-center items-center">
                                            <CircularProgress/>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            }

                            {!isLoading && committees.length == 0 &&
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row" colSpan={4}>
                                        <div className="flex justify-center items-center">
                                            No results found
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            }

                            {!isLoading && committees.length > 0 &&
                                committees.map((committee: Committee) => (
                                    <StyledTableRow
                                        key={committee.id}
                                        sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                    >
                                        <StyledTableCell className="hidden md:block">
                                            <Link href={`/committees/${committee.id}`}>{committee.id}</Link>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Link href={`/committees/${committee.id}`}>{committee.full_name}</Link>
                                        </StyledTableCell>
                                        <StyledTableCell>{committee.address_detail && committee.address_detail.country}</StyledTableCell>
                                        <StyledTableCell>{committee.tag}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </StyledTable>
                </StyledTableContainer>

                {pagingInfo && !isLoading && pagingInfo.total_items > 0 &&
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={(pagingInfo?.total_items)}
                        rowsPerPage={10}
                        page={pagingInfo?.current_page - 1}
                        // @ts-ignore
                        onPageChange={handlePageChange}
                    />
                }

            </div>
        </>
    );
}
