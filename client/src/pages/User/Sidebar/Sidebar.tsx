import { useNavigate } from "react-router-dom";
import "./Sidebar.css"
import { TbPlus } from "react-icons/tb";

export default function Sidebar(props: any) {
    let temp = () => {
        props.setAdd(true)
        props.setBlur(0);
    };
    return (
        <div className="sidebar">

            <div className="sidebarProfile">
                <h4>
                    Saaransh Gupta
                </h4>
                <div className="sidebarProfilePic"></div>
            </div>

            <SidebarCategory name="Trips" addfunc={temp}>
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
                <div className="addButton" onClick={() => {props.addfunc()}}><TbPlus/></div>
            </div>

            <div className="sidebarCategoryItems">
                {props.children}
            </div>
        </div>
    )

}

function CategoryItem(props: any) {

    const navigator = useNavigate();

    function clickHandler(){
        navigator('./trip/')
    }

    return(
        <div className="sidebarCategoryItem" onClick={clickHandler}>
            <div className="sidebarCategoryItemIcon"> </div>

            <div>
                <h4>{props.name}</h4>
                <h5>{props.date}</h5>
            </div>
        </div>
    )
}
