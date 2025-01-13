import Header from "../components/Header/Header";
import ButtonAdd from "../components/ButtonAdd/ButtonAdd";
import ButtonList from "../components/ButtonList/ButtonList";


function Home() {
    return (
        <div>
            <ButtonList/>
            <ButtonAdd/>
            <Header/>
        </div>
    
    )
}

export default Home;