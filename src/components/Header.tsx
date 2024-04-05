import nlwUnitIcon from '../assets/nlw-unite-icon.svg'

import { NavLink } from './NavLink'

export function Header() {
    return(
        <header className='flex items-center gap-5 py-2'>
            <img src={nlwUnitIcon} alt="Logo NLW Unit" />

            <nav className='flex items-center gap-5'>
                <NavLink href="/eventos" className='text-zinc-300'>
                    Eventos
                </NavLink>
                
                <NavLink href="/participantes">
                    Participantes
                </NavLink>
            </nav>
        </header>
    );
}