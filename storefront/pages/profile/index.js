import { Fragment } from "react";
import ProfileLayout from "../../components/profile-layout";

export default function Profile() {
  return (
    <ProfileLayout>
      <Fragment>Menu</Fragment>
      <Fragment>Profile</Fragment>
    </ProfileLayout>
  );
}
