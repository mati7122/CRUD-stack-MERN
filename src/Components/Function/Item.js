// import '../Class/Style.css';
import './Style.css';

function Item(props) {

    return (
        <div className="containerDatos">
            <div>{props._id}</div>
            <div>{props.name}</div>
            <div>{props.email}</div>
            <div>{props.number}</div>
            <div>{props.location}</div>
            <div>
                <button id="deleteButton" className="buttons" onClick={props.buttonDelete} />
            </div>
            <div>
                <button id="updateButton" className="buttons" onClick={props.buttonUpdateShow} />
            </div>
        </div>
    );
}

export default Item;