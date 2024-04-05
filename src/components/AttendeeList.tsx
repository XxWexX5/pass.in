import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

import { IconButton } from './IconButton';

import Table from './Table';
import { ChangeEvent, useState } from 'react';
import { attendees } from '../data/attendees';

dayjs.extend(relativeTime);
dayjs.locale('pt-br')

export function AttendeeList() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(attendees.length / 10);

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        return setSearch(event.target.value)
    }

    function goToNextPage() {
        return setPage(page + 1)
    }

    function goToPreviousPage() {
        return setPage(page - 1)
    }

    function goTototalPages() {
        setPage(totalPages);
    }

    function goToFirstPage() {
        setPage(1);
    }

    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>

                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className='size-4' />

                    <input 
                        value={search}
                        className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
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
                            attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
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
                                        <Table.Ceel>{ dayjs().to(attendee.checkedInAt) }</Table.Ceel>
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
                                Mostrando 10 de { attendees.length } itens
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