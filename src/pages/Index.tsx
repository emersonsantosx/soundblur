
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to library page
    navigate('/library');
  }, [navigate]);

  return null;
};

export default Index;
