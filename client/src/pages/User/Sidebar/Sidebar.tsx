import "./Sidebar.css"
import { TbPlus } from "react-icons/tb";

export default function Sidebar() {
    return (
        <div className="sidebar">

            <div className="sidebarProfile">
                <h4>
                    Saaransh Gupta
                </h4>
                <div className="sidebarProfilePic"></div>
            </div>

            <SidebarCategory name="Trips">
                <CategoryItem name="VaishnoDevi-Trip" date="22nd October 2022" />
                <CategoryItem name="VaishnoDevi-Trip" date="22nd October 2022" />
                <CategoryItem name="VaishnoDevi-Trip" date="22nd October 2022" />
            </SidebarCategory>

        </div>
    )
}



















function SidebarCategory(props: any) {

    return(
        <div className="sidebarCategory">
            <div className="sidebarCategoryTitle">
                <h2>{props.name}</h2>
                <div className="addButton"><TbPlus/></div>
            </div>

            <div className="sidebarCategoryItems">
                {props.children}
            </div>
        </div>
    )

}

function CategoryItem(props: any) {

    return(
        <div className="sidebarCategoryItem">
            <div className="sidebarCategoryItemIcon"> </div>

            <div>
                <h4>{props.name}</h4>
                <h5>{props.date}</h5>
            </div>
        </div>
    )
}
