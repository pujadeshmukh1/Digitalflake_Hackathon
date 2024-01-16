// Product.jsx
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./Navbar";

const Product = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    packsize: 0,
    mrp: 0,
    image: "",
    status: "Status",
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const [products, setProducts] = useState([]);

  // Product API routes
  const getProductApi = 'http://localhost:4000/products';

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await fetch(getProductApi);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.data);
      } else {
        console.error('Error fetching products:', data.error || data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddItemClick = () => {
    setIsAddingItem(true);
    setSearchQuery('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    try {
      const response = await fetch(getProductApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          packsize: newProduct.packsize,
          mrp: newProduct.mrp,
          image: newProduct.image,
          status: newProduct.status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setProducts((prevProducts) => [...prevProducts, data.data]);
      } else {
        console.error('Error saving product:', data.error || data.message);
      }
    } catch (error) {
      console.error('Error saving product:', error.message);
    }

    // Reset state after saving
    setIsAddingItem(false);
    setSearchQuery('');
    setNewProduct({
      name: "",
      category: "",
      packsize: 0,
      mrp: 0,
      image: "",
      status: "inactive",
    });
  };

  const handleCancelAddItem = () => {
    // Reset state without saving
    setIsAddingItem(false);
    setSearchQuery('');
    setNewProduct({
      name: "",
      category: "",
      packsize: 0,
      mrp: 0,
      image: "",
      status: "inactive",
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`${getProductApi}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the product from the state
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };
  return (
    <>
      <div>
        <div>
          <NavBar />
        </div>
        <div className="flex">
          <div>
            <SideBar />
          </div>
          <div className="container mx-auto p-4">
            <div className="bg-white shadow-md p-4 border h-screen">
            
              {!isAddingItem && (
                <div className="flex space-x-16 mb-4">
                  <div className="flex gap-3">
                    <img
                      src="/img/product.jpg"
                      className="w-8 h-6 mt-2"
                      alt=""
                    />
                    <h1 className="text-3xl font-bold mb-4">Product Page</h1>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Products"
                    className="p-2 w-[50%] border border-gray-300 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="bg-[#662671] text-white px-4 py-2 rounded"
                    onClick={handleAddItemClick}
                  >
                    Add Product
                  </button>
                </div>
              )}
              {isAddingItem ? (
                <div className="">
                  <div className="flex">
                  <img src="/img/Vector2.svg" alt="" />
                 <h1 className="font-semibold text-[20px] ml-1">Add Product</h1>
                
                    </div>
                  
                <div className="mb-4  mt-2">
                  <div className="flex space-x-16 w-full">
                    <div className="w-[30%]">
                    <label htmlFor="" className="font-semibold text-[18px]">Product Name</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      className="p-2 border border-gray-300 w-full rounded mr-2"
                      value={newProduct.name}
                      onChange={handleInputChange}
                    />
                    </div>
                    
                   <div className="w-[30%]">
                   <label htmlFor="" className="font-semibold text-[18px]">Pack Size</label>
                    <br />
                    
                   <input
                      type="string"
                      name="packsize"
                      placeholder="Product packsize"
                      className="p-2 border w-full border-gray-300 w-[32%] rounded mr-2"
                      value={newProduct.packsize}
                      onChange={handleInputChange}
                    />
                   </div>
                    
                  <div className="w-[30%]">
                  <label htmlFor="" className="font-semibold text-[18px]">MRP</label>
                  <br />
                  <input
                      type="number"
                      name="mrp"
                      placeholder="Product MRP"
                      className="p-2 border border-gray-300 w-full rounded mr-2"
                      value={newProduct.mrp}
                      onChange={handleInputChange}
                    />

                  </div>
                   
                  </div>

                  <div className="mt-4 space-x-16 flex w-full">
                    <div className="w-[30%]">
                    <label htmlFor="" className="font-semibold text-[18px]">Product Image</label>
                     <br />
                    <input
                      type="text"
                      name="image"
                      placeholder="Product Image URL"
                      className="p-2 border border-gray-300 w-full rounded mr-2"
                      value={newProduct.image}
                      onChange={handleInputChange}
                    />
                    </div>

                    <div className="w-[30%]">
                    <label htmlFor="" className="font-semibold text-[18px]">Product Category</label>
                    <br />
                    <input
                      type="text"
                      name="category"
                      placeholder="Product category"
                      className="p-2 border border-gray-300 w-full rounded mr-2"
                      value={newProduct.category}
                      onChange={handleInputChange}
                    />
                    </div>

                    <div className="w-[30%]">
                    <label htmlFor="" className="font-semibold text-[18px]">Status</label>
                    <br />
                    <select
                      name="status"
                      className="p-2 border border-gray-300 w-full rounded"
                      value={newProduct.status}
                      onChange={handleInputChange}
                    > 
                      <option value="Status">Status</option>
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                    </select>

                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-[35%]">
                    <button
                      className="border border-[#676767] text-black  mr-10  px-10 py-2 rounded-full ml-2"
                      onClick={handleCancelAddItem}
                    >
                      Cancel
                    </button>
                    <button
                      className="border border-[#676767] text-black  mr-5 text-white px-10 py-2 rounded-full bg-[#662671] ml-2"
                      onClick={handleSaveProduct}
                    >
                      Save
                    </button>
                  </div>
                </div>
                </div>
              ) : (
                <div className="w-full ">
                 
                <table className="w-full border-collapse  mb-4 bg-[#FFF8B7]">
                  <thead>
                    <tr className="">
                    <th className="p-2 ">
                      <div className="flex justify-center">
                        <p className="">Name</p>  
                        <img src="/img/updwon.png" className="w-4 h-4 mt-1.5" alt="" />
                      </div>
                    </th>

                    <th className="p-2 ">
                      <div className="flex justify-center">
                        <p className="">Category</p>  
                        <img src="/img/updwon.png" className="w-4 h-4 mt-1.5" alt="" />
                      </div>
                    </th>

                    <th className="p-2 ">
                      <div className="flex justify-center">
                        <p className="">Pack Size</p>  
                        <img src="/img/updwon.png" className="w-4 h-4 mt-1.5" alt="" />
                      </div>
                    </th>

                    <th className="p-2 ">
                      <div className="flex justify-center">
                        <p className="">MRP</p>  
                        <img src="/img/updwon.png" className="w-4 h-4 mt-1.5" alt="" />
                      </div>
                    </th>

                    <th className="p-2 ">
                      <div className="flex justify-center">
                        <p className="">Image</p>  
                        <img src="/img/updwon.png" className="w-4 h-4 mt-1.5" alt="" />
                      </div>
                    </th>

                    <th className="p-2 ">
                      <div className="flex justify-center">
                        <p className="">Status</p>  
                        <img src="/img/updwon.png" className="w-4 h-4 mt-1.5" alt="" />
                      </div>
                    </th> 
                     
                    </tr>
                  </thead>
                  <tbody className="">
                    {filteredProducts.map(product => (
                      <tr key={product._id} className="cursor-pointer border-t-8 border-white bg-gray-200 ">
                        <td className="p-2 text-center">{product.name}</td>
                        <td className="p-2 text-center">{product.category}</td>
                        <td className="p-2 text-center">{product.packsize}</td>
                        <td className="p-2 text-center">{product.mrp}</td>
                       
              <td className="p-2 w-1/7">
              <div className="max-w-full flex justify-center overflow-hidden">
                  <img className="w-12 h-12" src={product.image} alt={product.name} />
              </div>
              </td>

                        <td className="p-2 text-center">{product.status}</td>
                        <td className="p-2 w-1/7">
                          <div className="flex space-x-2 justify-center">
                            <button className="text-white px-2 py-1 rounded">
                             <img src="/img/edit.png" alt="" />
                            </button>
                            <button
                              className=" text-white px-2 py-1 rounded"
                              onClick={() => handleDeleteProduct(product._id)}
                            >
                              <img src="/img/delet.png" alt="" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              

              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
