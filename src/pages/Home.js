import Header from "../components/Header/Header";
import ButtonAdd from "../components/ButtonAdd/ButtonAdd";
import Footer from "../components/Footer/Footer";

function Home() {
    return (
        <div>
            <div className="button-container">
                <ButtonAdd/>
            </div>
           
            <Header/>
            <Footer/>
            
        </div>
    
    )
}

export default Home;