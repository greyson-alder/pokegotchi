const Button = ({text, className, event}) => {
    return (
        <div>
            <button className={ className } onClick={ event }>{ text }</button>
        </div>
    )
}


Button.defaultProps = {
    text: "click me",
    className: ""
}

export default Button

