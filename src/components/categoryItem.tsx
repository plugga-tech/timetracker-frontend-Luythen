import { useState } from "react";
import type { category } from "../interface/categoryInterface";

const EditCategoryItem = ({id, name}: {id:string | null, name: string | null}) => {
        const [editName, setEditName] = useState(name ? name : "")
        const url : String = "https://timetracker-backend-app-cwdiu.ondigitalocean.app"
        
        const handleSaveClick = async () => {
            const response = await fetch(url + "/category/update/" + id, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: editName
            })

            if (!response.ok) {
                console.log("bad bad")
            }

            if (response.ok) window.location.reload()
        }

        return (
            <div>
                <label htmlFor="categoryItem">Change name on category</label>
                <input id="categoryItem" type="text" className="form-control" value={editName} onChange={e => setEditName(e.target.value)} />
                <button className="btn btn-primary mt-1" onClick={handleSaveClick}>Save</button>
            </div>
        )
    }


const CategoryItem = (props: category) => {

    const [edit, setEdit] = useState(false)

    return (
        <div key={props.id} className="list-group-item list-group-item-action">
            { !edit ? <h6 onClick={() => setEdit(!edit)}>{props.name}</h6> : <EditCategoryItem id={props.id} name={props.name} />}
        </div>
    )
}

export default CategoryItem;