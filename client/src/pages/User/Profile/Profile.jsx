import "./Profile.css"

export default function Profile() {

    let userData = JSON.parse(sessionStorage.getItem('userData'))
  return (
    <div className='profile'>

        <div className="profileImage">
            <img src={userData.profilePhoto} alt="" />
        </div>

        <div className="profileInfo">
            <table>
                <tr>
                    <td> <h4>Name: </h4> </td>
                    <td> <p>{userData.name}</p> </td>
                </tr>
                <tr>
                    <td> <h4>Email: </h4> </td>
                    <td> <p>{userData.email}</p> </td>
                </tr>
                <tr>
                    <td> <h4>Phone: </h4> </td>
                    <td> <p>{userData.phone}</p> </td>
                </tr>
                <tr>
                    <td> <h4>Bio: </h4> </td>
                    <td> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero voluptas illo dolore repellat at. Praesentium corrupti saepe cupiditate doloribus distinctio, adipisci culpa illum, voluptatibus error deserunt dolores quasi. Facere laudantium exercitationem amet enim recusandae nobis dolorem officiis dignissimos? Laudantium totam quos tenetur incidunt libero! Eveniet nemo dolor rerum officia accusamus.</p> </td>
                </tr>
            </table>
        </div>

    </div>
  )
}
