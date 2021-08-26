
// import './Style.css';

function User(props) {

    return (
        <div className="container__user">
            <div>{props._id}</div>
            <div>{props.name}</div>
            <div>{props.email}</div>
            <div>{props.number}</div>
            <div>{props.location}</div>
            <div>
                <button id="deleteButton" className="buttons" onClick={props.buttonDelete} />
            </div>
            <div>
                <button id="updateButton" className="buttons" onClick={props.buttonUpdate} />
            </div>
        </div>
    );
}

export default User;