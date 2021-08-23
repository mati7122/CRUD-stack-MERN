
import './Style.css';

function AddButton(props) {
    return (
        <div className="containerAddButton">
            <input id="addButton" type="button" value="Add user" onClick={props.Button} />
        </div>
    );
}

export default AddButton;