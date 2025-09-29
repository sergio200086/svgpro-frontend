
function Header({className =""}) {
  return (
    <header className="my-4.5">
        <div className="flex items-center justify-end md:justify-between mx-auto max-w-screen-xl px-4">
          <h1 className="px-2">LOGO SVGPRO</h1>

          <nav className= {`flex text-center ${className}`}>
              <ul className="flex gap-x-1 md:gap-x-5">
                  <li>
                    <a href="#" className="transition hover:text-gray-500/75  dark:hover:text-amber-200/85">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-gray-500/75  dark:hover:text-amber-200/85">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-gray-500/75  dark:hover:text-amber-200/85">
                      Upload
                    </a>
                  </li>
                  
              </ul>
          </nav>  
        </div>
    </header>
    
  )
}

export default Header;