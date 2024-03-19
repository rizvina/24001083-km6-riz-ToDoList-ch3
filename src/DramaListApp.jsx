import React, { useState, useEffect } from "react";
import { IoSearchCircle } from "react-icons/io5";
import { MdBallot } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiTodoFill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function DramaListApp() {
  const [items, setItems] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedImageUrl, setEditedImageUrl] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedTahun, setEditedTahun] = useState("");
  const [editedGenre, setEditedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [originalItems, setOriginalItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [completedItems, setCompletedItems] = useState([]);

  // Untuk menyimpan daftar drama asli saat komponen dimuat
  useEffect(() => {
    setOriginalItems(items);
  }, [items]);

  // Untuk menyimpan daftar drama yang selesai
  useEffect(() => {
    const completed = items.filter((item) => item.isCompleted);
    setCompletedItems(completed);
  }, [items]);

  // Menambahkan item baru ke dalam daftar drama
  const addItem = (newItem) => {
    const isItemExist = items.some(
      (item) => item.title.toLowerCase() === newItem.title.toLowerCase() // Memeriksa apakah item dengan judul yang sama sudah ada dalam daftar
    );
    if (!isItemExist) {
      alert("Drama baru berhasil ditambahkan");
      setItems([...items, newItem]);
    } else {
      alert("Drama ini sudah ada!");
    }
  };

  // Mengedit item dalam daftar drama
  const editItem = (index, updatedItem) => {
    const updatedItems = [...items];
    const isItemExist = updatedItems.some(
      (item, i) =>
        i !== index &&
        item.title.toLowerCase() === updatedItem.title.toLowerCase()
    );
    if (!isItemExist) {
      updatedItems[index] = updatedItem;
      setItems(updatedItems);
      alert("Drama berhasil diperbarui!");
      setEditedName("");
      setIsEditing(false);
    } else {
      alert("Drama dengan judul yang sama sudah ada!");
    }
  };

  // Menghapus drama dari daftar
  const removeItem = (index) => {
    const confirmation = window.confirm(`Ingin menghapus?`);
    if (confirmation) {
      setItems(items.filter((_, i) => i !== index)); // Mengupdate state items dengan menggunakan fungsi filter() untuk menyaring item yang akan tetap ada dalam daftar
    }
  };

  // Pencarian drama berdasarkan judulnya
  const handleSearch = () => {
    const filteredItems = originalItems.filter(
      (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) // Membuat array baru yang berisi item-item dari originalItems yang judulnya mengandung kata kunci pencarian (searchTerm)
    );
    setItems(filteredItems);
  };

  // Perubahan pada input pencarian
  const handleInputChange = (e) => {
    // Mengupdate state searchTerm dengan nilai dari input pencarian
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setItems(originalItems);
    }
  };

  // Array tahun untuk dropdown
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i // Mengisi array dengan tahun-tahun dari tahun saat ini hingga 9 tahun ke belakang
  );

  // Menghapus semua drama yang telah selesai dari daftar
  const deleteCompletedDrama = () => {
    const confirmation = window.confirm(
      "Ingin menghapus semua drama yang telah selesai?"
    );
    if (confirmation) {
      setItems(items.filter((item) => !item.isCompleted)); // Mengupdate state items dengan menggunakan fungsi filter() untuk menyaring item yang belum selesai (isCompleted === false)
    }
  };

  // Menghapus semua drama dari daftar
  const deleteAllDrama = () => {
    const confirmation = window.confirm("Ingin menghapus semua drama?");
    if (confirmation) {
      setItems([]); // Mengupdate state items dengan array kosong, sehingga semua drama akan dihapus dari daftar
    }
  };

  // Memperbarui item yang sedang diedit dalam daftar
  const updateItem = (index) => {
    if (
      // Memeriksa apakah semua kolom yang diperlukan untuk memperbarui item telah diisi
      editedImageUrl === "" ||
      editedName === "" ||
      editedTahun === "" ||
      editedGenre === ""
    ) {
      alert("Mohon isi semua kolom sebelum menyimpan perubahan!");
      return;
    }
    const updatedItem = {
      ...items[index],
      imageUrl: editedImageUrl,
      title: editedName,
      tahun: editedTahun,
      genre: editedGenre,
    };
    editItem(index, updatedItem);
    setEditedIndex(null);
    setIsEditing(false);
  };

  // Menambahkan atau memperbarui item dalam daftar
  const addOrUpdateItem = () => {
    if (isEditing) {
      updateItem(editedIndex);
    } else {
      if (
        editedImageUrl === "" ||
        editedName === "" ||
        editedTahun === "" ||
        editedGenre === ""
      ) {
        alert("Mohon isi semua kolom sebelum menambahkan item!");
        return;
      }
      addItem({
        id: Date.now(),
        imageUrl: editedImageUrl,
        title: editedName,
        tahun: editedTahun,
        genre: editedGenre,
        isCompleted: false,
      });
    }
    setEditedImageUrl("");
    setEditedName("");
    setEditedTahun("");
    setEditedGenre("");
  };

  // Mulai mode pengeditan pada sebuah item dalam daftar
  const startEditing = (index) => {
    setIsEditing(true);
    setEditedIndex(index);
    const itemToEdit = items[index];
    setEditedImageUrl(itemToEdit.imageUrl);
    setEditedName(itemToEdit.title);
    setEditedTahun(itemToEdit.tahun);
    setEditedGenre(itemToEdit.genre);
    alert("Memulai mode pengeditan.");
  };

  // Mmbatalkan mode pengeditan pada sebuah item dalam daftar
  const cancelEditing = () => {
    setIsEditing(false);
    setEditedIndex(null);
    setEditedImageUrl("");
    setEditedName("");
    setEditedTahun("");
    setEditedGenre("");
    alert("Mode pengeditan telah dibatalkan.");
  };

  // Memeriksa apakah suatu item telah selesai
  const isItemCompleted = (itemId) => {
    return completedItems.some((item) => item.id === itemId); // Menggunakan metode some() pada array completedItems untuk memeriksa apakah ada item dengan ID yang sesuai
  };

  return (
    <div
      className="container mx-auto px-4 py-16 relative rounded-3xl"
      style={{
        width: "80%",
        height: "auto",
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20221010/pngtree-abstract-background-in-pastel-colorful-gradations-suitable-for-presentations-or-business-image_1463445.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Judul Aplikasi */}
      <h1
        className="text-3xl font-bold mt-15 bg-indigo-400 inline-block p-4 rounded-md"
        style={{
          maxWidth: "800px",
          width: "calc(100% - 8rem)",
          margin: "0 auto",
          marginBottom: "30px",
          borderWidth: "3px",
          borderColor: "black",
        }}
      >
        Drama List App
      </h1>
      {/* Pencarian Drama */}
      <div
        className="border rounded-md mb-8"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "30px",
          borderWidth: "3px",
          borderColor: "black",
        }}
      >
        {/* Judul Pencarian Drama */}
        <h2 className="text-2xl font-bold px-4 py-2 bg-indigo-300">
          {" "}
          Drama Search
        </h2>
        <div className="px-4 py-2 flex items-center">
          <IoSearchCircle className="mr-2" size={40} color="blue" />
          {/* Input Pencarian */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search"
            className="rounded-md px-3 py-2 border w-full"
          />
        </div>
      </div>
      {/* Daftar Drama */}
      <div
        className="border rounded-md mb-8"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "30px",
          borderWidth: "3px",
          borderColor: "black",
        }}
      >
        {/* Judul Daftar Drama */}
        <h2 className="text-2xl font-bold px-4 py-2 bg-indigo-300">
          Drama List
        </h2>
        <div className="px-4 py-2">
          {/* Input untuk menambah atau mengedit item */}
          <div className="flex items-center mb-4">
            {/* Input untuk URL Gambar */}
            <input
              placeholder="Image URL"
              value={editedImageUrl}
              onChange={(e) => setEditedImageUrl(e.target.value)}
              className="rounded-md px-3 py-2 border mr-2 w-1/3"
            />
            {/* Input untuk Judul */}
            <input
              placeholder="Title"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="rounded-md px-3 py-2 border mr-2 w-1/3"
            />
            {/* Dropdown untuk Tahun */}
            <select
              value={editedTahun}
              onChange={(e) => setEditedTahun(e.target.value)}
              className="rounded-md px-3 py-2 border mr-2 w-1/3"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {/* Dropdown untuk Genre */}
            <select
              value={editedGenre}
              onChange={(e) => setEditedGenre(e.target.value)}
              className="rounded-md px-3 py-2 border mr-2 w-1/3"
            >
              <option value="">Select Genre</option>
              <option value="Romance">Romance</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
            </select>
            {/* Menambahkan atau Mengupdate item */}
            <button
              className={`px-4 py-2 ${
                isEditing ? "bg-green-500" : "bg-indigo-500"
              } text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200`}
              onClick={addOrUpdateItem}
            >
              {isEditing ? "UPDATE" : "ADD"}
            </button>
            {/* Membatalkan Mode Pengeditan */}
            {isEditing && (
              <button
                className="px-4 py-2 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
                onClick={cancelEditing}
              >
                CANCEL
              </button>
            )}
          </div>
          {/* Filter Kategori */}
          <div className="px-4 py-2 flex">
            {/* Menampilkan Semua Kategori */}
            <button
              className={`px-4 py-2 mr-2 flex-1 ${
                selectedCategory === "All"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200`}
              onClick={() => setSelectedCategory("All")}
            >
              {/* Icon dan Teks untuk Semua Kategori */}
              <MdBallot
                className="inline mr-2"
                style={{
                  color: selectedCategory === "All" ? "#FFF" : "#000",
                  verticalAlign: "middle",
                  fontSize: "1.5em",
                }}
              />
              <span
                style={{
                  color: selectedCategory === "All" ? "#FFF" : "#000",
                  verticalAlign: "middle",
                }}
              >
                All
              </span>
            </button>
            {/* Menampilkan Kategori yang Sudah Selesai */}
            <button
              className={`px-4 py-2 mr-2 flex-1 ${
                selectedCategory === "Completed"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200`}
              onClick={() => setSelectedCategory("Completed")}
            >
              {/* Icon dan Teks untuk Kategori yang Sudah Selesai */}
              <IoCheckmarkDoneCircle
                className="inline mr-2"
                style={{
                  color: selectedCategory === "Completed" ? "#FFF" : "#000",
                  verticalAlign: "middle",
                  fontSize: "1.5em",
                }}
              />
              <span
                style={{
                  color: selectedCategory === "Completed" ? "#FFF" : "#000",
                  verticalAlign: "middle",
                }}
              >
                Completed
              </span>
            </button>
            {/* Tombol untuk Menampilkan Kategori yang Belum Selesai */}
            <button
              className={`px-4 py-2 flex-1 ${
                selectedCategory === "Todo"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200`}
              onClick={() => setSelectedCategory("Todo")}
            >
              {/* Icon dan Teks untuk Kategori yang Belum Selesai */}
              <RiTodoFill
                className="inline mr-2"
                style={{
                  color: selectedCategory === "Todo" ? "#FFF" : "#000",
                  verticalAlign: "middle",
                  fontSize: "1.5em",
                }}
              />
              <span
                style={{
                  color: selectedCategory === "Todo" ? "#FFF" : "#000",
                  verticalAlign: "middle",
                }}
              >
                Todo
              </span>
            </button>
          </div>
          {/* Tabel untuk Menampilkan Daftar Drama */}
          <table className="w-full border-collapse border border-gray-800">
            <thead>
              <tr>
                <th className="border border-gray-800">Image</th>
                <th className="border border-gray-800">Title</th>
                <th className="border border-gray-800">Year</th>
                <th className="border border-gray-800">Genre</th>
                <th className="border border-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping setiap item dalam daftar untuk menampilkannya dalam tabel */}
              {items
                ?.filter((item) => {
                  // Filter item berdasarkan kategori yang dipilih
                  if (selectedCategory === "Completed") {
                    return item?.isCompleted === true;
                  } else if (selectedCategory === "Todo") {
                    return item?.isCompleted === false;
                  } else {
                    return item;
                  }
                })
                // Filter item berdasarkan kata kunci pencarian
                .filter((item) =>
                  item.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <tr
                    key={item.id}
                    // Mengatur kelas berdasarkan apakah item sudah selesai atau belum
                    className={`${
                      item?.isCompleted === true ? "line-through " : "bg-white"
                    }`}
                  >
                    <td
                      className="border border-gray-500"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <div style={{ display: "inline-block" }}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          style={{ maxWidth: "100px" }}
                        />
                      </div>
                    </td>
                    {/* Menampilkan Judul, Tahun, dan Genre */}
                    <td className="border border-gray-500">{item.title}</td>
                    <td className="border border-gray-500">{item.tahun}</td>
                    <td className="border border-gray-500">{item.genre}</td>
                    <td className="border border-gray-500">
                      <div className="flex items-center justify-center">
                        {/* Checkbox untuk menandai item selesai atau belum */}
                        <input
                          type="checkbox"
                          checked={isItemCompleted(item.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            // Mengubah status selesai atau belum selesai saat checkbox diklik
                            setItems(
                              items.map((e) =>
                                e.id === item.id
                                  ? {
                                      ...e,
                                      isCompleted: !e.isCompleted,
                                    }
                                  : e
                              )
                            );
                          }}
                          style={{
                            height: 18,
                            width: 18,
                            marginRight: "8px",
                          }}
                        />
                        {/* Tombol untuk Memulai Pengeditan */}
                        <div className="flex items-center">
                          <button
                            className="px-2 py-1"
                            onClick={() => startEditing(index)}
                          >
                            <MdEditSquare size={24} color="orange" />
                          </button>
                          {/* Tombol untuk Menghapus */}
                          <button
                            className="px-2 py-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(index);
                            }}
                          >
                            <FaTrash size={24} color="red" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Tombol untuk Menghapus Drama yang Sudah Selesai dan Semua Drama */}
          <div className="px-4 py-2 flex">
            <button
              className="px-4 py-2 mr-2 bg-red-500 text-white flex-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
              onClick={() => deleteCompletedDrama()}
            >
              Delete Completed Drama
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white flex-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
              onClick={() => deleteAllDrama()}
            >
              Delete All Drama
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
