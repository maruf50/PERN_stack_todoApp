function Navbar() {
    return (
        <nav className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <ul className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <li><a className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">Home</a></li>
                <li><a className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">Contact</a></li>
                <li><a className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">Logout</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;