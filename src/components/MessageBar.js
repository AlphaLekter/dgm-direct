
export default function MessageBar({submitHandler}) {
    return <div id="message-bar">
        <form action="" onSubmit={submitHandler}>
            <input id="message-bar-input" type="text" />
            <button type="submit"> => </button>
        </form>
    </div>
}