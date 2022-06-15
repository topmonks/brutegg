import PropTypes from "prop-types";
import { Fragment, useEffect } from "react";
import { useRecoilState } from "recoil";
import ProfileLayout from "../../components/profile-layout";
import UnlockButton from "../../components/unlock-button";
import { withSessionSsr } from "../../libs/with-session";
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

  useEffect(() => {
    setSession((s) => ({ ...s, user }));
  }, [user, setSession]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <ProfileLayout>
      <Fragment>
        <UnlockButton />
      </Fragment>
    </ProfileLayout>
  );
}

Profile.propTypes = {
  user: PropTypes.any,
};
