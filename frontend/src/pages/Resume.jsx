import Navbar from "../components/Navbar";

function Resume() {
  return (
    <>
      <Navbar />

      <div className="page">

        <h1>Resume Analyzer</h1>

        <input type="file" />

        <button>Analyze Resume</button>

        <div className="resume-result">

          <h3>Resume Score</h3>

          <h1>85%</h1>

          <p>Improve Java, SQL & Projects section.</p>

        </div>

      </div>
    </>
  );
}

export default Resume;