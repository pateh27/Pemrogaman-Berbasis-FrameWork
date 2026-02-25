import Link from "next/link";

const ProfilePage = () => {
  return (
    <div>
        <h1>Profile Page</h1>
        <p>Nama: Muhammad Al-Fatih Ulima Robby</p>
        <p>NIM: 2341720119</p>
        <p>Program Studi: D4 Teknik Informatika</p>
        <Link href="/profile/edit" className="edit" style={{color: "blue"}}>Edit Profile</Link>
    </div>
  );
};

export default ProfilePage;