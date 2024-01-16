
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="flex h-screen">
      <nav className="flex bg-[#F4F4F4] w-[400px]">
        <div className="space-y-4 mt-7">
          <div className='flex'>
            <img src="/img/home.jpg" className='w-7 h-5  mt-3 ml-3' alt="" />
          <Link to="/home" className="py-2 px-4 block font-poppin text-[20px] font-medium">Home</Link>
          </div>

          <div className='flex'>
            <img src="/img/category.jpg " className='w-7 h-5  mt-3 ml-3' alt="" />
          <Link to="/category" className="py-2 px-4 block font-poppin text-[20px] font-medium">Category</Link>
          </div>
            
          <div className='flex'>
            <img src="/img/product.jpg"  className='w-7 h-5  mt-3 ml-3'alt=""  />
          <Link to="/products" className="py-2 px-4 block font-poppin text-[20px] font-medium">Products</Link>
          </div>
         
         
          
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
