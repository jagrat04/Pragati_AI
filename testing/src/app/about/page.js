import MemberCard from "./components/card";

export default function Team() {
  const members = [
    {
      name: "Aakash",
      role: "Mechanical sem-4",
      image: "https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/Aakash.jpg", // Assuming Aakash.jpg is in the public folder
      linkedin: "https://linkedin.com/in/aakash", // Replace with actual LinkedIn
      github: "https://github.com/aakash", // Replace with actual GitHub
    },
    {
      name: "Jagrat",
      role: "Mechanical sem-4",
      image: "https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/Jagrat.jpg", 
      linkedin: "https://linkedin.com/in/jagrat-singh-chandel", 
      github: "https://github.com/jagrat04",
    },
    {
      name: "Karan",
      role: "Mechanical sem-4",
      image: "https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/Karan.jpg",
      linkedin: "https://linkedin.com/in/karan",
      github: "https://github.com/karan",
    },
    {
      name: "Rudra",
      role: "Mechanical sem-4",
      image: "https://raw.githubusercontent.com/jagrat04/tempo/refs/heads/main/Rudra.jpg",
      linkedin: "https://linkedin.com/in/rudra",
      github: "https://github.com/rudra",
    }
  ];

  return (

    <div className="team-container bg-green-50 h-[625px]">
      {members.map((member, index) => (
        <MemberCard key={index} {...member} />
      ))}
    </div>
  );
}