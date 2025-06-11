import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logoAlume from '../assets/logo-alume.png';
import { AuthContext } from "../contexts/AuthContext";
import { SignOutIcon, UserCircleIcon } from "@phosphor-icons/react";

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);


  return (
    <header className="bg-white shadow sticky top-0 z-99">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* LOGO */}
        <div className="flex lg:flex-1">
          <Link to="/app" className="-m-1.5 p-1.5">
            <span className="sr-only">Alume</span>
            <img className="h-8 w-auto" src={logoAlume} alt="Logo" />
          </Link>
        </div>

        {/* Botão do menu mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu principal */}
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          <Link to="/app" className="text-sm font-semibold text-secondary hover:text-primary">Dashboard</Link>
          <Link to="/app/simulation" className="text-sm font-semibold text-secondary hover:text-primary">Simulação</Link>
          <Link to="/app/history" className="text-sm font-semibold text-secondary hover:text-primary">Histórico</Link>
                    
          <div onClick={() => logout()} className="flex flex-row gap-1 items-center justify-center text-sm font-semibold text-secondary hover:text-primary cursor-pointer">Sair <SignOutIcon size={16} /></div>
          
          <Link to="/app/profile" className="">
             <UserCircleIcon className="text-secondary hover:text-primary" size={32}/>
          </Link>

        </div>
      </nav>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-6 pb-6">
            <Link to="/app" className="block text-sm font-semibold text-secondary hover:text-primary">Dashboard</Link>
            <Link to="/app/simulation" className="block text-sm font-semibold text-secondary hover:text-primary">Simulação</Link>
            <Link to="/app/history" className="block text-sm font-semibold text-secondary hover:text-primary">Histórico</Link>
            <Link to="/app/profile" className="block text-sm font-semibold text-secondary hover:text-primary">Meu perfil</Link>
            <div onClick={() => logout()} className="flex flex-row gap-1 items-center text-sm font-semibold text-secondary hover:text-primary cursor-pointer">Sair <SignOutIcon size={16} /></div>
          </div>
        </div>
      )}
    </header>
  );
};
