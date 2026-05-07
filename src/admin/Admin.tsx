import Loading from "../components/Loading";
import type { sessionInterface } from "../interface/useSessionInterface";
import AdminStatistics from "./adminStatistics";
import useGetAllUsers from "./useGetAllUsers";

const Admin = (props: sessionInterface) => {
    const { loading, error, users } = useGetAllUsers();

    if (props.loading) return <Loading loading={props.loading} />
    if (!props.isAuthenticated) return window.location.href = "/login"
    if (props.userInfo?.role !== "Admin") return window.location.href = "/panel"

    if (users?.length === undefined) return <h1>No active users</h1>

    return (
        <div className="container-sm">
            { error ? <div>{error}</div> : <></>}
            <div className="accordion accordion-flush" id="users-accordion">
                <Loading loading={loading}>
                    { users.map((u) => (
                        <div key={u.id} className="accordion-item">
                            <h2 className="accordion-header" id={`${u.id}`}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`${u.id}`} aria-expanded="false" aria-controls={`${u.id}`}>
                                    {u.username} - {u.role}
                                </button>
                            </h2>
                            <div className="accordion-collapse collapse" aria-labelledby={`${u.id}`} data-bs-parent="#users-accordion">
                                <AdminStatistics userID={props.userInfo?.id ? props.userInfo?.id : ""} />
                            </div>
                        </div>
                    )) }
                </Loading>
            </div>
        </div>
    )
}

export default Admin;