import { useState } from "react";
import useCategoryService from "./useCategoryService";
import type { userInfoInterface } from "../interface/useSessionInterface";
import Loading from "./Loading";
import CategoryItem from "./categoryItem";
import { URL_BACKEND } from "./URL";

const CategoryComponent = (userInfo : userInfoInterface | null) => {
    const { categorys, loading } = useCategoryService()

    const [categoryName, setCategoryName] = useState<string | null>(null)

    const handleCreateButtonClick = async () => {
        const resposne = await fetch(URL_BACKEND + "/category/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: categoryName,
                userModel: { id: userInfo?.id },
            })
        })

        if (!resposne.ok) {
            console.log("not good")
        }

        if (resposne.ok) window.location.reload()
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Create new category</h5>
                    <label htmlFor="categoryName">Name</label>
                    <input className="form-control" id="categoryName" type="text" onChange={e => setCategoryName(e.target.value)} />
                    <button className="btn btn-primary mt-2" onClick={handleCreateButtonClick}>Create</button>
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">Category</h5>
                </div>
                <Loading loading={loading}>
                    { categorys?.length ? <div className="list-group list-group-flush">
                    {categorys?.map(c => (
                        <CategoryItem key={c.id} id={c.id} userModel={c.userModel} name={c.name} />
                    ))}
                    </div> : <div className="card-body"><p>No active categorys</p></div>}
                </Loading>
            </div>
        </>
    )
}

export default CategoryComponent;