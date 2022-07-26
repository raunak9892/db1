const getNotes = async () => {
  // API Call
  const response = await fetch(
    `http://localhost:5000/api/notes/fetchallnotes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlNmQyN2U3M2I1MjEyZDVhMDA5NDZjIn0sImlhdCI6MTY0MjYwMjMxMX0.UyHB69tdHdUe4pJXM0RoZak96O8pv_tQvlW1ZUbv1Yc",
      },
    }
  );
  const json = await response.json();
  //json.stringify;

  // setNotes(json);
  console.log(json);
};
getNotes();

const createNotes = async () => {
  const response = await fetch("http://localhost:5000/api/notes/addnote", {
    method: "POST",
    body: {
      patientname: "123456",
      prescription: "1234567891",
      name: "testing",
    },
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlNmQyN2U3M2I1MjEyZDVhMDA5NDZjIn0sImlhdCI6MTY0MjYwMjMxMX0.UyHB69tdHdUe4pJXM0RoZak96O8pv_tQvlW1ZUbv1Yc",
    },
  });
  const json = response.json();
};
createNotes();
