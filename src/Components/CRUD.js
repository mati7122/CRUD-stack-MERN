import useSWR from 'swr';
import axios from "axios";

//Components
import User from "./User";
import Fields from "./Fields";
import AddButton from './AddButton';
import { Error, Load, NoData } from './DisplayElse';

//Functions
import { Add, Delete, Update } from './Functions';

//Stylesheet
import '../Style.css';

//URL
import Global from "../Global";

const uri = Global.url;

const fetcher = url => axios.get(uri + 'get-data').then(res => res.data.succes)

const CRUD = () => {
    const { data, error } = useSWR('get-data', fetcher)

    return (
        <div className="container">
            <AddButton Button={() => Add()} />
            <div className="container__table">
                <Fields />
                {error &&
                    <Error />
                }
                {!data && !error &&
                    <Load />
                }
                {data && data.length === 0 &&
                    <NoData />
                }
                {data && data.length >= 1 &&
                    <div className="center__data">
                        {
                            data.map(i => {
                                return <User _id={i._id} name={i.name} location={i.location} email={i.email} number={i.number} buttonDelete={() => Delete(i._id)} buttonUpdate={() => Update(i._id, i.name, i.email, i.number, i.location)} />
                            })
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default CRUD;