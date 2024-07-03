import { useNavigate } from 'react-router-dom';

export default function DemoRoom() {
  const navigate = useNavigate();

  const handleDemo = () => {
    navigate(`/demo`);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleDemo}>
        View Demo
      </button>
    </>
  );
}
