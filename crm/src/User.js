function User(props)
{
    return(
        <div id={props.user.id} key={props.user.id} name="todo" value={props.user.id}>
            {props.user.name}
        </div>
    )
}

export default User;