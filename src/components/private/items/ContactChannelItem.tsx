import IconButton from "@/components/common/ui/IconButton";
import { ContactChannel } from "@/types/ContactChannel";
import { TbBrandFacebook, TbBrandInstagram, TbBrandTelegram, TbBrandTwitter, TbClipboard, TbEdit, TbExternalLink, TbGlobe, TbMail, TbPhone, TbTrash } from "react-icons/tb";

interface Props {
    contactChannel: ContactChannel;
    handleCopyToClipboard: (value: string) => void;
    handleModifyContactChannel: (contactChannel: ContactChannel) => void;
    handleDeleteContactChannel: (contactChannel: ContactChannel) => void;
}

const ContactChannelItem = ({ contactChannel, handleCopyToClipboard, handleDeleteContactChannel, handleModifyContactChannel }: Props) => {
  const iconMap = {
    phone: TbPhone,
    email: TbMail,
    social_media: {
      facebook: TbBrandFacebook,
      instagram: TbBrandInstagram,
      twitterx: TbBrandTwitter,
      telegram: TbBrandTelegram,
    },
  };

  const isSocial = contactChannel.type === "social_media";
  const Icon = isSocial
    ? iconMap.social_media[contactChannel.name as keyof typeof iconMap.social_media] || TbGlobe
    : iconMap[contactChannel.type as "phone" | "email"];

  const link =
    contactChannel.type === "phone"
      ? `tel:${contactChannel.value}`
      : contactChannel.type === "email"
      ? `mailto:${contactChannel.value}`
      : contactChannel.value;

  return (
    <li className={isSocial ? "flex gap-1" : "flex flex-col gap-1 text-cool-gray-700"}>
      <div className="flex gap-2 w-full items-start">
        {!isSocial && <span className="font-light flex-1 leading-none">{contactChannel.name}</span>}
        <div className="flex justify-end items-start gap-1">
          {isSocial ? (
            <>
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-2xl">
                <Icon />
              </a>
              <IconButton
                icon={TbClipboard}
                onClick={() => handleCopyToClipboard(contactChannel.value)}
              />
            </>
          ) : (
            <IconButton icon={TbExternalLink} type="button" href={link} />
          )}
          <IconButton icon={TbEdit} onClick={() => handleModifyContactChannel(contactChannel)} />
          <IconButton icon={TbTrash} onClick={() => handleDeleteContactChannel(contactChannel)} />
        </div>
      </div>
      {!isSocial && <span className="text-md break-all font-roboto">{contactChannel.value}</span>}
    </li>
  );
};


export default ContactChannelItem;