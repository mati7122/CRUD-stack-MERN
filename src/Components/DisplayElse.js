
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

export {
    Error,
    Load,
    NoData
}