import Loading from "../components/Loading";
import type { sessionInterface } from "../interface/useSessionInterface";
import AdminStatistics from "./adminStatistics";
import useGetAllUsers from "./useGetAllUsers";

const Admin = (props: sessionInterface) => {
    const { loading, error, users } = useGetAllUsers();

    if (props.loading) return <Loading loading={props.loading} />
    if (!props.isAuthenticated) return window.location.href = "/login"
    if (props.isAdmin === false) window.location.href = "/panel"

    if (users?.length === undefined) return <h1>No active users</h1>

    return (
        <div className="container-sm">
            { error ? <div>{error}</div> : <></>}
            <div className="accordion mt-5" id="users-accordion">
                <Loading loading={loading}>
                    { users.map((u) => (
                        <div key={u.id} className="accordion-item">
                            <h2 className="accordion-header" id={`header_${u.id}`}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush_${u.id}`} aria-expanded="false" aria-controls={`flush_${u.id}`}>
                                    {u.username} - {u.role}
                                </button>
                            </h2>
                            <div id={`flush_${u.id}`} className="accordion-collapse collapse" data-bs-parent="#users-accordion">
                                <AdminStatistics userID={u.id ? u.id : ""} />
                            </div>
                        </div>
                    )) }
                </Loading>
            </div>
        </div>
    )
}

export default Admin;