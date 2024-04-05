import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import { IconButton } from './IconButton';

import { Table } from './Table';

export function AttendeeList() {
    return(
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>

                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className='size-4' />

                    <input 
                        className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
                        placeholder="Buscar participantes..."
                    />
                </div>
            </div>

            <div className='border border-white/10 rounded-lg'>
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
                            Array.from({ length: 8 }).map((_, i) => {
                                return (
                                    <Table.Row key={i} className='border-b border-white/10 hover:bg-white/5'>
                                        <Table.Ceel>
                                            <input 
                                                type='checkbox'
                                                className='size-4 bg-black/20 rounded border-white/10'
                                            />
                                        </Table.Ceel>
                                        <Table.Ceel>12383</Table.Ceel>
                                        <Table.Ceel>
                                            <div className='flex flex-col gap-1'>
                                                <span className='font-semibold text-white'>Wevison Ramalho Silva</span>
                                                <span>wevisonramalho@gmail.com</span>
                                            </div>
                                        </Table.Ceel>
                                        <Table.Ceel>7 dias atrás</Table.Ceel>
                                        <Table.Ceel>3 dias atrás</Table.Ceel>
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
                                Mostrando 10 de 228 itens
                            </Table.Ceel>

                            <Table.Ceel 
                                className='text-right'
                                colSpan={3}
                            >
                                <div className='inline-flex items-center gap-8'>
                                    Página 1 de 23

                                    <div className='flex gap-1.5'>
                                        <IconButton>
                                            <ChevronsLeft className='size-4' />
                                        </IconButton>

                                        <IconButton>
                                            <ChevronLeft className='size-4' />
                                        </IconButton>

                                        <IconButton>
                                            <ChevronRight className='size-4' />
                                        </IconButton>

                                        <IconButton>
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