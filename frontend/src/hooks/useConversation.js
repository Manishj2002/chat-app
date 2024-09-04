import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const useConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/users');
        if (!res.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
          setConversations([]);
        } else {
          setConversations(data);
        }
      } catch (error) {
        toast.error(error.message);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return { loading, conversations };
};

export default useConversation;
