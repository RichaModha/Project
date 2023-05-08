import User from "./User";

function UsersList(props)
{
    //console.log(props);
    return(
        <div>
            {
                props.map((user)=>
                    {
                        console.log(user);
                       return <User user={user}/>
                    })
            }
        </div>
    )
}

export default UsersList;