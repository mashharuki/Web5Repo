import { Web5 } from "@web5/api";
import { useState, useEffect } from "react";
import NoChatSelected from "@/components/NoChatSelected";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";

/**
 * Home Component
 */
export default function Home() {
  const [web5, setWeb5] = useState<Web5>();
  const [myDid, setMyDid] = useState<string | null>(null);
  const [activeRecipient, setActiveRecipient] = useState<string | null>(null);

  const [noteValue, setNoteValue] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [recipientDid, setRecipientDid] = useState("");

  const [didCopied, setDidCopied] = useState<boolean>(false);
  const [showNewChatInput, setShowNewChatInput] = useState<boolean>(false);

  const [allDings, setAllDings] = useState<any>([]);

  /**
   * sortedDings method
   */
  const sortedDings = allDings.sort(
    // @ts-ignore
    (a: any, b: any) => new Date(a.timestampWritten) - new Date(b.timestampWritten)
  );
  
  /**
   * groupedDings method
   */
  const groupedDings = allDings.reduce((acc: any, ding: any) => {
    const recipient = ding.sender === myDid ? ding.recipient : ding.sender;

    if (!acc[recipient]) acc[recipient] = [];
    acc[recipient].push(ding);
    return acc;
  }, {});

  /**
   * 初期化メソッド
   */
  const initWeb5 = async () => {
    // connect & get DID
    const { 
      web5, 
      did 
    } = await Web5.connect();
    setWeb5(web5);
    setMyDid(did);

    console.log("my DID:", did)

    if (web5 && did) {
      await configureProtocol(web5, did);
      await fetchDings(web5, did);
    }
  };

  useEffect(() => {
    initWeb5();
  }, []);

  useEffect(() => {
    if (!web5 || !myDid) return;
    const intervalId = setInterval(async () => {
      await fetchDings(web5, myDid);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [web5, myDid]);

  /**
   * createProtocolDefinition method
   * @returns 
   */
  const createProtocolDefinition = () => {
    const dingerProtocolDefinition = {
      protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
      published: true,
      types: {
        ding: {
          schema: "https://blackgirlbytes.dev/ding",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        ding: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "author", of: "ding", can: "read" },
            { who: "recipient", of: "ding", can: "read" },
          ],
        },
      },
    };
    return dingerProtocolDefinition;
  };

  /**
   * queryForProtocol method
   * @param web 
   * @returns 
   */
  const queryForProtocol = async (web: Web5) => {
    return await web5!.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
        },
      },
    });
  };

  /**
   * installProtocolLocaly method
   * @param web5 
   * @param protocolDefinition 
   * @returns 
   */
  const installProtocolLocally = async (
    web5: Web5, 
    protocolDefinition: any
  ) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

  /**
   * configureProtocol method
   * @param web5 
   * @param did 
   */
  const configureProtocol = async (
    web5: Web5, 
    did: string
  ) => {
    // createDifinition
    const protocolDefinition = await createProtocolDefinition();

    const { 
      protocols: localProtocol, 
      status: localProtocolStatus 
    } = await queryForProtocol(web5);
    console.log({ localProtocol, localProtocolStatus });

    if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {

      const { 
        protocol, 
        status 
      } = await installProtocolLocally(web5, protocolDefinition);
      console.log("Protocol installed locally", protocol, status);

      const { status: configureRemoteStatus } = await protocol!.send(did);
      console.log("Did the protocol install on the remote DWN?", configureRemoteStatus);
    } else {
      console.log("Protocol already installed");
    }
  };

  /**
   * constructDing method
   * @returns 
   */
  const constructDing = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const ding = {
      sender: myDid,
      note: noteValue,
      recipient: recipientDid,
      timestampWritten: `${currentDate} ${currentTime}`,
    };
    return ding;
  };

  /**
   * writeToDwn method
   * @param ding 
   * @returns 
   */
  const writeToDwn = async (ding: any) => {
    const { record } = await web5!.dwn.records.write({
      data: ding,
      message: {
        protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
        protocolPath: "ding",
        schema: "https://blackgirlbytes.dev/ding",
        recipient: recipientDid,
      },
    });
    return record;
  };

  /**
   * sendRecord method
   * @param record 
   * @returns 
   */
  const sendRecord = async (record: any) => {
    return await record.send(recipientDid);
  };

  /**
   * データをDWNに書き込む処理
   * @param e 
   * @returns 
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!noteValue.trim()) {
      setErrorMessage('Please type a message before sending.');
      return;
    }

    const ding = constructDing();
    const record = await writeToDwn(ding);
    const { status } = await sendRecord(record);

    console.log("Send record status", status);
  
    await fetchDings(web5!, myDid!);
    setNoteValue("");
  };

  /**
   * handleCopyDid method
   */
  const handleCopyDid = async () => {
    if (myDid) {
      try {
        await navigator.clipboard.writeText(myDid);
        setDidCopied(true);
        console.log("DID copied to clipboard");
 
        setTimeout(() => {
          setDidCopied(false);
        }, 3000);
      } catch (err) {
        console.log("Failed to copy DID: " + err);
      }
    }
  };

  /**
   * fetchSentMessages method
   * @param web5 
   * @param did 
   * @returns 
   */
  const fetchSentMessages = async (
    web5: Web5, 
    did: string
  ) => {
    // レコードを取得する
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
        },
      },
    });

    if (response.status.code === 200) {
      const sentDings = await Promise.all(
        response.records!.map(async (record) => {
          const data = await record.data.json();
          return data;
        })
      );
      console.log(sentDings, "I sent these dings");
      return sentDings;
    } else {
      console.log("error", response.status);
    }
  };

  /**
   * fetchReceivedMessages method
   * @param web5 
   * @param did 
   * @returns 
   */
  const fetchReceivedMessages = async (
    web5: Web5, 
    did: string
  ) => {
    // レコードを取得する
    const response = await web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
          schema: "https://blackgirlbytes.dev/ding",
        },
      },
    });

    if (response.status.code === 200) {
      const receivedDings = await Promise.all(
        response.records!.map(async (record) => {
          const data = await record.data.json();
          return data;
        })
      );
      console.log(receivedDings, "I received these dings");
      return receivedDings;
    } else {
      console.log("error", response.status);
    }
  };

  /**
   * fetchDings method
   * @param web5 
   * @param did 
   */
  const fetchDings = async (
    web5: Web5, 
    did: string
  ) => {
    // 送信したメッセージと受信したメッセージを取得する
    const sentMessages = await fetchSentMessages(web5, did);
    const receivedMessages = await fetchReceivedMessages(web5, did);
    const allMessages = [...(sentMessages || []), ...(receivedMessages || [])];
    setAllDings(allMessages);
  };

  /**
   * handleStartNewChat method
   */
  const handleStartNewChat = () => {
    setActiveRecipient(null);
    setShowNewChatInput(true);
  };

  /**
   * handleSetActiveRecipient method
   * @param recipient 
   */
  const handleSetActiveRecipient = (
    recipient: any
  ) => {
    setRecipientDid(recipient);
    setActiveRecipient(recipient);
    setShowNewChatInput(false);
  };

  /**
   * handleConfirmNewChat method
   */
  const handleConfirmNewChat = () => {
    setActiveRecipient(recipientDid);
    setShowNewChatInput(false);
    if (!groupedDings[recipientDid]) {
      groupedDings[recipientDid] = [];
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Dinger</h1>
      </header>
      <main>
        <Sidebar
          groupedDings={groupedDings}
          activeRecipient={activeRecipient}
          handleSetActiveRecipient={handleSetActiveRecipient}
          handleCopyDid={handleCopyDid}
          handleStartNewChat={handleStartNewChat}
          showNewChatInput={showNewChatInput}
          didCopied={didCopied}
          handleConfirmNewChat={handleConfirmNewChat}
          setRecipientDid={setRecipientDid}
          recipientDid={recipientDid}
          isWeb5Connected={!!web5 && !!myDid}
        />
        <section>
          {activeRecipient ? (
            <Chat
              activeRecipient={activeRecipient}
              sortedDings={sortedDings}
              myDid={myDid}
              handleSubmit={handleSubmit}
              noteValue={noteValue}
              setNoteValue={setNoteValue}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <NoChatSelected />
          )}
        </section>
      </main>
    </div>
  );
}