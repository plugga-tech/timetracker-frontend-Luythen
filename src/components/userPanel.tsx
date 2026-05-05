import type { sessionInterface } from "../interface/useSessionInterface";
import CategoryComponent from "./categoryComponent";
import Loading from "./Loading";
import TimeTrackerComponent from "./timeTrackerComponent";

const UserPanel = (props: sessionInterface) => {
    if (props.loading) return <Loading loading={props.loading} />
    if (!props.isAuthenticated) window.location.href = "/login"

    return (
        <div className="container-sm">
            <h4 className="text-center">Welcome {props.userInfo?.username}</h4>
            <div className="row mt-3">
                <div className="col-7">
                    <TimeTrackerComponent username={props.userInfo?.username} id={props.userInfo?.id} email={props.userInfo?.email} />
                </div>
                <div className="col-3">
                    <CategoryComponent username={props.userInfo?.username} id={props.userInfo?.id} email={props.userInfo?.email}  />
                </div>
            </div>
        </div>
    )
}

export default UserPanel;