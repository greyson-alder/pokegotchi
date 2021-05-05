const Button = ({text, className}) => {
    return (
        <div>
            <button className={ className }>{ text }</button>
        </div>
    )
}


Button.defaultProps = {
    text: "click me",
    className: ""
}

export default Button

