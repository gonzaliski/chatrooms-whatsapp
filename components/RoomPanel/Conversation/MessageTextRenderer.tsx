import { getEmojiUnicode } from "@/utils/emojiToUnicode";
import { Emoji } from "emoji-picker-react";
export const MessageTextRenderer = ({
  text,
  size,
}: {
  text: string;
  size: "md" | "sm";
}) => {
  // Expresión regular para detectar emojis
  const emojiRegex = /(\p{Extended_Pictographic}|\p{Emoji_Presentation})/gu;

  // Separar el texto y los emojis
  const parts = text.split(emojiRegex);
  console.log(parts);

  const getSizeInNumber = size == "md" ? 25 : 20;
  return (
    <p className="flex items-end">
      {parts.map((part, index) =>
        emojiRegex.test(part) ? (
          <Emoji
            key={index}
            unified={getEmojiUnicode(part)}
            size={getSizeInNumber}
          />
        ) : (
          part
        )
      )}
    </p>
  );
};
