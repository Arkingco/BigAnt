const HoneyPot = ({ content }: { content: Content }) => {
  const uploadTime = (content: Content) => {
    return new Date(content.createdAt).toLocaleDateString("ko-KR");
  };
  return (
    <section data-testid="HoneyPot" className="Content w-[300px] flex flex-col gap-[16px] border-2 border-solid rounded-[6px] p-[20px] border-red-700">
      <div className="Content-User flex flex-row gap-[4px]">
        <HoneyPot.Bee user={content.user} />
        <div> {uploadTime(content)} </div>
      </div>
      <HoneyPot.Content content={content} />
      <HoneyPot.Interaction content={content} />
    </section>
  );
};

const HoneyPotBee = ({ user }: { user: User }) => {
  return (
    <div className="flex gap-[4px]">
      <div> {user.profileImg} profile img</div>
      <div className="text-sm font-semibold"> {user.nickname} </div>
    </div>
  );
};

const HoneyPotContent = ({ content }: { content: Content }) => {
  return (
    <div className="Board-Content text-sm flex flex-col">
      <div>{content.content}</div>
      <div>portfolio example / link</div>
    </div>
  );
};

const HoneyPotInteraction = ({ content }: { content: Content }) => {
  return (
    <div className="Board-Interaction flex flex-row gap-[4px]">
      <div className="flex flex-row">
        <div> comment 🪧</div>
        <div> {content.commentCnt.toString()} </div>
      </div>
      <div className="flex flex-row">
        <div> like 👍 </div>
        <div> {content.likeCnt.toString()} </div>
      </div>
      <div className="flex flex-row">
        <div> repost📤</div>
        <div> {content.repostCnt.toString()} </div>
      </div>
    </div>
  );
};

HoneyPot.Bee = HoneyPotBee;
HoneyPot.Content = HoneyPotContent;
HoneyPot.Interaction = HoneyPotInteraction;

export default HoneyPot;
