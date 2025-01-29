import image1 from './image-home.png';  
import image2 from './image-home-2.png';

function Header() {
    return (
        <div className="header-wrapper">
            <h1>Witaj!</h1>
            <h2 className="header">W Twojej książce kucharskiej 🧑‍🍳</h2>
            
            <div className="image-container">
                <img className="img" src={image1} alt="food 1" />
                <img className="img img2" src={image2} alt="food 2" />
            </div>

        </div>
         
    )
}

export default Header;