export default function AddProjectButton({ children, toggleModal }) {
  return (
    <div className='content-center text-center '>
      <button
        className='px-4 py-2 mx-auto text-xl font-medium transition-all duration-300 shadow-md cursor-pointer text-custom-blue outline rounded-xl bg-amber-200 hover:scale-98 hover:outline hover:text-black hover:outline-black shadow-custom-blue hover:shadow-lg'
        onClick={toggleModal}
      >
        {children}
      </button>
    </div>
  );
}
