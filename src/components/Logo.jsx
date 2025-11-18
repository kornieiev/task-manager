export default function Logo() {
  const hover =
    "hover:text-black/70 hover:border-t-0 hover:border-l-0 hover:border-b-4 hover:border-r-4 hover:animate-none hover:bg-blue-100 hover:border-black/70 transition-all duration-200";

  return (
    <div className='my-6 w-[200px] h-[100px] mx-auto'>
      <h1
        className={`animate-pulse-soft text-center bg-custom-blue font-audiowide text-[10px] wrap-break-word font-bold rounded-xl p-4 text-white hover:animate-none shadow-lg shadow-custom-blue`}
      >
        Task Manager
      </h1>
    </div>
  );
}
