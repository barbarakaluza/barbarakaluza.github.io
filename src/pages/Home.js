import Header from "../components/Header/Header";
import ButtonAdd from "../components/ButtonAdd/ButtonAdd";
import ButtonList from "../components/ButtonList/ButtonList";


function Home() {
    return (
        <div>
            <div className="button-container">
                <ButtonList/>
                <ButtonAdd/>
            </div>
           
            <Header/>
        </div>
    
    )
}

export default Home;