// Category.jsx
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./Navbar";

const Category = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    status: "status",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/categories");
      const data = await response.json();

      if (response.ok) {
        setCategories(data.data);
      } else {
        console.error("Error fetching categories:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleAddItemClick = () => {
    setIsAddingItem(true);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleEditClick = (category) => {
    setEditedCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      status: category.status,
    });
    setIsEditing(true);
  };

  // const handleCancelEdit = () => {
  //   setEditedCategory(null);
  //   setNewCategory({
  //     name: "",
  //     description: "",
  //     status: "inactive",
  //   });
  //   setIsEditing(false);
  // };
  const handleCancelAddItem = () => {
    // Reset state without saving
    setIsAddingItem(false);
    
    setNewCategory({
      name: "",
      description:"",
      status: "inactive",
    });
  };

  const handleSaveItem = async () => {
    try {
      let response;

      if (isEditing) {
        // Edit existing category
        response = await fetch(`http://localhost:4000/categories/${editedCategory._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        });
      } else {
        // Add new category
        response = await fetch("http://localhost:4000/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        });
      }

      const data = await response.json();

      if (response.ok) {
        if (isEditing) {
          // Update the edited category in the state
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category._id === editedCategory._id ? data.data : category
            )
          );
          setEditedCategory(null);
        } else {
          // Add the new category to the state
          setCategories((prevCategories) => [...prevCategories, data.data]);
        }
      } else {
        console.error("Error saving category:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error saving category:", error.message);
    }

    // Reset state after saving
    setIsAddingItem(false);
    setSearchQuery("");
    setNewCategory({
      name: "",
      description: "",
      status: "inactive",
    });
    setIsEditing(false);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:4000/categories/${categoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted category from the state
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );
      } else {
        console.error("Error deleting category:", data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
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
            <div className="bg-white shadow-md px-4 py-3 h-screen">
              {!isAddingItem && (
                <div className="flex space-x-16 mb-4">
                  <div className="flex gap-3">
                    <img src="/img/category.jpg" className="w-8 h-6 mt-2" alt="" />
                    <h1 className="text-3xl font-bold mb-4">Category Page</h1>
                  </div>
                 
                  <input
                    type="text"
                    placeholder="Search Items"
                    className="p-2 w-[50%] border border-gray-300 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="bg-[#662671] text-white px-4 py-2 rounded"
                    onClick={handleAddItemClick}
                  >
                    Add Item
                  </button>
                </div>
              )}
              {isAddingItem ? (
                <div>
                  <div className="flex">
                  <img src="/img/Vector2.svg" alt="" />
                 <h1 className="font-semibold text-[20px] ml-1">Add Category</h1>
                
                    </div>
                <div className="mb-4 mt-2">
                  <div className="flex space-x-16 w-full">
                    <div className="w-[30%]">
                    <label htmlFor="" className="font-semibold text-[18px]">Category Name</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      placeholder="Category Name"
                      className="p-2  border border-gray-300 w-full rounded mr-2"
                      value={newCategory.name}
                      onChange={handleInputChange}
                    />
                    </div>
                 
                 <div className="w-[30%]">
                  <label htmlFor="" className="font-semibold text-[18px]">Desciption</label>
                  <br />
                 <input
                      type="text"
                      name="description"
                      placeholder="Category Description"
                      className="p-2 border border-gray-300 w-[100%] rounded mr-2"
                      value={newCategory.description}
                      onChange={handleInputChange}
                    />
                 </div>

                 <div className="w-[30%]">
                 <label htmlFor="" className="font-semibold text-[18px]">Status</label>
                    <br />
                 <select
                      name="status"
                      className="p-2 border border-gray-300 w-full rounded appearance-none focus:outline-none focus:border-blue-500"
                      value={newCategory.status}
                      onChange={handleInputChange}
                    >
                      <option value="Status">Status</option>
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                    </select>
                 </div>
                    
                   
                  </div>

                  <div className="flex justify-end mt-[45%]">
                    <button
                      className="border border-[#676767] text-black  mr-10  px-10 py-2 rounded-full ml-2"
                      onClick={handleCancelAddItem}
                    >
                      Cancel
                    </button>
                    <button
                      className="border border-[#676767] text-black  mr-5 text-white px-10 py-2 rounded-full bg-[#662671] ml-2"
                      onClick={handleSaveItem}
                    >
                      Save
                    </button>
                  </div>
                </div>
                </div>
              ) : (
                <div className="w-full">
                  <table className="w-full border-collapse border border-gray-300 mb-4 bg-[#FFF8B7]">
                    <thead>
                      <tr className="">
                        <th className="p-2 flex justify-center ">
                          <p className="text-[20px]">Name</p>
                          <img src="/img/updwon.png" className="w-4 h-4 mt-2.5" alt="" />
                        </th>
                        

                        <th className="p-2 ">
                          <div className="flex justify-center">
                          <p className="">Description</p>  
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
                    <tbody>
                      {filteredCategories.map((category) => (
                        <tr key={category._id} className="cursor-pointer border-t-8 border-white bg-gray-200">
                          <td className="p-2 text-center">{category.name}</td>
                          <td className="p-2 text-center ">{category.description}</td>
                          <td className="p-2 text-center ">{category.status}</td>
                          <td className="p-2 ">
                            <div className="flex space-x-2 justify-center">
                              <button
                                className="text-white px-2 py-1 rounded"
                                onClick={() => handleEditClick(category)}
                              >
                                <img src="/img/edit.png" alt="" />
                              </button>
                              <button
                                className="text-white px-2 py-1 rounded"
                                onClick={() => handleDeleteCategory(category._id)}
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

export default Category;
