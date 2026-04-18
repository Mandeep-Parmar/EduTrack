import axios from 'axios';

async function testApi() {
  try {
    console.log("TEST 1: Register Student");
    const res1 = await axios.post("http://localhost:5000/api/auth/register-student", {
      name: "Test Student",
      email: "teststudent_final_2@example.com",
      password: "password123",
      student_id: "S1234567",
      courseClass: "A"
    });
    console.log("Register Success:", res1.data);

    console.log("\nTEST 2: Login Student");
    const res2 = await axios.post("http://localhost:5000/api/auth/login", {
      email: "teststudent_final_2@example.com",
      password: "password123"
    });
    console.log("Login Success:", res2.data);
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
  }
}

testApi();
