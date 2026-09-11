interface SidebarProps {
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export function Sidebar({ onClose, title, children }: SidebarProps) {
  return (
    <>
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/10 transition-opacity"
        onClick={onClose}
      ></div>
      <aside className="fixed top-0 right-0 w-md h-screen transition delay-100 duration-100 bg-white">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="border-0 border-transparent bg-transparent font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            X
          </button>
        </div>
        <div className="p-6">{children}</div>
      </aside>
    </>
  );
}
