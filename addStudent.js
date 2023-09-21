async function addStudent() {
    let db;
    let studentRollNumber = document.getElementById("rollnumber").value;
    let Name = document.getElementById("studentName").value;
    let studentClass = document.getElementById("studentClass").value;
    const studentName = Name.trim();

    if (studentClass > 0 && studentName != "" && studentRollNumber > 0) {
      var Student = {
        rollnumber: studentRollNumber,
        studentName: studentName,
        class: studentClass,
      };
      // create Db 
      const DbRequest = indexedDB.open("School");
  
      DbRequest.onupgradeneeded = (e) => {
        // create objectStore if not exits
        if (!db.objectStoreNames.contains("Student")) {
            db.createObjectStore("Student", { keyPath: "rollnumber" });
        }
        db = e.target.result;
      };
  
      DbRequest.onsuccess = (e) => {
        db = e.target.result;
        // establish connection with Student Table
        const dbTransaction = db.transaction("Student", "readwrite");
        // if not establish gives erroe
        dbTransaction.onerror = (e) => alert("Something went wrong!!");

        const student = dbTransaction.objectStore("Student");
        //add data to student
        student.add(Student);
        dbTransaction.oncomplete = (e) => {
          alert("Student Inserted Successfully !!!");
          ClearInput();
        };
     
      };
    }
  }
  
  
  function ClearInput()
  {
      document.getElementById("rollnumber").value ="";
     document.getElementById("studentName").value="";
     document.getElementById("studentClass").value="";
  }