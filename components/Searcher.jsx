'use client'
import React, {useState, useEffect} from "react"
import {useDebounce} from "../Hooks/useDebounce"
import CopyIcon from './Icons/CopyIcon.jsx'


const copyToClipboard = (icon) => {
  navigator.clipboard.writeText(icon.svgText)
    .then(() => alert(`SVG de "${icon.text}" copiado al portapapeles`))
    .catch((err) => console.error('Error al copiar:', err));
};

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
          <div className="mt-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400 mx-auto"></div>
            <div className="mt-4 text-xl text-lime-400">Loading Icons...</div>
          </div>
      )}
      {!isLoading && logos.length > 0 && (
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-5 max-w-7xl mx-auto text-center">
            {logos.map((logo) => (
                <div 
                  key={logo.name} 
                  className="flex flex-col items-center justify-center p-4  bg-[#1b2a4e] rounded-xl shadow-lg border border-[#1b2a4e] hover:border-lime-500 transition-colors group duration-300"
                >
                  <SvgRenderer svgCode={logo} name={logo.text} />
                  <p className="flex items-center justify-center mt-2 text-gray-300">{logo.text}</p>
                  <button onClick={() => copyToClipboard(logo)} className="flex justify-center items-center bg-lime-500/10 text-lime-500 cursor-pointer my-2 hover:bg-lime-500/20 rounded-lg transition-all duration-300" title="Copy to clipboard">
                    <CopyIcon className="size-5 m-2" /> 
                    <p className="mx-1.5  leading-none" >Copy SVG</p>
                  </button>
                </div>
            ))}
            
        </div>
      )}

      
      
      {!isLoading && logos.length === 0 && searchTerm.length > 0 && (
          <p className="mt-10 text-xl text-gray-500">
              We didn't find "{searchTerm}".
              
          </p>
      )}

      {!isLoading && logos.length === 0 && searchTerm.length === 0 && (
            <p className="mt-10 text-xl text-gray-500">
                Write to start looking for tour icons.
            </p>
      )}

    </div>
  )
}


export default Searcher