import AdminSidebar from "./AdminSidebar";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div id="main" className="grid h-screen">
      <header className="relative flex p-3 gap-4 justify-between align-items-baseline col-start-1 col-end-4 border-b border-solid border-gray-400 shadow z-10">
        <Nav />
      </header>
      <Sidebar />
      <main className="col-start-2 col-end-3 p-2 overflow-y-auto">
        {children}
      </main>
      <AdminSidebar />
      <footer className="bg-black text-white col-start-1 col-end-4 p-8 text-center">
        &copy; {new Date().getFullYear()} Jeremy Liberman
      </footer>
    </div>
  );
}
