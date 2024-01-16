import Navbar from "./Navbar"
import SideBar from "./SideBar"

const Home = () => {
  return (
    <>
    <div>
      <Navbar />
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div className="w-full">
        <div className="flex w-full  items-center justify-center h-screen">
  <div className=" w-full text-center">
    <div className="flex justify-center">
      <img className="" src="./img/image2.png" alt="" />
    </div>
    <p className="text-[#717070] text-center mb-2 text-[32px]">Welcome to Digitalflake Admin</p>
  </div>
</div>

        </div>
       

      </div>
    </div>
    </>
  )
}

export default Home