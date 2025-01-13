import Header from "../components/Header/Header";
import ButtonAdd from "../components/ButtonAdd/ButtonAdd";
import ButtonList from "../components/ButtonList/ButtonList";
import Footer from "../components/Footer/Footer";

function Home() {
    return (
        <div>
            <div className="button-container">
                <ButtonList/>
                <ButtonAdd/>
            </div>
           
            <Header/>
            <Footer/>
            
        </div>
    
    )
}

export default Home;