import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LuLoader } from "react-icons/lu";
import {useDispatch , useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import {Menu,Search_input,Facture_PDF,Style} from '../index'
import {getAll} from '../../Redux/API/GetAll'
import { PDFDownloadLink,pdf } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import { MdVisibility } from "react-icons/md";

const Facture_Service = () => {

    const [Search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [Rapport,setRapport] = useState([])

    const dispatch = useDispatch();
    const FactureServiceList = useSelector(state => state.FactureServiceList.FactureServiceList);
    const isLoading = useSelector(state => state.FactureServiceList.isLoading)

    useEffect(()=>{
        dispatch(getAll("https://jsonplaceholder.typicode.com/users")).then(response => {
        console.log(response);})
        //dispatch(getAll("http://127.0.0.1:8000/api/factures_service/"));
    },[dispatch]);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        // console.log(id)
        fetch("http://127.0.0.1:8000/api/facture_service/rapport/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (Array.isArray(result)) {
                    setRapport(result);
                } else {
                    setRapport([result]);
                }
                console.log(result)
            }) //set the data
            .catch((error) => {
                console.error(error);
                setRapport([]);
            });
    }, []);
    console.log("###########"+FactureServiceList)
    const viewPDF = async (id) => {
        const doc = <Facture_PDF  id={id} />;
        const asPdf = pdf([]);
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        const pdfURL = URL.createObjectURL(blob);
        window.open(pdfURL);
    };

    return (
        <>
        <Menu/>
            <div>
            <h1 className="text-[--statistic-color] p-4 sm:text-3xl
                                md:text-5xl lg:text-7xl
                            ">
                    Facture Service:
                </h1>
                <Search_input
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Style>
                <CSVLink data={Rapport} className='py-1 px-2 border-none  rounded-md bg-[--statistic-color] my-3
                                    hover:bg-[--light-color] sm:text-xs sm:ml-[70%]
                                    md:text-sm md:ml-[71%] lg:text-2xl lg:ml-[70%]
                                    2xl:text-3xl
                                    '>Rapport
                </CSVLink>
                <button className='py-1 px-2 border-none ml-2  rounded-md bg-[--statistic-color] my-3
                                    hover:bg-[--light-color] sm:text-xs
                                    md:text-sm  lg:text-2xl
                                    2xl:text-3xl
                                    '>
                    <a href="/AddFact" className='font-semibold'>Ajouter +</a>
                </button>
                </Style>

                <table className="ml-5  mt-4 sm:mr-4 xl:mr-8">
                    <thead className='bg-[--statistic-color] text-white font-semibold
                                        sm:text-[10px] md:text-xl lg:text-2xl
                                        xl:text-3xl 2xl:text-4xl
                                    '>
                        <tr className="m-2 text-center">
                            <th scope="col" className='py-2 px-4'>id</th>
                            <th scope="col" className='py-2 px-4'>Non du client</th>
                            <th scope="col" className='py-2 px-4'>Date de comptabilisation</th>
                            <th scope="col" className='py-2 px-4'>Date d'echeance</th>
                            <th scope="col" className='py-2 px-4'>Etat</th>
                            <th scope="col" className='py-2 px-4'>Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {
                            isLoading ?
                            <tr>
                                <td class="d-flex align-items-center text-primary md:text-2xl lg:text-3xl">
                                <strong>Loading...</strong>
                                <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                                </td>
                            </tr>
                            :
                        FactureServiceList
                        .filter((Facture) => {
                            return Search.toLowerCase() === ''
                                ? Facture
                                :
                                Facture.client.toLowerCase().includes(Search)
                        })
                        .map((Facture) => (
                            <tr key={Facture.id} className="shadow-md sm:text-[10px] md:text-xs lg:text-xl xl:text-2xl 2xl:text-3xl">
                                <td className="pl-6">{Facture.id}</td>
                                <td className="p-3 ">{Facture.client}</td>
                                <td>{Facture.date_comptabilisation}</td>
                                <td>{Facture.date_decheance}</td>
                                <td>{Facture.non_payée}</td>
                                {/* <td className="pl-6">{Facture.id}</td>
                                <td className="p-3 ">John Doe</td>
                                <td>20/02/2020</td>
                                <td>12/04/2021</td>
                                <td>false</td> */}
                                <td>
                                    <button className='border-none ml-1 px-1 py-1 bg-[--statistic-color]
                                                                    sm:text-sm md:text-xl lg:text-2xl
                                                                    xl:text-3xl 2xl:text-4xl'>
                                        <Link to={`/Facture_Service_Info/${Facture.id}`}>
                                            <IoMdInformationCircleOutline />
                                        </Link>
                                    </button>
                                    <button className='border-none ml-1 px-1 py-1 bg-[--statistic-color]
                                                                    sm:text-sm md:text-xl lg:text-2xl
                                                                    xl:text-3xl 2xl:text-4xl'>
                                        { <PDFDownloadLink document={<Facture_PDF id={Facture.id}/>} fileName="Facture_Service.pdf" >
                                                <FaDownload />
                                        </PDFDownloadLink> }
                                    </button>
                                    <button className='border-none ml-1 px-1 py-1 bg-[--statistic-color]
                                                                    sm:text-sm md:text-xl lg:text-2xl
                                                                    xl:text-3xl 2xl:text-4xl'
                                                                    onClick={() => viewPDF(Facture.id)}>
                                        <a href="#"><MdVisibility /></a>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Facture_Service