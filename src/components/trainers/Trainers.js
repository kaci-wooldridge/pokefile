import { Link } from "react-router-dom"

export const Trainer = ({ id, name}) =>{
    return <section className="trainer">
        <div>
            <h3><Link to={`/users/${id}`}>{name}</Link></h3>
        </div>
    </section>
}