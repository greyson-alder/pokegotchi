const Button = ({text, className}) => {
    return (
        <div>
            <button className={ className }>{ text }</button>
        </div>
    )
}


button.defaultProps = {
    text: "click me",
    className: ""
}

export default Button

