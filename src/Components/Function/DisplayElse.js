
function Error() {
    return (
        <div className="center">
            <h2>An error has ocurred, try later</h2>
        </div>
    );
}

function Load() {
    return (
        <div className="center">
            <h2>Loading...</h2>
        </div>
    );
}

function NoData() {
    return (
        <div className="center">
            <div>
                <h2>No data to display :(</h2>
                <h2>Try add a user</h2>
            </div>
        </div>
    );
}

// function Data() {
//     return (
//         <div className="center__data">
//             {
//                 data.map(i => {
//                     return <User _id={i._id} name={i.name} location={i.location} email={i.email} number={i.number} buttonDelete={() => Delete(i._id)} buttonUpdateShow={() => Update(i._id, i.name, i.email, i.number, i.location)} />
//                 })
//             }
//         </div>
//     );
// }

export {
    Error,
    Load,
    NoData
}