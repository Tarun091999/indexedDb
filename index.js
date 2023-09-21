function CreateDb() {
  let DbRequest;
  const DbName = document.getElementById("dbName").value;
  const tableName = document.getElementById("tableName").value;
  //to remove the whiespace we use the trim method
  var datbaseName = DbName.trim();

  if (datbaseName != "") {
    // creates the indexedDb
    DbRequest = indexedDB.open(DbName);

    //index db Has Three Events

    DbRequest.onupgradeneeded = (e) => {
      alert("Db Updated");
      db = e.target.result;
      db.createObjectStore(tableName, { keyPath: "Sr.No" });
    };

    DbRequest.onsuccess = (e) => {
      alert("Db Successfully Creates");
      db = e.target.result;
      ClearInput();
      
    };

    DbRequest.onerror = (e) => {
      alert("Error Encountered");
    };
  } else {
    alert("Please Enter Proper Name");
  }
}

function ClearInput()
{
    document.getElementById("dbName").value="";
    document.getElementById("tableName").value="";

}
