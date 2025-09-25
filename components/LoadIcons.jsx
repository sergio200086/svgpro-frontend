'use client';
import { useEffect, useState } from "react"
import CopyIcon from './Icons/CopyIcon.jsx'


function LoadIcons() {
    const [Icons, setIcons] = useState([]);

    useEffect(() => {
        const fetchIcons = async()=>{
            try {
                const response = await fetch('http://localhost:3001/icons/all-icons'); 
                const data = await response.json(); 
                setIcons(data); 
            } catch (error) {
                console.error('Error obtaining icons:', error);
            }
        }
    fetchIcons();
    }, []); 



  return (
    <div className="mt-20 grid grid-cols-6 gap-5 max-w-7xl mx-auto text-center" >
       {Icons.map((icon)=>{
            const copyToClipboard = () => {
            navigator.clipboard.writeText(icon.svgText)
                .then(() => alert(`SVG de "${icon.name}" copiado al portapapeles`))
                .catch((err) => console.error('Error al copiar:', err));
            };
            const svgHtml = icon.svgText
                .replace(/width="\d+"/, 'width="39"')
                .replace(/height="\d+"/, 'height="39"');
        return(
            <div key={icon.name} className="flex flex-col justify-cente items-center hover:bg-amber-50/10 rounded-lg transition-all duration-300">
                 <div className="flex justify-center items-center my-2" dangerouslySetInnerHTML={{__html: svgHtml}} ></div>    
                 <div className="mx-2 text-pretty" >{icon.text}</div>
                 <button onClick={copyToClipboard} className="flex justify-center items-center text-lime-100/80 cursor-pointer my-2 hover:bg-neutral-200/20 rounded-lg transition-all duration-300" title="Copy to clipboard">
                    <CopyIcon className="size-5 m-2" /> 
                    <p className="mx-1.5  leading-none" >Copy SVG</p>
                 </button>
            </div>
        )})}
    </div>

  )
}

export default LoadIcons;