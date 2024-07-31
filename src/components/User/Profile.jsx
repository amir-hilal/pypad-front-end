import { useEffect, useRef, useState } from "react";
import "../../assets/css/profile.css"
import { storeCode } from "../../services/CodeService";
const fetchFiles = () => {
  return [
    { id: 1, name: 'file1.py' },
    { id: 2, name: 'file2.py' },
    { id: 3, name: 'file3.py' },
  ];
};

function Profile() {
    
  const [files, setFiles] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('Untitled.py');

  const errorRef = useRef();

  useEffect(() => {
    // Fetch files from API or data source
    const filesData = fetchFiles();
    setFiles(filesData);
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit file with id: ${id}`);
  };

  const handleDelete = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSaveNewFile = async () => {
    try {
      const request = await storeCode(newFileName, "#this is a comment");
      errorRef.current.innerHTML = ""
      console.log(request);
    } catch (error) {
      console.log(error.response.data);
      errorRef.current.innerHTML = error.response.data.message
    }
    if (newFileName) {
      const newFile = {
        id: files.length + 1, 
        name: newFileName
      };
      setFiles([...files, newFile]);
      setNewFileName('');
      setIsCreating(false);
    }
  };

  const handleCancelCreate = () => {
    setNewFileName('Untitled.py');
    setIsCreating(false);
  };

  const createFile = () =>{

  }
  return (
    <div className="container">
      <h1>Profile Page</h1>
      <h2>Your Python Files</h2>
      <div className="error" ref={errorRef}></div>
      {!isCreating ? (
        <button className="create" onClick={handleCreate}>Create New File</button>
      ) : (
        <div className="create-file">
          <input
            type="text"
            placeholder="Enter file name..."
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
          <button className="save" onClick={handleSaveNewFile}>Save</button>
          <button className="cancel" onClick={handleCancelCreate}>Cancel</button>
        </div>
      )}
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name}
            <div>
              <button className="edit" onClick={() => handleEdit(file.id)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(file.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Profile