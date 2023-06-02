import { db } from "@/firebase";
import { chatSelector } from "@/redux/selectors";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useParticipants() {
  const { shortId } = useSelector(chatSelector);
  const [participants, setParticipants] = useState({} as participantsData);
  useEffect(() => {
    const getParticipantsData = () => {
      const unsub = onSnapshot(doc(collection(db, "rooms"), shortId), (doc) => {
        let data = doc.data();
        setParticipants({
          profilePictures: data?.profilePictures,
          participants: data?.participants,
        });
      });
      return () => {
        unsub();
      };
    };

    shortId && getParticipantsData();
  }, [shortId]);
  return participants;
}
