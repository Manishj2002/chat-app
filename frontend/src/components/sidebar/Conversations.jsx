import { getRandomEmoji } from "../../../utils/emoji";
import useConversation from "../../hooks/useConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useConversation();

  if (!Array.isArray(conversations)) {
    return <div>Error: Failed to load conversations</div>;
  }

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.length > 0 ? (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
            emoji={getRandomEmoji()}
          />
        ))
      ) : (
        <div>No conversations available</div>
      )}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
};

export default Conversations;
