import { useEffect, useRef, useState } from "react";
import "../../assets/css/profile.css"
import { deleteCode, getAllCode, storeCode } from "../../services/CodeService";
import { useNavigate } from "react-router-dom";


function Profile() {

    const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('Untitled.py');

  const errorRef = useRef();

  useEffect(() => {
    // Fetch files from API or data source
    const filesData = async()=>{
      const data = await getAllCode();
      console.log(data);
      setFiles(data)
    }
    filesData()
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit file with id: ${id}`);
    navigate(`/code/${id}`)
  };

  const handleDelete = async (id) => {
    setFiles(files.filter(file => file.id !== id));
    try {
      const request = await deleteCode(id)
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSaveNewFile = async () => {
    try {
      const request = await storeCode(newFileName, "#this is a comment");
      errorRef.current.innerHTML = ""
      console.log(request);
      if (newFileName) {
        const newFile = {
          id: files.length + 1, 
          name: newFileName
        };
        setFiles([...files, newFile]);
        setNewFileName('');
        setIsCreating(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelCreate = () => {
    setNewFileName('Untitled.py');
    setIsCreating(false);
  };

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
            {file.filename}
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