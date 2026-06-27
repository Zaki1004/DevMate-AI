const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold">DevMate AI</h1>

          <p className="text-xs text-gray-500">AI Assistant for Developers</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
