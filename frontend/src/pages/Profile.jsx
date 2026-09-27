import Navbar from "../components/Navbar";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="page">

        <h1>Student Profile</h1>

        <div className="profile-card">

          <p><strong>Name:</strong> Shruthi</p>

          <p><strong>Department:</strong> ECE</p>

          <p><strong>Year:</strong> 4-1</p>

          <p><strong>Email:</strong> shruthi@gmail.com</p>

        </div>

      </div>
    </>
  );
}

export default Profile;