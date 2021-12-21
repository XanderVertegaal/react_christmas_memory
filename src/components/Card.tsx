export const Card = ({text}: {text: string}) => {
    return (
        <div key={text} className="card">
            <p className="card__text">{text}</p>
        </div>
    )
}