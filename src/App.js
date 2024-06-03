import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import "./App.css"
import {Style,Log_in,Main,Nav,Client,AddClient,EditClient,Client_VIP,
    Facture_Service,Facture_Service_Info,Facture_vente,Paiment,Add_payment,FactureImpayees,
    Client_info,Facture_Vente_Info,ProtectedRouters,Admin,Avoires_Vente,Avoires_Service,Avoires,
    Edit_Facture,AddFact,Client_History,Avoire_Service_Info,Avoire_Vente_Info} from "./components/index"

const App = () => {
    return(
        <>
            <Router>
                <Style>
                    <Routes>
                        <Route path='/' element={<Log_in/>}/>

                        {/* <Route element={<ProtectedRouters/>}> */}
                            <Route path='/Main' element={<Main/>}/>
                            <Route path='/admin' element={<Admin/>}/>

                            <Route path='/client'    element={<Client/>} />
                            <Route path='/AddClient' element={<AddClient/>} />
                            <Route path='/Update/:id'    element={<EditClient/>}/>
                            <Route path='/Client_info/:id' element={<Client_info/>}/>
                            <Route path='/Client_Historique/:id' element={<Client_History/>}/>

                            <Route path='/client_VIP' element={<Client_VIP/>}/>

                            <Route path='/Facture_vente' element={<Facture_vente/>}/>
                            <Route path='/Facture_Vente_Info/:id' element={<Facture_Vente_Info/>} />
                            <Route path='/AddFact' element={<AddFact/>}/>

                            <Route path='/Facture_Service' element={<Facture_Service/>}/>
                            <Route path='/Facture_Service_Info/:id' element={<Facture_Service_Info/>}/>

                            <Route path='/Facture_Impayees' element={<FactureImpayees/>}/>

                            <Route path='/Paiment' element={<Paiment/>}/>
                            <Route path='/Add_payment/:id' element={<Add_payment/>}/>

                            <Route path='/avoires' element={<Avoires/>}/>
                            <Route path='/Edit_Facture/:id' element={<Edit_Facture/>}/>
                            <Route path="/avoires_vente" element={<Avoires_Vente/>}/>
                            <Route path="/avoires_service" element={<Avoires_Service/>}/>
                            <Route path='/avoire_Vente_Info/:id' element={<Avoire_Vente_Info/>}/>
                            <Route path='/avoire_Service_Info/:id' element={<Avoire_Service_Info/>}/>

                        {/* </Route> */}
                    </Routes>
                </Style>
            </Router>
        </>
    )
}

export default App