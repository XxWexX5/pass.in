import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

import { IconButton } from './IconButton';

import Table from './Table';
import { ChangeEvent, useEffect, useState } from 'react';
// import { attendeesData } from '../data/attendees';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

interface AttendeeType {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}

export function AttendeeList() {
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString());

        if( url.searchParams.has('search') ) {
            return url.searchParams.get('search') || ''
        }

        return '';
    });
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString());

        if( url.searchParams.has('page') ) {
            return Number(url.searchParams.get('page'))
        }

        return 1;
    });

    const [total, setTotal] = useState(0);
    const [attendees, setAttendees] = useState<AttendeeType[]>([]);

    const totalPages = Math.ceil(total / 10);

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees');
    
        url.searchParams.set('pageIndex', String(page - 1));

        if( search.length > 0 ) {
            url.searchParams.set('query', search);
        }

        fetch(url)
            .then((response) => response.json())
            .then(data => {
                setAttendees(data.attendees);
                setTotal(data.total);
            })
    }, [page, search]);

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setCurrentPage(1);

        return setCurrentSearch(event.target.value);
    }

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString());

        url.searchParams.set('search', search);

        window.history.pushState({}, "", url);

        return setSearch(search);
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString());

        url.searchParams.set('page', String(page));

        window.history.pushState({}, "", url);

        return setPage(page);
    }

    function goToNextPage() {
        return setCurrentPage(page + 1);
    }

    function goToPreviousPage() {
        return setCurrentPage(page - 1)
    }

    function goTototalPages() {
        return setCurrentPage(totalPages);
    }

    function goToFirstPage() {
        return setCurrentPage(1);
    }

    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>

                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className='size-4' />

                    <input 
                        value={search}
                        className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
                        placeholder="Buscar participantes..."
                        onChange={ handleSearch }
                    />
                </div>
            </div>

            <div className='border border-white/10 rounded-lg  min-w-[60rem] md:overflow-auto'>
                <Table.Root>
                    <Table.Head>
                        <Table.Row className='border-b border-white/10'>
                            <Table.Header className='w-[48px]'>
                                <input 
                                    type="checkbox"
                                    className='size-4 bg-black/20 rounded border-white/10'
                                />
                            </Table.Header>
                            <Table.Header>Código</Table.Header>
                            <Table.Header>Participante</Table.Header>
                            <Table.Header>Data de inscrição</Table.Header>
                            <Table.Header>Data do check-in</Table.Header>
                            <Table.Header className='w-[64px]'></Table.Header>
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {
                            attendees.map((attendee: AttendeeType) => {
                                return (
                                    <Table.Row key={attendee.id} className='border-b border-white/10 hover:bg-white/5'>
                                        <Table.Ceel>
                                            <input 
                                                type='checkbox'
                                                className='size-4 bg-black/20 rounded border-white/10'
                                            />
                                        </Table.Ceel>
                                        <Table.Ceel>{ attendee.id }</Table.Ceel>
                                        <Table.Ceel>
                                            <div className='flex flex-col gap-1'>
                                                <span className='font-semibold text-white'>{ attendee.name }</span>
                                                <span>{ attendee.email }</span>
                                            </div>
                                        </Table.Ceel>
                                        <Table.Ceel>{ dayjs().to(attendee.createdAt) }</Table.Ceel>
                                        <Table.Ceel>{ attendee.checkedInAt === null ? <span className='text-zinc-400'>Não fez check-in</span> : dayjs().to(attendee.checkedInAt) }</Table.Ceel>
                                        <Table.Ceel>
                                            <IconButton className='bg-black/20'>
                                                <MoreHorizontal className='size-4' />
                                            </IconButton>
                                        </Table.Ceel>
                                    </Table.Row>
                                );
                            })
                        }
                    </Table.Body>

                    <Table.Foot>
                        <Table.Row>
                            <Table.Ceel colSpan={3}>
                                Mostrando { attendees.length } de { total } itens
                            </Table.Ceel>

                            <Table.Ceel 
                                className='text-right'
                                colSpan={3}
                            >
                                <div className='inline-flex items-center gap-8'>
                                    Página { page } de { totalPages }

                                    <div className='flex gap-1.5'>
                                        <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                            <ChevronsLeft className='size-4' />
                                        </IconButton>

                                        <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                            <ChevronLeft className='size-4' />
                                        </IconButton>

                                        <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                            <ChevronRight className='size-4' />
                                        </IconButton>

                                        <IconButton onClick={goTototalPages} disabled={page === totalPages}>
                                            <ChevronsRight className='size-4' />
                                        </IconButton>
                                    </div>
                                </div>
                            </Table.Ceel>
                        </Table.Row>
                    </Table.Foot>
                </Table.Root>
            </div>
        </div>
    );
    
}