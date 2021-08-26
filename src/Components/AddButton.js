
function AddButton(props) {
    return (
        <div className="container__button">
            <input id="addButton" type="button" value="Add user" onClick={props.Button} />
        </div>
    );
}

export default AddButton;