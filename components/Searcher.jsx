'use client'
import React, {useState, useEffect} from "react"
import {useDebounce} from "../Hooks/useDebounce"

const SvgRenderer = ({ svgCode, name }) => {
  const svgHtml = svgCode.svgText
                .replace(/width="\d+"/, 'width="45"')
                .replace(/height="\d+"/, 'height="45"');
    return (
        <div 
            aria-label={`Icon ${name}`}
            dangerouslySetInnerHTML={{ __html: svgHtml }} 
            className="flex items-center" 
        />
    );
}

const API_BASE_URL = 'http://localhost:3001/icons/all-icons';

function Searcher({className=""}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [logos, setLogos] = useState([])
  const [isLoading, setIsLoading] = useState (false)
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 

  useEffect (()=>{
    const fetchLogos = async ()=>{
      setIsLoading(true)

      const query = debouncedSearchTerm.trim()

      try{
        const apiUrl = `${API_BASE_URL}?q=${query}`;
        const response = await fetch(apiUrl); 
        if (!response.ok) throw new Error(`Error in the API: ${response.statusText}`)
        const data = await response.json();

        console.log(data)

        setLogos(data || [])
      } catch(error) {
        console.error("Something went wrong: ", error)
        setLogos([])
      } finally {
        setIsLoading(false)
      }
    };
    fetchLogos()
  }, [debouncedSearchTerm]);
  
  return (
    <div className=" ">
      <div className={`${className}flex items-center mt-10 mx-130  bg-[#0f172a] py-2 px-3 rounded-lg shadow-md border border-slate-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-500 focus-within:border-slate-500 transition-all duration-300`}>
        <svg  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
        <input 
        type="text" 
        placeholder="Search SVG..." 
        className="flex-grow bg-transparent  text-white placeholder-gray-400 outline-none  px-4 py-2"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && (
          <div className="mt-10 text-xl text-blue-400">Cargando...</div>
      )}
      {!isLoading && logos.length > 0 && (
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-5 max-w-7xl mx-auto text-center">
            {logos.map((logo) => (
                <div 
                    key={logo.name} 
                    className="flex flex-col items-center justify-center p-4  bg-[#1b2a4e] rounded-xl shadow-lg cursor-pointer hover:bg-[#2c3d63] transition-colors group"
                >
                    <SvgRenderer svgCode={logo} name={logo.text} />
                    <p className="flex items-center justify-center mt-2 text-gray-300">{logo.text}</p>

                    
                </div>
            ))}
        </div>
      )}
      
      {!isLoading && logos.length === 0 && searchTerm.length > 0 && (
          <p className="mt-10 text-xl text-gray-500">
              No encontramos "{searchTerm}".
          </p>
      )}

      {!isLoading && logos.length === 0 && searchTerm.length === 0 && (
            <p className="mt-10 text-xl text-gray-500">
                Escribe para empezar a buscar tus logos.
            </p>
      )}

    </div>
  )
}


export default Searcher