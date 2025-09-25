function Searcher({className=""}) {
  return (
       <div className={`${className}flex items-center  mt-40 mx-150  bg-[#0f172a] py-2 px-3 rounded-lg shadow-md border border-slate-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-500 focus-within:border-slate-500 transition-all duration-300`}>
        <svg  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
        <input 
        type="text" 
        placeholder="Search SVG..." 
        className="flex-grow bg-transparent  text-white placeholder-gray-400 outline-none  px-4 py-2"
        />
       </div>
  )
}

export default Searcher