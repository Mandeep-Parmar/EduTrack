import axios from 'axios';

async function testApi() {
  try {
    console.log("\nTEST 1: Login Faculty");
    const res1 = await axios.post("http://localhost:5000/api/auth/login", {
      email: "faculty@example.com",
      password: "password123"
    });
    console.log("Faculty Login Success:", res1.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
       console.log("Registering faculty...");
       const resReg = await axios.post("http://localhost:5000/api/auth/register-faculty", {
         name: "Test Faculty",
         email: "faculty@example.com",
         password: "password123",
         role: "teacher"
       });
       console.log("Faculty registered:", resReg.data);
    }
  }

  try {
    console.log("\nTEST 2: Register Student linking to ID 8");
    const res2 = await axios.post("http://localhost:5000/api/auth/register-student", {
      name: "Ranger",
      email: "ranger@example.com",
      password: "password123",
      student_id: "8",
      courseClass: "A"
    });
    console.log("Register Student Success:", res2.data);
  } catch (error) {
    console.error("Student Reg Error:", error.response?.data);
  }
}

testApi();
