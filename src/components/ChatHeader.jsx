import ProtectedImage from "@/components/ProtectedImage";

const ChatHeader = () => (
  <div className="pl-5 pr-5 pb-5 bg-none">
    <ProtectedImage
      src="/brand/jkt48.png"
      alt="logo"
      className="h-32 mb-3"
    />
    <p className="text-3xl font-thin text-white">Unofficial</p>
    <p className="text-xl font-thin text-white/75">Develop by <i><u><a href="https://github.com/jawirlabs/CharAI">JawirLabs</a></u></i></p>
  </div>
);

export default ChatHeader;