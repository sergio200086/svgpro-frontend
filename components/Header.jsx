
function Header({className =""}) {
  return (
    <nav className= {`flex justify-evenly text-center ${className}`}>
        <h1 className="px-2">svgpro</h1>
        <ul className="flex gap-x-2">
            <li>Home</li>
            <li>Icons</li>
            <li>About</li>
        </ul>
    </nav>
  )
}

export default Header;