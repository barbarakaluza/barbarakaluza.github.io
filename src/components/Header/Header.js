import image from './image-home.png';

function Header() {
    return (
        <div className="header-wrapper">
            <h1>Witaj!</h1>
            <h2 className="header">W Twojej książce kucharskiej 🧑‍🍳</h2>
            <img className="img" src={image} alt="food" />

        </div>
         
    )
}

export default Header;