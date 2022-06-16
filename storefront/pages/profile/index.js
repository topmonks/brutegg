import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ProfileLayout from "../../components/profile/profile-layout";
import UnlockButton from "../../components/unlock-button";
import MetamaskButton from "../../components/web3/metamask-button";
import useMetamaskUnlocked from "../../hooks/useMetamaskUnlocked";
import { withSessionSsr } from "../../libs/with-session";
import { ethereumState } from "../../state/ethereum";
import { sessionState } from "../../state/session";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user || null;
    return {
      props: {
        user,
      },
    };
  }
);

export default function Profile({ user }) {
  const [session, setSession] = useRecoilState(sessionState);
  const ethereum = useRecoilValue(ethereumState);

  useEffect(() => {
    setSession((s) => ({ ...s, user }));
  }, [user, setSession]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  const isUnlocked = useMetamaskUnlocked(session?.user?.address);

  let content;

  if (ethereum.account) {
    if (isUnlocked) {
      content = "FORM";
    } else {
      content = <UnlockButton />;
    }
  } else {
    content = <MetamaskButton />;
  }

  return <ProfileLayout>{content}</ProfileLayout>;
}

Profile.propTypes = {
  user: PropTypes.any,
};
