import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {Info,Menu,Style,Nav_Item,Nav_Table} from "../index"
import { FaCircleDollarToSlot } from "react-icons/fa6";
import {Link} from "react-router-dom"
import { useState ,useEffect} from "react";

const Avoires_Service_Info = () => {
    const [openTable, setOpenTable] = useState(null);
    const [Factures, setFactures] = useState();
    const [Avoires, setAvoires] = useState();


    const handleToggleTable = (table) => {
        setOpenTable(prevTable => (prevTable === table ? null : table));
    }

    const { id } = useParams();
    const Id = parseInt(id);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        console.log(id)
        fetch(`http://127.0.0.1:8000/api/avoir_service/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result)
                setAvoires(result);
                // console.log(result)
            }) //set  the data

            .catch((error) => console.error(error));
        }, []);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        console.log(id)
        fetch(`http://127.0.0.1:8000/api/avoir_vente/${Id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (Array.isArray(result)) {
                    setFactures(result);
                } else {
                    setFactures([result]);
                }
                console.log(result)
            }) //set the data
            .catch((error) => {
                console.error(error);
                setFactures([]);
            });
    }, [id]);
    return (

            <div >
                <Style>
                    <Menu/>
                    <div>
                <h2 className="shadow-lg p-3 text-[#071F90] m-3 sm:text-[20px] md:text-2xl lg:text-2xl xl:text-4xl 2xl:text-5xl">
                    <b>Les informations d'avoire :</b>
                </h2>
                <div>
                    <Nav_Item onClick={() => handleToggleTable('Factures')}
                        label="Factures" />
                        {openTable === 'Factures' && (
                            <Nav_Table API={Factures} />)}
                </div>
                <div className="md:flex">
                <div className="shadow-lg rounded-xl p-3 m-3  sm:text-[15px] md:text-sm lg:text-lg xl:text-2xl 2xl:text-4xl">
                <Info name="ID : " API={Avoires.client}/>
                    <Info name="Avoire id : " API={Avoires.avoir_id}/>
                    <Info name="ligne de commande : " API={Avoires.commande_ligne}/>
                </div>

                <div className="shadow-lg rounded-xl p-3 m-3  sm:text-[15px] md:text-sm lg:text-lg xl:text-2xl 2xl:text-4xl">
                <Info name="Date de creation : " API={Avoires.date_creation}/>
                    <Info name="Date de comptabilisation : " API={Avoires.date_comptabilisation}/>
                    <Info name="Date d'echeance: " API={Avoires.date_decheance}/>
                    <Info name="Montant : " API={Avoires.montant}/>
                </div>
                </div>

                <div className="shadow-lg rounded-xl p-3 m-3  sm:text-[15px] md:text-sm lg:text-lg xl:text-2xl 2xl:text-4xl">
                    <Info name="Etat : " API={Avoires.non_payee}/>
                </div>

                </div>

                </Style>
        </div>

    );
};

export default Avoires_Service_Info;
