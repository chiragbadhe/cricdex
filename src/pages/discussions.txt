import { useEffect, useState, useCallback } from "react";
import protobuf from "protobufjs";
import {
  createRelayNode,
  createDecoder,
  createEncoder,
  waitForRemotePeer,
} from "@waku/sdk";

interface SimpleChatMessage {
  timestamp: number;
  text: string;
}

const ContentTopic = `/js-waku-examples/1/chat/proto`;
const Encoder = createEncoder({ contentTopic: ContentTopic });
const Decoder = createDecoder(ContentTopic);

const SimpleChatMessageType = new protobuf.Type("SimpleChatMessage")
  .add(new protobuf.Field("timestamp", 1, "uint32"))
  .add(new protobuf.Field("text", 2, "string"));

export default function Home() {
  const [waku, setWaku] = useState<any>(undefined);
  const [wakuStatus, setWakuStatus] = useState<string>("None");
  const [sendCounter, setSendCounter] = useState<number>(0);
  const [messages, setMessages] = useState<SimpleChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  console.log(inputMessage);

  useEffect(() => {
    if (!!waku) return;
    if (wakuStatus !== "None") return;

    setWakuStatus("Starting");
    (async () => {
      const wakuInstance = await createRelayNode({ defaultBootstrap: true });

      setWaku(wakuInstance);
      await wakuInstance.start();
      setWakuStatus("Connecting");
      await waitForRemotePeer(wakuInstance, ["relay"]);
      setWakuStatus("Ready");
    })();
  }, [waku, wakuStatus]);

  const processIncomingMessage = useCallback(
    (wakuMessage: { payload: Uint8Array | protobuf.Reader }) => {
      console.log("Message received", wakuMessage);
      if (!wakuMessage.payload) return;

      const { text, timestamp } = SimpleChatMessageType.decode(
        wakuMessage.payload
      );

      const time = new Date();
      time.setTime(timestamp);
      const message: SimpleChatMessage = { text, timestamp: time.getTime() };

      setMessages((prevMessages) => [message, ...prevMessages]);
    },
    []
  );

  useEffect(() => {
    if (!waku) return;

    const deleteObserver = waku.relay.subscribe(
      Decoder,
      processIncomingMessage
    );

    return deleteObserver;
  }, [waku, wakuStatus, processIncomingMessage]);

  const sendMessageOnClick = () => {
    if (wakuStatus !== "Ready" || !inputMessage.trim()) return;

    sendMessage(inputMessage, waku, new Date()).then(() =>
      console.log("Message sent")
    );

    setSendCounter((prevCounter) => prevCounter + 1);
    setInputMessage(""); // Clear the input field after sending the message
  };

  console.log(messages);

  return (
    <div className="container mx-auto w-1/2 mt-[32px]">
      <div className="space-y-[12px] mb-[12px]">
        <h1 className="text-[32px] text-[#71FF4C]">
          CricDex Public Chat Arena
        </h1>

        <span className="opacity-70">
          Dive into the heart of cricket discussions with CricDex Chat Arena!
          Unleash your passion for the game as you explore player reputations,
          dissect memorable matches, and connect with fellow cricket
          aficionados.
        </span>
      </div>

      <div className=" flex justify-end">
        <p className=" bg-white/5 px-[12px] py-[4px]">
          <span> Status:</span>{" "}
          <span className="text-[#71FF4C]"> {wakuStatus}</span>{" "}
        </p>
      </div>
      <div className="border border-white/10 max-w-1/2">
        <div className=" min-h-[500px] flex  bg-white/5 p-[24px]">
          <ul className="flex flex-col space-y-[12px]">
            {messages.map((msg, index) => (
              <li key={index} className="">
                <p className="bg-white/10 px-[12px] py-[6px] rounded-full flex">
                  {msg.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-white/10 bg-white/5 flex pl-[12px]">
          <input
            type="text"
            id="message-input"
            className="bg-transparent w-full outline-none"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="px-[24px] py-[12px] text-black font-bold bg-[#71FF4C]"
            onClick={sendMessageOnClick}
            disabled={wakuStatus !== "Ready"}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

async function sendMessage(message: string, waku: any, timestamp: Date) {
  if (!message.trim()) return; // Skip sending empty messages

  const time = timestamp.getTime();
  const protoMsg = SimpleChatMessageType.create({
    timestamp: time,
    text: message,
  });
  const payload = SimpleChatMessageType.encode(protoMsg).finish();
  return waku?.relay.send(Encoder, { payload });
}
